/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "connect-src 'self' https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com https://*.supabase.co blob: data:; img-src 'self' data: blob: https://*.tiles.mapbox.com https://*.public.blob.vercel-storage.com;",
                    },
                ],
            },
        ]
    },
}

export default nextConfig
