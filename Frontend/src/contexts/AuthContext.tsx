import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth, googleProvider, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: string;
  startupProfile?: {
    startupName: string;
    industry: string;
    description: string;
    stage: string;
    selectedTemplates: string[];
    onboardedAt: string;
    problemStatement?: string;
    solution?: string;
    targetAudience?: string;
    elevatorPitch?: string;
  };
  roadmap?: any;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync user object with Firestore
  const ensureUserInFirestore = async (firebaseUser: User, name?: string) => {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const newUserProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: name || firebaseUser.displayName || null,
        photoURL: firebaseUser.photoURL || null,
        createdAt: new Date().toISOString(),
      };
      await setDoc(userRef, newUserProfile);
    }
  };

  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (unsubscribeSnapshot) unsubscribeSnapshot();

      if (firebaseUser) {
        try {
          await ensureUserInFirestore(firebaseUser);
          
          // Listen to the document in real-time so that when AI finishes we get the roadmap immediately
          const userRef = doc(db, 'users', firebaseUser.uid);
          const { onSnapshot } = await import('firebase/firestore');
          
          unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
            if (docSnap.exists()) {
              setUser(docSnap.data() as UserProfile);
            }
            setLoading(false);
          });
        } catch (error) {
          console.error("Error syncing user to Firestore:", error);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            createdAt: new Date().toISOString(),
          });
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const signInWithGoogle = async () => {
    // Add prompt select_account to force account selection dialog
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    const result = await signInWithPopup(auth, googleProvider);
    await ensureUserInFirestore(result.user);
  };

  const logInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string, name?: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    await ensureUserInFirestore(result.user, name);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider 
      value={{ user, loading, signInWithGoogle, logInWithEmail, signUpWithEmail, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
