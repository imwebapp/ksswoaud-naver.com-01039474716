import React, { ReactNode } from 'react'

interface PrefixIconProps {
	icon?: ReactNode
	error?: boolean
}

const PrefixIcon: React.FC<PrefixIconProps> = ({ icon, error }) => {
	return (
		<div className='absolute flex border border-transparent left-0 top-0 h-full w-fit px-2'>
			<div
				className={`flex items-center justify-center rounded-tl rounded-bl z-10  text-lg h-full w-full ${
					error ? 'text-red-500' : ''
				}`}
			>
				{icon}
			</div>
		</div>
	)
}

export default PrefixIcon
