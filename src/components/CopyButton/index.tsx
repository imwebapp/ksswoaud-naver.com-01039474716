'use client'

import Image from 'next/image'

interface CopyButtonProps {
	value?: string
}

export default function CopyButton({ value }: CopyButtonProps) {
	const handleClick = () => {
		if (value) navigator.clipboard.writeText(value)
	}

	return (
		<button className='flex items-center' onClick={handleClick}>
			<Image src='/icons/duplicate.svg' alt='' width={24} height={24} />
			<span className='text-sm text-[#1FA990] whitespace-nowrap'>복사</span>
		</button>
	)
}
