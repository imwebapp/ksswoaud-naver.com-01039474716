import React from 'react'
import Image from 'next/image'

interface IconEmailProps {}

const IconEmail: React.FC<IconEmailProps> = () => {
	return (
		<div className='flex flex-col w-fit justify-center  items-center h-full '>
			<Image
				src='/icons/ic-email.svg'
				width={22}
				height={22}
				alt='Picture of the author'
			/>
		</div>
	)
}

export default IconEmail
