import BlogDetailHeader from '@/src/components/BlogDetailHeader'
import { BoardDetailCarousel } from '@/src/components/Board'
import BlogDetailBackButton from '@/src/components/BlogDetailBackButton'

import BlogApi from '@/src/services/Blog'

const Page = async ({ params }: { params: { id: string } }) => {
	const { id } = params
	const result = await BlogApi.get(id, { fields: ['$all'] })
	const detail = result.results.object

	return (
		<div className='pb-20 relative'>
			<BlogDetailHeader title={detail.title} />
			<BoardDetailCarousel images={detail.images} title={detail.title} />
			<div className='flex flex-col justify-center items-center my-4'>
				<p className='text-[24px] font-bold'>{detail.title} </p>
				<div className='mt-3 gap-4 flex items-center flex-wrap justify-center'>
					{detail.tags?.map((tag, index) => (
						<div
							key={index}
							className='bg-[#F0F0F0] rounded-[13px] w-fit py-1 px-2'
						>
							<p className='text-black text-[14px]'>{tag}</p>
						</div>
					))}
				</div>
			</div>
			<hr />
			<div
				className='p-3 blog-content'
				dangerouslySetInnerHTML={{ __html: detail.content }}
			/>
			<BlogDetailBackButton />
		</div>
	)
}

export default Page
