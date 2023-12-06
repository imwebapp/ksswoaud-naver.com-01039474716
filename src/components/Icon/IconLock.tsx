import React from 'react'
import { FiLock } from 'react-icons/fi'
import { IconBaseProps } from 'react-icons'
import Image from 'next/image'

const IconLock: React.FC<IconBaseProps> = (props) => {
	return (
		<div className='flex flex-col w-fit'>
			<Image
				src='/icons/block.svg'
				width={22}
				height={22}
				alt='Picture of the author'
			/>
		</div>
	)
}

export default IconLock
