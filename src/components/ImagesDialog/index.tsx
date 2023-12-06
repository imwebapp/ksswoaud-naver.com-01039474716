'use clientSide'

import { useState } from 'react'
import Image from 'next/image'

import Dialog, { DialogProps } from '../Dialog'
import { Carousel } from '../Carousel'
import { classNames } from '@/src/utils/common'
import CloseIcon from '../Icon/CloseIcon'
import WipeIcon from '../Icon/WipeIcon'

interface ImagesDialogProps extends DialogProps {
	index?: number
	images?: string[]
}

export default function ImageDialog({
	index,
	images,
	...props
}: ImagesDialogProps) {
	const [currentIndex, setCurrentIndex] = useState(0)

	return (
		<Dialog
			transparent
			bg='bg-[linear-gradient(168deg,#000_0%,rgba(0,0,0,0.00)_100%)] backdrop-blur-[2px]'
			{...props}
			className='w-full max-w-[502px]'
		>
			<button
				className='fixed text-white top-5 right-5 z-10'
				onClick={props.onClose}
			>
				<CloseIcon />
			</button>
			<div className='max-w-[502px] bg-transparent'>
				<Carousel startIndex={index} onScroll={(i) => setCurrentIndex(i)}>
					<div className='flex'>
						{images?.map((src, i) => {
							return (
								<div className='relative flex-[0_0_100%]' key={i}>
									<Image
										src={src}
										width={0}
										height={0}
										sizes='100vw'
										className='object-cover w-full h-full'
										alt='alt'
									/>
								</div>
							)
						})}
					</div>
				</Carousel>
				<div className='flex gap-2 p-2'>
					{images?.map((image, i) => (
						<div
							className={classNames(
								'h-[4px] rounded-[2.5px] grow',
								currentIndex >= i ? 'bg-white' : 'bg-[#999290]',
							)}
							key={i}
						/>
					))}
				</div>
				<div className='flex items-center flex-col  text-white mt-10'>
					<WipeIcon />
					<p>터치하여 좌우로 사진을 볼 수 있어요</p>
				</div>
			</div>
		</Dialog>
	)
}
