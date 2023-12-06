import React from 'react'
import Image from 'next/image'

interface IconAdultProps {}

const IconAdult: React.FC<IconAdultProps> = () => {
	return (
		<div className='flex flex-col w-fit'>
			<Image
				src='/icons/adult.svg'
				width={143}
				height={142}
				alt='Picture of the author'
			/>
		</div>
	)
}

export default IconAdult
