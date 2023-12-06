import Image from 'next/image'

import { Carousel } from '../../Carousel'

interface BoardDetailCarouselProps {
	images: string[]
	title?: string
}

export default function BoardDetailCarousel({
	images,
	title,
}: BoardDetailCarouselProps) {
	return (
		<Carousel loop>
			<div className='flex'>
				{images.map((src, i) => {
					return (
						<div className='relative h-64 flex-[0_0_100%]' key={i}>
							<Image
								src={src}
								fill
								className='object-cover'
								alt={title ?? ''}
							/>
						</div>
					)
				})}
			</div>
		</Carousel>
	)
}
