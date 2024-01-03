/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // allow iframe parent to access static files for Protect Button
        source: '/_next/static/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
