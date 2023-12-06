import React from 'react'
import Image from 'next/image'

interface IconTalkProps {
	label: string
}

const IconTalk = ({
	label,
	onClick,
}: {
	label: any
	onClick: any
}) => {
	return (
		<div className='flex flex-col w-fit gap-2' onClick={onClick}>
			<Image src='/icons/talk.svg' width={60} height={60} alt={label} />
			<p className='text-[#71717A] text-[12px]'>{label}</p>
		</div>
	)
}

export default IconTalk
