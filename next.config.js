/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        PASS_KEY: process.env.PASS_KEY,
        KEY_PASS: process.env.KEY_PASS,
        REF_PASS: process.env.REF_PASS,
    }
}

module.exports = nextConfig
