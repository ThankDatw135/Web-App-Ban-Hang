import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {
    // Initialize Firebase Admin if not already initialized
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.get('firebase.projectId'),
          privateKey: this.configService.get('firebase.privateKey'),
          clientEmail: this.configService.get('firebase.clientEmail'),
        }),
      });
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      request.user = {
        firebaseUid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
