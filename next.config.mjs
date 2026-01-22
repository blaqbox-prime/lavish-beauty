/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'phuduhtxapuzbkvindrj.supabase.co',
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
            {
                protocol: 'https',
                hostname: 'pexels.com',
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
            },
        ],
    },
};

export default nextConfig;
