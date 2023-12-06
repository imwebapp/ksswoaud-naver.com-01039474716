import Image from 'next/image'

import BackButton from '@/src/components/BackButton'
import CreatePost from '@/src/components/CreatePost'
import CategoryApi from '@/src/services/Category'
import { AuthenContextWrapper } from '@/src/context/contextAuthenProvider'

export default async function CreatePostPage({
	params,
}: {
	params: { thema_id: string; id: string[] }
}) {
	const categoriesResult = await CategoryApi.getList({
		fields: ['$all'],
		filter: { thema_id: params.thema_id },
	})

	const categories = categoriesResult.results.objects.rows

	return (
		<AuthenContextWrapper>
			<div className='bg-white w-full min-h-screen pb-36'>
				<CreatePost
					categories={categories}
					id={params.id ? params.id[0] : undefined}
				/>
			</div>
		</AuthenContextWrapper>
	)
}
