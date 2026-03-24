/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow large base64 payloads in API routes
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

module.exports = nextConfig;
