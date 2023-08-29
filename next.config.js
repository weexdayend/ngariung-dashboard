/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        DOMAIN: process.env.DOMAIN,
        API_URL: process.env.API_URL,
        PASS_KEY: process.env.PASS_KEY,
        KEY_PASS: process.env.KEY_PASS,
        REF_PASS: process.env.REF_PASS,
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    }
}

module.exports = nextConfig
