'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createLinkShopDetail, formatDate } from '@/src/utils/common'

export interface BoardItem4Props {
	edit?: boolean
	distance?: number
	image?: string
	description?: string
	end_time: string
	shopId: string
	shopTitle: string
	id?: string
	title?: string
}

export default function EventItem(props: BoardItem4Props) {
	const {
		edit,
		distance,
		title,
		end_time,
		image,
		shopId,
		shopTitle,
		id,
		description,
	} = props

	const router = useRouter()

	return (
		<Link href={createLinkShopDetail(shopTitle, shopId)}>
			<div className='relative rounded overflow-hidden shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]'>
				{/* <div
					className='absolute top-0 left-0 bg-black text-white px-2 
          border border-white rounded-br rounded-tl z-[9]'
				>
					{distance || 0}km
				</div> */}
				{edit ? (
					<button
						onClick={(e) => {
							e.preventDefault()
							router.push(`/event/create/${id}`)
						}}
						className='absolute top-2 right-2.5 z-10 bg-white rounded-full p-2'
					>
						<Image src='/icons/more.svg' alt='' width={24} height={24} />
					</button>
				) : null}
				<div className='relative w-full h-[170px] max-h-[170px]'>
					{image ? (
						<Image src={image} alt='' fill className='object-cover' />
					) : null}
				</div>
				<p className='truncate px-3 mt-2'>{description}</p>
				<p className='text-sm text-[#FF1717] px-3 mb-3'>
					~{formatDate(parseInt(end_time))}까지
				</p>
			</div>
		</Link>
	)
}
