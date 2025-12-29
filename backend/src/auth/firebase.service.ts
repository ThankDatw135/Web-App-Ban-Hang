import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private firebaseApp: admin.app.App;

  constructor() {
    // Initialize Firebase Admin SDK
    if (!admin.apps.length) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    } else {
      this.firebaseApp = admin.app();
    }
  }

  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      return await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      throw new Error('Invalid Firebase token');
    }
  }

  async createUser(email: string, password: string): Promise<admin.auth.UserRecord> {
    try {
      return await admin.auth().createUser({
        email,
        password,
        emailVerified: false,
      });
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async getUserByEmail(email: string): Promise<admin.auth.UserRecord> {
    try {
      return await admin.auth().getUserByEmail(email);
    } catch (error) {
      throw new Error(`User not found: ${error.message}`);
    }
  }

  async deleteUser(uid: string): Promise<void> {
    try {
      await admin.auth().deleteUser(uid);
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  async generatePasswordResetLink(email: string): Promise<string> {
    try {
      return await admin.auth().generatePasswordResetLink(email);
    } catch (error) {
      throw new Error(`Failed to generate reset link: ${error.message}`);
    }
  }

  async setCustomUserClaims(uid: string, claims: object): Promise<void> {
    try {
      await admin.auth().setCustomUserClaims(uid, claims);
    } catch (error) {
      throw new Error(`Failed to set custom claims: ${error.message}`);
    }
  }
}
