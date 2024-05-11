require('dotenv').config();

const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    // Add other environment variables as needed
  },
};

module.exports = nextConfig;
