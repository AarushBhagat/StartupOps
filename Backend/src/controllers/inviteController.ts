import { Request, Response } from 'express';
import { adminDb } from '../config/firebase';
import * as crypto from 'crypto';
import nodemailer from 'nodemailer';

// Configure a test SMTP service using Ethereal Email for development
// In a real production app, this would use process.env.SMTP_USER etc.
let transporter: nodemailer.Transporter;

const setupTransporter = async () => {
  if (!transporter) {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  }
};

export const sendInvite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { email, role = 'Team Member' } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email address' });
    }

    // Get founder's startup profile
    const userRef = adminDb.collection('users').doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    if (!userData || !userData.startupProfile) {
      return res.status(400).json({ error: 'Startup profile not found. Please set up your startup first.' });
    }

    const startupName = userData.startupProfile.startupName;

    // Generate a secure invite code
    const inviteCode = crypto.randomBytes(4).toString('hex').toUpperCase();

    // Save invite to Firestore
    await adminDb.collection('invites').add({
      startupId: userId, // In this simple model, founder's UID is the startup ID
      startupName,
      email,
      role,
      inviteCode,
      status: 'pending',
      createdAt: new Date().toISOString(),
      invitedBy: userData.displayName || 'Founder'
    });

    // Free Alternative: Real Gmail sending via Nodemailer
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_PASS;

    if (gmailUser && gmailPass) {
      try {
        const gmailTransporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        const info = await gmailTransporter.sendMail({
          from: `"StartupOps" <${gmailUser}>`,
          to: email,
          subject: `You've been invited to join ${startupName} on StartupOps`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
              <h2 style="color: #333;">Welcome to StartupOps!</h2>
              <p style="font-size: 16px; color: #555;">
                You have been invited by <strong>${userData.displayName || 'the founder'}</strong> to join <strong>${startupName}</strong> as a <strong>${role}</strong>.
              </p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
                <p style="font-size: 14px; color: #666; margin-bottom: 5px;">Your Unique Invite Code:</p>
                <h3 style="font-size: 24px; color: #00bcd4; margin: 0; letter-spacing: 2px;">${inviteCode}</h3>
              </div>
              <p style="font-size: 16px; color: #555;">
                Go to <a href="http://localhost:5173/signup" style="color: #00bcd4;">StartupOps Setup</a> and enter this code during onboarding to link your account to the team.
              </p>
            </div>
          `,
        });
        console.log("Real email sent via Gmail:", info.messageId);
        return res.status(200).json({ message: 'Invite sent successfully to ' + email });
      } catch (err: any) {
        console.error("Failed to send real email via Gmail:", err);
        return res.status(500).json({ error: 'Failed to send Gmail: ' + (err.message || 'Unknown error') });
      }
    }

    // Fallback/Dev Mode: Ethereal Email
    await setupTransporter();
    
    const info = await transporter.sendMail({
      from: '"StartupOps " <noreply@startupops.com>',
      to: email,
      subject: `You've been invited to join ${startupName} on StartupOps`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #333;">Welcome to StartupOps!</h2>
          <p style="font-size: 16px; color: #555;">
            You have been invited by <strong>${userData.displayName || 'the founder'}</strong> to join <strong>${startupName}</strong> as a <strong>${role}</strong>.
          </p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <p style="font-size: 14px; color: #666; margin-bottom: 5px;">Your Unique Invite Code:</p>
            <h3 style="font-size: 24px; color: #00bcd4; margin: 0; letter-spacing: 2px;">${inviteCode}</h3>
          </div>
          <p style="font-size: 16px; color: #555;">
            Go to <a href="http://localhost:5173/signup" style="color: #00bcd4;">StartupOps Setup</a> and enter this code during onboarding to link your account to the team.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">
            <strong>Dev Mode:</strong> This email was sent via a test service. Click the preview link in the dashboard to see it.
          </p>
        </div>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    const previewUrl = nodemailer.getTestMessageUrl(info);

    return res.status(200).json({ 
      message: 'Invite sent successfully (Test Mode)',
      previewUrl
    });

  } catch (error) {
    console.error('Error sending invite:', error);
    return res.status(500).json({ error: 'Internal server error while sending invite' });
  }
};

export const joinWithInvite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.uid;
    const { inviteCode } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!inviteCode) {
      return res.status(400).json({ error: 'Invite code is required' });
    }

    // 1. Find the pending invite
    const invitesRef = adminDb.collection('invites');
    const q = invitesRef.where('inviteCode', '==', inviteCode.toUpperCase()).where('status', '==', 'pending');
    const snapshot = await q.get();

    if (snapshot.empty) {
      return res.status(404).json({ error: 'Invalid or already used invite code' });
    }

    const inviteDoc = snapshot.docs[0];
    const inviteData = inviteDoc.data();

    // 2. Link user to the startup
    const userRef = adminDb.collection('users').doc(userId);
    
    // Fetch the founder's roadmap/profile to share with the employee
    const founderRef = adminDb.collection('users').doc(inviteData.startupId);
    const founderDoc = await founderRef.get();
    const founderData = founderDoc.data();

    await userRef.set({
      role: 'team',
      startupId: inviteData.startupId,
      startupProfile: founderData?.startupProfile || { startupName: inviteData.startupName },
      roadmap: founderData?.roadmap || null,
      joinedAt: new Date().toISOString()
    }, { merge: true });

    // 3. Mark invite as used
    await inviteDoc.ref.update({ 
      status: 'used', 
      joinedUserId: userId, 
      joinedAt: new Date().toISOString() 
    });

    return res.status(200).json({ 
      message: 'Successfully joined team', 
      startupName: inviteData.startupName,
      role: 'team'
    });

  } catch (error) {
    console.error('Error joining with invite:', error);
    return res.status(500).json({ error: 'Internal server error while joining team' });
  }
};
