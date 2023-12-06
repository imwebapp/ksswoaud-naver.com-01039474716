import type { Metadata, ResolvingMetadata } from 'next'

import ShopApi from '@/src/services/Shop'

type Props = {
	params: { id: string }
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const id = params.id

	const response = await ShopApi.getDetail(params.id)

	const detail = response.results.object.shop

	const previousImages = (await parent).openGraph?.images || []

	return {
		title: detail.title,
		openGraph: {
			images: [...detail.images, ...previousImages],
		},
	}
}

export default function ShopDetailLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Props
}) {
	return children
}
