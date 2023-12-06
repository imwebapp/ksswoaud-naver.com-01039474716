'use client'

import Image from 'next/image'

import { MentorI } from '@/src/services/Mentor'

export interface MentorItemProps {
	index: number
	data: MentorI
	onClick?: (index: number) => void
}

export default function MentorItem({ data, index, onClick }: MentorItemProps) {
	return (
		<div
			className='rounded-lg border flex p-2 gap-3 items-center'
			onClick={() => {
				if (onClick) onClick(index)
			}}
		>
			<div
				className='w-[84px] h-[84px] min-w-[84px] rounded-lg overflow-hidden relative
        [&#ReactSimpleImageViewer]:z-50'
			>
				<Image
					src={data.images[0]}
					alt=''
					width={84}
					height={84}
					className='object-cover w-full h-full'
				/>
			</div>
			<div>
				<p className='font-medium mb-1'>{data.name}</p>
				<p className='text-sm'>{data.description}</p>
			</div>
		</div>
	)
}
