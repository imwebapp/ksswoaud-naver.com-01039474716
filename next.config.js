/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		scrollRestoration: true,
		isrMemoryCacheSize: 0,
	},
	env: {
		API_HOST: process.env.API_HOST,
		NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
		NEXT_PUBLIC_FACEBOOK_CLIENT_ID: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
		KAKAO_APP_ID: process.env.KAKAO_APP_ID,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
}

module.exports = nextConfig
