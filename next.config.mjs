/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const nextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: 'incremental'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fsgn5-12.fna.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fsgn5-10.fna.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  webpack: (config) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    config.resolve.alias['@components'] = path.join(__dirname, 'src/components');
    return config;
  },
};

export default nextConfig;