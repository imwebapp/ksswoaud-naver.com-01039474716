import { createLinkShopDetail } from '@/src/utils/common'
import Image from 'next/image'
import Link from 'next/link'

interface BoardHomeItemProps {
	id: string
	title: string
	image?: string
	distance?: number
	thema?: string
}

export default function BoardHomeItem({
	id,
	title,
	image,
	distance,
	thema,
}: BoardHomeItemProps) {
	return (
		<Link href={createLinkShopDetail(title, id)}>
			<div className='flex flex-col'>
				<div className='relative h-[140px] w-full rounded-xl overflow-hidden'>
					{image ? (
						<Image src={image} alt={title} fill className='object-cover' />
					) : null}
				</div>
				<p className='line-clamp-2 font-bold mt-3 mb-1'>{title}</p>
				<div className='flex justify-between text-[#3F3F46]'>
					<span>{thema}</span>
					<div className='flex gap-2 items-center'>
						<Image src='/icons/gps.svg' width={20} height={20} alt='' />
						<span>{Math.round(distance || 0)} km</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
