import React from 'react'
import Image from 'next/image'

interface IconPhoneCallProps {}

const IconPhoneCall: React.FC<IconPhoneCallProps> = () => {
	return (
		<div className='flex flex-col w-fit'>
			<Image
				src='/icons/phone-call.svg'
				width={24}
				height={24}
				alt='Picture of the author'
			/>
		</div>
	)
}

export default IconPhoneCall
