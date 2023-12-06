import Image from 'next/image'

import { Carousel } from '../Carousel'
import { classNames } from '@/src/utils/common'
import { BannerI } from '@/src/services/Banner'

interface BannerProps {
	data: BannerI[]
}

export default function Banner({ data }: BannerProps) {
	return (
		<Carousel>
			<div className='flex'>
				{data.map((banner, i) => {
					return (
						<div
							className={classNames(
								'relative h-[170px] rounded-2xl overflow-hidden',
								data.length > 1 ? 'flex-[0_0_90%] mr-5' : 'flex-[0_0_100%]',
							)}
							key={i}
						>
							<Image
								src={banner.thumbnail}
								fill
								className='object-cover'
								alt='alt'
							/>
						</div>
					)
				})}
			</div>
		</Carousel>
	)
}
