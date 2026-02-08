-- Fix RLS policy to allow profile creation during signup
-- This allows authenticated users to insert their own profile

-- Drop existing restrictive INSERT policy if it exists
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Create new policy that allows authenticated users to insert their own profile
CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Also ensure the trigger works properly by granting necessary permissions
-- Grant insert permission to authenticated users on profiles
GRANT INSERT ON profiles TO authenticated;
