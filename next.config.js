/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    typedRoutes: true,
    instrumentationHook: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [{
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;