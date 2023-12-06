import Image from 'next/image'

import CopyButton from '../../CopyButton'
import { TagI } from '@/src/services/Tag'

interface BoardDetailInfoProps {
	address?: string
	address_2?: string
	workingTime?: string
	phoneNumber?: string
	thema?: string
	category?: string
	tags?: TagI[]
}

export default function BoardDetailInfo({
	address,
	workingTime,
	phoneNumber,
	thema,
	category,
	tags,
	address_2,
}: BoardDetailInfoProps) {
	return (
		<div className='p-4'>
			<DetailInfoItem icon='/icons/gps.svg'>
				<p className='text-sm truncate'>
					{address + ` ${address_2 ? address_2 : ''}`}
				</p>
				<CopyButton value={address} />
			</DetailInfoItem>
			<DetailInfoItem icon='/icons/clock.svg'>
				<p className='text-sm'>{workingTime}</p>
			</DetailInfoItem>
			<DetailInfoItem icon='/icons/phone-outline.svg'>
				<p className='text-sm'>{phoneNumber}</p>
				<CopyButton value={phoneNumber} />
			</DetailInfoItem>
			<DetailInfoItem icon='/icons/theme.svg'>
				<p className='text-sm'>{thema}</p>
			</DetailInfoItem>
			<DetailInfoItem icon='/icons/category.svg'>
				<p className='text-sm'>{category}</p>
			</DetailInfoItem>
			<DetailInfoItem icon='/icons/tag.svg'>
				<div className='flex gap-2 overflow-auto no-scrollbar'>
					{tags?.map((item, index) => (
						<span
							key={index}
							className='text-xs font-bold text-[#475261]
                px-4 py-1 rounded-[100px] bg-[#F0F1F3] whitespace-nowrap'
						>
							{item.name}
						</span>
					))}
				</div>
			</DetailInfoItem>
		</div>
	)
}

interface DetailInfoProps {
	icon: string
	children: React.ReactNode
}

const DetailInfoItem = ({ icon, children }: DetailInfoProps) => {
	return (
		<div className='flex gap-2 border-b py-3 items-center'>
			<Image src={icon} alt='' width={20} height={20} />
			{children}
		</div>
	)
}
