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
    }

};

export default nextConfig;
