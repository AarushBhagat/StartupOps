-- Create Demo User Account
-- Run this FIRST before running the HealthAI demo data
-- This creates the user: jhanviarora11105@gmail.com / abc123

DO $$
DECLARE
    new_user_id UUID;
BEGIN
    -- Check if user already exists
    SELECT id INTO new_user_id FROM auth.users WHERE email = 'jhanviarora11105@gmail.com';
    
    IF new_user_id IS NULL THEN
        -- Generate a new UUID for the user
        new_user_id := gen_random_uuid();
        
        -- Insert the user into auth.users
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            recovery_token,
            email_change_token_new,
            email_change
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            new_user_id,
            'authenticated',
            'authenticated',
            'jhanviarora11105@gmail.com',
            crypt('abc123', gen_salt('bf')),
            NOW(),
            '{"provider":"email","providers":["email"]}'::jsonb,
            '{}'::jsonb,
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        );
        
        -- Insert into auth.identities
        INSERT INTO auth.identities (
            provider_id,
            user_id,
            identity_data,
            provider,
            last_sign_in_at,
            created_at,
            updated_at
        ) VALUES (
            new_user_id::text,
            new_user_id,
            jsonb_build_object('sub', new_user_id::text, 'email', 'jhanviarora11105@gmail.com'),
            'email',
            NOW(),
            NOW(),
            NOW()
        );
        
        RAISE NOTICE 'User created successfully with ID: %', new_user_id;
    ELSE
        RAISE NOTICE 'User already exists with ID: %', new_user_id;
    END IF;
END $$;

-- Verify the user was created
SELECT id, email, email_confirmed_at, created_at 
FROM auth.users 
WHERE email = 'jhanviarora11105@gmail.com';
