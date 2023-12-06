import React from 'react'
import Image from 'next/image'

interface IconBackArrowProps {}

const IconBackArrow: React.FC<IconBackArrowProps> = () => {
	return (
		<div className='flex flex-col w-fit'>
			<Image
				src='/icons/back-arrow.svg'
				width={20}
				height={20}
				alt='Picture of the author'
			/>
		</div>
	)
}

export default IconBackArrow
