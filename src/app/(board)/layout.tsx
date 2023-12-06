import BottomNavigation from '@/src/components/BottomNavigation'
import Header from '@/src/components/Header'
import LinkApi from '@/src/services/Link'
import { BOARD } from '@/src/constants'

async function getLink() {
	const res = await LinkApi.getList({
		limit: 99,
		fields: ['$all'],
	})
	return res
}

export default async function Layout({
	children,
	...props
}: {
	children: React.ReactNode
}) {
	const listLink = await getLink()

	const postThema = listLink.results.objects.rows.find(
		(item) => item.route === BOARD.BULLETIN_BOARD,
	)?.thema_id

	return (
		<div className='mt-28 mb-20'>
			<Header links={listLink.results.objects.rows} />
			<BottomNavigation postThema={postThema} />
			{children}
		</div>
	)
}
