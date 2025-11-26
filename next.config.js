/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // show redirect button in Tor Browser
        source: '/',
        headers: [
          {
            key: 'Onion-Location',
            value: 'http://protectfbnoqyfgo3t5ouw3c7odp55qqoxnfdd7u24nzz5pkbclbzzyd.onion',
          },
        ],
      },
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
