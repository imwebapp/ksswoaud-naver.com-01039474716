'use client'

import Image from 'next/image'
import FixedComponent from '../../FixedComponent'

export default function BoardDetailCallButton({
	phoneNumber,
}: {
	phoneNumber?: string
}) {
	const handleClick = () => {
		window.open(`tel:${phoneNumber}`)
	}

	return (
		<FixedComponent>
			<div
				className='flex items-center justify-center 
        py-3 w-full gap-2 p-3 bg-white '
			>
				<button
					className='flex items-center justify-center text-white font-bold bg-black
        py-3  w-full bottom-0 right-0  rounded gap-2 max-w-[502px] mx-auto'
					onClick={handleClick}
					disabled={!phoneNumber}
				>
					<Image src='/icons/phone-rounded.svg' alt='' width={24} height={24} />
					<span>전화걸기</span>
				</button>
			</div>
		</FixedComponent>
	)
}
