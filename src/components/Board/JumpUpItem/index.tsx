import Link from 'next/link'
import Image from 'next/image'

import { classNames, createLinkShopDetail } from '@/src/utils/common'
import { Motion } from '../../Motion'
export interface JumpUpItemProps {
	id: string
	title: string
	image: string
	first?: boolean
}

export default function JumpUpItem({
	id,
	title,
	image,
	first,
}: JumpUpItemProps) {
	return (
		<Motion>
			<Link href={createLinkShopDetail(title, id)} className='h-full pb-2'>
				<div className='rounded overflow-hidden h-full min-h-[145px] relative'>
					<Image
						src={image}
						alt={title}
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						className='object-cover w-auto h-full'
					/>
					<div
						className={classNames(
							'absolute bottom-0 left-0 right-0 flex justify-center px-3',
							first ? 'text-xl py-6' : 'text-[15px] py-2',
						)}
						style={{
							background:
								'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)',
						}}
					>
						<p className='text-white text-center w-full line-clamp-2 font-bold'>
							{title}
						</p>
					</div>
				</div>
			</Link>
		</Motion>
	)
}
