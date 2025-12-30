/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    // Ignoring ESLint during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
