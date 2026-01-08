import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import * as admin from 'firebase-admin';
import { User } from '../users/entities/user.entity';
import { RegisterDto, LoginDto } from './dto';
import { hashPassword, comparePassword } from '../../common/utils';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: Partial<User>; token: string }> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await hashPassword(registerDto.password);

    const user = this.usersRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    const token = this.generateToken(user);

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async login(loginDto: LoginDto): Promise<{ user: Partial<User>; token: string }> {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user);

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async googleAuth(idToken: string): Promise<{ user: Partial<User>; token: string }> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      
      let user = await this.usersRepository.findOne({
        where: { firebaseUid: decodedToken.uid },
      });

      if (!user) {
        user = this.usersRepository.create({
          email: decodedToken.email,
          fullName: decodedToken.name,
          firebaseUid: decodedToken.uid,
          avatarUrl: decodedToken.picture,
        });
        await this.usersRepository.save(user);
      }

      const token = this.generateToken(user);

      const { password, ...userWithoutPassword } = user;
      return { user: userWithoutPassword, token };
    } catch (error) {
      this.logger.error('Google auth error:', error);
      throw new UnauthorizedException('Invalid Google token');
    }
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      // Don't reveal if email exists
      return { message: 'If the email exists, an OTP will be sent' };
    }

    // TODO: Generate OTP and send via email
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    this.logger.log(`OTP for ${email}: ${otp}`); // In production, send via email

    return { message: 'If the email exists, an OTP will be sent' };
  }

  async verifyOtp(email: string, otp: string): Promise<{ token: string }> {
    // TODO: Verify OTP from cache/database
    const resetToken = jwt.sign(
      { email, purpose: 'password-reset' },
      this.configService.get('app.jwtSecret'),
      { expiresIn: '15m' },
    );

    return { token: resetToken };
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    try {
      const decoded = jwt.verify(
        token,
        this.configService.get('app.jwtSecret'),
      ) as { email: string; purpose: string };

      if (decoded.purpose !== 'password-reset') {
        throw new UnauthorizedException('Invalid token');
      }

      const user = await this.usersRepository.findOne({
        where: { email: decoded.email },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      user.password = await hashPassword(newPassword);
      await this.usersRepository.save(user);

      return { message: 'Password reset successfully' };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private generateToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      this.configService.get('app.jwtSecret'),
      { expiresIn: this.configService.get('app.jwtExpiresIn') },
    );
  }
}
