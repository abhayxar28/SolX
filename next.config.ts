/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: any) => {
    // no polyfills
    return config;
  },
};

export default nextConfig;
