import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin. 
// Note: In production, you would typically use a service account key file
// and set GOOGLE_APPLICATION_CREDENTIALS environment variable.
// For local dev, if you are logged into gcloud, it might pick up default credentials,
// but for complete control, it's best to supply the service account JSON.

if (!admin.apps.length) {
  try {
    admin.initializeApp();
    console.log('Firebase Admin initialized successfully.');
  } catch (error) {
    console.error('Firebase Admin initialization error', error);
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
