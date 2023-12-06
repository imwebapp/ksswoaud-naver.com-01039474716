import { cookies } from 'next/headers'

import { BoardDetailTab } from '@/src/components/Board'
import ListReview from '@/src/components/ListReview'
import { AuthenContextWrapper } from '@/src/context/contextAuthenProvider'
import ShopApi from '@/src/services/Shop'

export default async function ShopReivePage({
	params,
}: {
	params: { id: string; title: string }
}) {
	const cookiesStore = cookies()
	const token = cookiesStore.get('token')?.value

	const detail = (await ShopApi.getDetail(params.id, token)).results.object.shop

	return (
		<AuthenContextWrapper>
			<BoardDetailTab id={params.id} title={decodeURIComponent(params.title)} />
			<ListReview shop_id={params.id} owner_id={detail.user_id} />
		</AuthenContextWrapper>
	)
}
