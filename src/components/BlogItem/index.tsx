import Image from 'next/image'
import Link from 'next/link'

import { removeHtmlTags } from '@/src/utils/common'
import { Motion } from '../Motion'

export interface BlogItemProps {
	id: string
	title: string
	content: string
	thumbnails: string[]
}

export default function BlogItem({
	id,
	title,
	content,
	thumbnails,
}: BlogItemProps) {
	return (
		<Motion>
			<Link href={`/blog/detail/${id}`}>
				<div className='flex flex-col gap-3 p-[10px] bg-white'>
					<p className='text-[#1367DC] text-[20px] truncate'>{title}</p>
					<div className='flex justify-between w-full gap-4'>
						<p className='text-[#505153] text-[14px] line-clamp-5'>
							{removeHtmlTags(content)}
						</p>
						<div className='w-fit h-fit overflow-hidden rounded-[9px] min-w-[110px]'>
							<Image
								src={thumbnails[0]}
								width={110}
								height={110}
								alt=''
								className='w-[110px] h-[110px] object-cover'
							/>
						</div>
					</div>
				</div>
			</Link>
		</Motion>
	)
}
