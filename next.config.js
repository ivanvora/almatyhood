/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: false,
    },
    env: '"NODE_TLS_REJECT_UNAUTHORIZED=0',
};

module.exports = nextConfig;
