import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { FirebaseService } from './firebase.service';
import { RegisterDto, LoginDto, GoogleLoginDto, ForgotPasswordDto, VerifyOtpDto, ResetPasswordDto } from './dto/auth.dto';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, OTP } from '../constants';
import { generateOTP } from '../utils/helpers';

@Injectable()
export class AuthService {
  private otpStore = new Map<string, { otp: string; expiresAt: Date }>();

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private firebaseService: FirebaseService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }

    // Create user in Firebase
    const firebaseUser = await this.firebaseService.createUser(
      registerDto.email,
      registerDto.password,
    );

    // Create user in database
    const user = this.usersRepository.create({
      email: registerDto.email,
      fullName: registerDto.fullName,
      phone: registerDto.phone,
      firebaseUid: firebaseUser.uid,
    });

    await this.usersRepository.save(user);

    return {
      message: SUCCESS_MESSAGES.REGISTER_SUCCESS,
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    };
  }

  async login(loginDto: LoginDto) {
    // Firebase handles authentication on client side
    // This endpoint is for additional validation if needed
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    return {
      message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    };
  }

  async googleLogin(googleLoginDto: GoogleLoginDto) {
    // Verify Firebase ID token
    const decodedToken = await this.firebaseService.verifyIdToken(googleLoginDto.idToken);

    // Check if user exists
    let user = await this.usersRepository.findOne({
      where: { firebaseUid: decodedToken.uid },
    });

    // Create user if doesn't exist
    if (!user) {
      user = this.usersRepository.create({
        email: decodedToken.email,
        fullName: decodedToken.name || decodedToken.email,
        firebaseUid: decodedToken.uid,
        avatarUrl: decodedToken.picture,
      });

      await this.usersRepository.save(user);
    }

    return {
      message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    // Check if user exists
    const user = await this.usersRepository.findOne({
      where: { email: forgotPasswordDto.email },
    });

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Generate OTP
    const otp = generateOTP(OTP.LENGTH);

    // Store OTP with expiration
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + OTP.EXPIRY_MINUTES);

    this.otpStore.set(forgotPasswordDto.email, { otp, expiresAt });

    // TODO: Send OTP via email
    console.log(`OTP for ${forgotPasswordDto.email}: ${otp}`);

    return {
      message: SUCCESS_MESSAGES.OTP_SENT,
      // In development, return OTP for testing
      ...(process.env.NODE_ENV === 'development' && { otp }),
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const storedOtp = this.otpStore.get(verifyOtpDto.email);

    if (!storedOtp) {
      throw new BadRequestException('OTP not found or expired');
    }

    if (new Date() > storedOtp.expiresAt) {
      this.otpStore.delete(verifyOtpDto.email);
      throw new BadRequestException('OTP expired');
    }

    if (storedOtp.otp !== verifyOtpDto.otp) {
      throw new BadRequestException('Invalid OTP');
    }

    return {
      message: SUCCESS_MESSAGES.OTP_VERIFIED,
      data: { verified: true },
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    // Verify OTP first
    await this.verifyOtp({
      email: resetPasswordDto.email,
      otp: resetPasswordDto.otp,
    });

    // Get user
    const user = await this.usersRepository.findOne({
      where: { email: resetPasswordDto.email },
    });

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Update password in Firebase
    // Note: This requires Firebase Admin SDK
    // For now, generate password reset link
    const resetLink = await this.firebaseService.generatePasswordResetLink(resetPasswordDto.email);

    // Clear OTP
    this.otpStore.delete(resetPasswordDto.email);

    return {
      message: SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS,
      data: { resetLink },
    };
  }
}
