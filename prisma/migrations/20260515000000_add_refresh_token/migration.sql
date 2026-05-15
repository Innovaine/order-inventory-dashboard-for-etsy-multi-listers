-- Add refreshToken field to Shop table for OAuth token refresh
ALTER TABLE "Shop" ADD COLUMN "refreshToken" TEXT;
