import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./configs/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://Account:48QUaFcMLYNl@ep-icy-hall-a5q4653w.us-east-2.aws.neon.tech/ai-short-video-generator?sslmode=require',
  },
  verbose: true,
  strict: true,
})