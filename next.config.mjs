/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/admin',
                destination: '/admin/dashboard/',
                permanent: true,
            },
        ]
    },
    images: {
        domains: ['flowbite.com'],
    },

};

export default nextConfig;
