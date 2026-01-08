import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import api, {setAuthToken} from './api';

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', // From Firebase Console
});

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  /**
   * Email/Password Sign In
   */
  async signInWithEmail(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/login', {email, password});
    const data = response.data.data as AuthResponse;
    setAuthToken(data.token);
    return data;
  }

  /**
   * Email/Password Registration
   */
  async registerWithEmail(
    email: string,
    password: string,
    fullName: string,
  ): Promise<AuthResponse> {
    const response = await api.post('/auth/register', {
      email,
      password,
      fullName,
    });
    const data = response.data.data as AuthResponse;
    setAuthToken(data.token);
    return data;
  }

  /**
   * Google Sign In
   */
  async signInWithGoogle(): Promise<AuthResponse> {
    // Get Google ID token
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const {idToken} = await GoogleSignin.getTokens();

    if (!idToken) {
      throw new Error('Failed to get Google ID token');
    }

    // Sign in with Firebase
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const firebaseUser = await auth().signInWithCredential(googleCredential);

    // Get Firebase ID token
    const firebaseIdToken = await firebaseUser.user.getIdToken();

    // Authenticate with backend
    const response = await api.post('/auth/google', {idToken: firebaseIdToken});
    const data = response.data.data as AuthResponse;
    setAuthToken(data.token);
    return data;
  }

  /**
   * Sign Out
   */
  async signOut(): Promise<void> {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
    } catch (e) {
      // Ignore Google sign out errors
    }
    setAuthToken(null);
  }

  /**
   * Forgot Password
   */
  async forgotPassword(email: string): Promise<{message: string}> {
    const response = await api.post('/auth/forgot-password', {email});
    return response.data.data;
  }

  /**
   * Get current Firebase user
   */
  getCurrentUser() {
    return auth().currentUser;
  }
}

export default new AuthService();
