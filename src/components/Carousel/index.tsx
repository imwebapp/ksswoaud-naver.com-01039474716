'use client'

import { useEffect, PropsWithChildren } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'

type CarouselProps = PropsWithChildren &
	EmblaOptionsType & {
		onScroll?: (i: number) => void
	}

export const Carousel = ({ children, onScroll, ...options }: CarouselProps) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options)

	useEffect(() => {
		if (onScroll) {
			emblaApi?.on('scroll', () => {
				onScroll(emblaApi.selectedScrollSnap())
			})
			emblaApi?.on('init', () => {
				onScroll(emblaApi.selectedScrollSnap())
			})
		}
	}, [emblaApi])

	return (
		<div className='overflow-hidden' ref={emblaRef}>
			{children}
		</div>
	)
}
