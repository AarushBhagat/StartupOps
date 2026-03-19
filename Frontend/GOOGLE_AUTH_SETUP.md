# Google OAuth Setup Instructions

## ✅ What's Been Completed

1. ✅ Installed `@react-oauth/google` package
2. ✅ Created environment variables file (`.env` and `.env.example`)
3. ✅ Wrapped app with `GoogleOAuthProvider` in `main.tsx`
4. ✅ Updated Login component with Google OAuth functionality
5. ✅ Connected the "Continue with Google" button to authentication flow

## 🔧 Setup Steps Required

### Step 1: Get Your Google OAuth Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to **APIs & Services** > **Library**
   - Search for "Google+ API"
   - Click **Enable**

4. Create OAuth 2.0 Credentials:
   - Go to **APIs & Services** > **Credentials**
   - Click **Create Credentials** > **OAuth client ID**
   - Choose **Web application**
   - Set Name: `StartupOps Web Client` (or any name you prefer)
   
5. Configure Authorized Origins and Redirect URIs:
   ```
   Authorized JavaScript origins:
   - http://localhost:3000
   - http://localhost:5173  (for Vite dev server)
   - https://yourdomain.com  (for production)

   Authorized redirect URIs:
   - http://localhost:3000
   - http://localhost:5173
   - https://yourdomain.com
   ```

6. Click **Create** and copy your **Client ID**

### Step 2: Add Client ID to Environment Variables

1. Open `Frontend/.env` file
2. Replace `your_google_client_id_here.apps.googleusercontent.com` with your actual Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
   ```

### Step 3: Restart Development Server

After adding the Client ID, restart your dev server:

```bash
cd frontend
npm run dev
```

## 🎯 How It Works

### Authentication Flow

1. **User clicks "Continue with Google"**
   - Opens Google's OAuth consent screen
   - User selects/logs into Google account
   - Google asks for permission to share profile info

2. **Google returns access token**
   - App receives the token
   - Makes request to Google's API to get user info

3. **User info retrieved**
   - Gets email, name, profile picture
   - Calls `onLogin(email)` to log user into your app

### Code Structure

**`main.tsx`**: Wraps entire app with GoogleOAuthProvider
```tsx
<GoogleOAuthProvider clientId={googleClientId}>
  <App />
</GoogleOAuthProvider>
```

**`Login.tsx`**: 
- Uses `useGoogleLogin` hook
- Fetches user info from Google API
- Passes user email to your login handler

## 🔐 Security Notes

1. **Never commit `.env` to Git**
   - Already in `.gitignore`
   - Use `.env.example` for documentation

2. **Client ID is public**
   - It's safe to expose in frontend
   - OAuth secret should NEVER be in frontend code

3. **Production Setup**
   - Add your production domain to authorized origins
   - Update environment variables in your hosting platform

## 🧪 Testing

1. Click "Continue with Google" button
2. Should see Google OAuth consent screen
3. After login, should call your `onLogin` function with user's email
4. Check browser console for success message: `"Google Login Success: {userInfo}"`

## 📝 User Information Available

After successful login, you get:
- `email` - User's email address
- `name` - Full name  
- `picture` - Profile picture URL
- `sub` - Unique Google user ID
- `email_verified` - Boolean if email is verified

## 🎨 Customization

### Store More User Data

Modify `googleLogin` in `Login.tsx`:
```tsx
const userInfo = await userInfoResponse.json();

// Store user info however you need
localStorage.setItem('userEmail', userInfo.email);
localStorage.setItem('userName', userInfo.name);
localStorage.setItem('userPicture', userInfo.picture);

onLogin(userInfo.email);
```

### Add Loading State

```tsx
const [isGoogleLoading, setIsGoogleLoading] = useState(false);

const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    setIsGoogleLoading(true);
    // ... auth logic
    setIsGoogleLoading(false);
  }
});
```

## ❗ Troubleshooting

### "Invalid Client ID"
- Verify Client ID in `.env` is correct
- Restart dev server after changing `.env`
- Check no extra spaces in the Client ID

### "Redirect URI mismatch"
- Add your localhost URL to authorized origins in Google Console
- Make sure protocol matches (http:// vs https://)

### "Pop-up blocked"
- Google login opens in popup by default
- User may need to allow popups for your site
- Consider using redirect flow instead

### Can't fetch user info
- Ensure you enabled Google+ API in Google Cloud Console
- Check network tab for API errors
- Verify access token is being received

## 🚀 Next Steps

1. Set up backend authentication endpoint
2. Generate JWT tokens for session management
3. Store user data in database
4. Add profile completion flow for first-time users
5. Implement logout functionality

## 📚 Resources

- [@react-oauth/google Documentation](https://www.npmjs.com/package/@react-oauth/google)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
