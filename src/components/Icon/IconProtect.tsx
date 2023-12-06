import React from 'react'
import Image from 'next/image'

interface IconProtectProps {}

const IconProtect: React.FC<IconProtectProps> = () => {
	return (
		<div className='flex flex-col w-fit'>
			<Image
				src='/icons/protect.svg'
				width={195}
				height={194}
				alt='Picture of the author'
			/>
		</div>
	)
}

export default IconProtect
