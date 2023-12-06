import React from 'react'
import Image from 'next/image'

interface IconArrowDownProps {}

const IconArrowDown: React.FC<IconArrowDownProps> = () => {
	return (
		<span className='flex flex-col w-fit'>
			<Image
				src='/icons/arrow-down.svg'
				width={17}
				height={16}
				alt='Picture of the author'
			/>
		</span>
	)
}

export default IconArrowDown
