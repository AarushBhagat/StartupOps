-- ============================================
-- Storage Buckets Setup
-- ============================================
-- Run this in Supabase SQL Editor to create storage buckets

BEGIN;

-- ============================================
-- CREATE STORAGE BUCKETS
-- ============================================

-- Avatars bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Pitch decks bucket (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('pitch-decks', 'pitch-decks', false)
ON CONFLICT (id) DO NOTHING;

-- Documents bucket (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STORAGE POLICIES FOR AVATARS
-- ============================================

-- Anyone can view avatars (public bucket)
CREATE POLICY "Public avatars are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Users can upload their own avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- ============================================
-- STORAGE POLICIES FOR PITCH DECKS
-- ============================================

-- Users can view pitch decks from their startups
CREATE POLICY "Users can view their startup pitch decks"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'pitch-decks' AND
  EXISTS (
    SELECT 1 FROM startup_members
    WHERE startup_members.startup_id::text = (storage.foldername(name))[1]
    AND startup_members.user_id = auth.uid()
  )
);

-- Owners and admins can upload pitch decks
CREATE POLICY "Owners and admins can upload pitch decks"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'pitch-decks' AND
  EXISTS (
    SELECT 1 FROM startup_members
    WHERE startup_members.startup_id::text = (storage.foldername(name))[1]
    AND startup_members.user_id = auth.uid()
    AND startup_members.role IN ('owner', 'admin')
  )
);

-- Owners and admins can update pitch decks
CREATE POLICY "Owners and admins can update pitch decks"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'pitch-decks' AND
  EXISTS (
    SELECT 1 FROM startup_members
    WHERE startup_members.startup_id::text = (storage.foldername(name))[1]
    AND startup_members.user_id = auth.uid()
    AND startup_members.role IN ('owner', 'admin')
  )
);

-- Owners and admins can delete pitch decks
CREATE POLICY "Owners and admins can delete pitch decks"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'pitch-decks' AND
  EXISTS (
    SELECT 1 FROM startup_members
    WHERE startup_members.startup_id::text = (storage.foldername(name))[1]
    AND startup_members.user_id = auth.uid()
    AND startup_members.role IN ('owner', 'admin')
  )
);

-- ============================================
-- STORAGE POLICIES FOR DOCUMENTS
-- ============================================

-- Users can view documents from their startups
CREATE POLICY "Users can view their startup documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'documents' AND
  EXISTS (
    SELECT 1 FROM startup_members
    WHERE startup_members.startup_id::text = (storage.foldername(name))[1]
    AND startup_members.user_id = auth.uid()
  )
);

-- Users can upload documents to their startups
CREATE POLICY "Users can upload documents to their startup"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents' AND
  EXISTS (
    SELECT 1 FROM startup_members
    WHERE startup_members.startup_id::text = (storage.foldername(name))[1]
    AND startup_members.user_id = auth.uid()
  )
);

-- Users can update documents they uploaded
CREATE POLICY "Users can update their documents"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'documents' AND
  auth.uid()::text = (storage.foldername(name))[2]
);

-- Users can delete documents they uploaded or if they're owner/admin
CREATE POLICY "Users can delete their documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'documents' AND
  (
    auth.uid()::text = (storage.foldername(name))[2] OR
    EXISTS (
      SELECT 1 FROM startup_members
      WHERE startup_members.startup_id::text = (storage.foldername(name))[1]
      AND startup_members.user_id = auth.uid()
      AND startup_members.role IN ('owner', 'admin')
    )
  )
);

COMMIT;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Storage buckets and policies created successfully!';
    RAISE NOTICE '📁 Buckets: avatars (public), pitch-decks (private), documents (private)';
    RAISE NOTICE '💡 File paths should follow: bucket/startup_id/user_id/filename';
END $$;
