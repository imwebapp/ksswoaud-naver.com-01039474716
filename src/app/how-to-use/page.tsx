import Link from 'next/link'

import ContentApi from '@/src/services/Content'
import FixedComponent from '@/src/components/FixedComponent'

async function getContent() {
	const result = await ContentApi.getList({
		fields: ['$all'],
		filter: {
			type: 'how-to-use',
		},
	})
	return result.results.objects.rows
}

export default async function HowToUsePage() {
	const result = await getContent()
	const data = result.length > 0 ? result[0] : undefined
	return (
		<div>
			<div
				className='p-4 mb-20 blog-content'
				dangerouslySetInnerHTML={{ __html: data?.content ?? '' }}
			/>
			<FixedComponent>
				<Link href='/'>
					<button
						className='bg-black text-white w-full text-2xl font-bold
            rounded py-3.5'
					>
						닫기
					</button>
				</Link>
			</FixedComponent>
		</div>
	)
}
