import './globals.css'

import type { Metadata } from 'next'
import Layout from '@/src/components/Layout'
import ReduxProvider from '../stores/provider'
import { Noto_Sans_KR } from 'next/font/google'
import SeoApi from '../services/Seo'

const notoSansKR = Noto_Sans_KR({
	subsets: ['latin'],
	variable: '--font-notoSansKR',
	weight: ['100', '300', '400', '500', '700'],
})

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export async function generateMetadata(): Promise<Metadata> {
	const response = await SeoApi.get()
	const data = response.results.object

	return {
		metadataBase: new URL('https://newbkshop.com'),
		title: {
			default: data.title as string,
			template: `%s | ${data.title}`,
		},
		description: data.description,
		keywords: data.keywords,
		generator: 'Next.js',
		referrer: 'origin-when-cross-origin',
		icons: {
			icon: data.icon,
		},
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		openGraph: {
			images: data.avatar,
		},
	}
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<meta
				name='google-site-verification'
				content='o954kVOVe11oWv7afYN4PbM4iPpzcoYOUaFBmZLrjq8'
			/>
			<meta
				name='naver-site-verification'
				content='45594cb0c02f58a3069f53d5f2cc66d6a2b5696b'
			/>
			<script
				src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAlKAMYVUjH35pTbeG2w-jAV8GXOt--Ayc&libraries=places'
				async
			></script>
			<body
				className={`${notoSansKR.variable} font-notoSansKR max-w-[502px] mx-auto`}
			>
				<ReduxProvider>
					<Layout> {children}</Layout>
				</ReduxProvider>
			</body>
		</html>
	)
}
