/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 't.me'
        }, {
            protocol: 'https',
            hostname: 'nextjs.org'
        }]
    }
}

module.exports = nextConfig
