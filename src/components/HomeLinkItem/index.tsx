import Image from 'next/image'
import Link from 'next/link'

import { Motion } from '../Motion'
import { BOARD_ROUTE } from '@/src/constants'
import { createBoardLink } from '@/src/utils/common'

export interface HomeLinkItemProps {
	name: string
	image: string
	route: string
	themaId: string
}

export default function HomeLinkItem({
	name,
	image,
	route,
	themaId,
}: HomeLinkItemProps) {
	return (
		<Motion>
			<Link
				href={createBoardLink(route, themaId)}
				className='flex flex-col items-center gap-3 select-none'
			>
				<Image
					src={image ?? ''}
					alt=''
					width={38}
					height={38}
					className='max-w-[38px] max-h-[38px]'
				/>
				<p className='font-medium text-center'>{name}</p>
			</Link>
		</Motion>
	)
}
