import React, { ReactNode, MouseEventHandler, useMemo } from 'react'

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	children?: ReactNode
	className?: string
	rounded?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
	type = 'button',
	disabled = false,
	rounded,
	className,
	onClick,
	children,
}) => {
	const classStyle = `h-12 ${className} ${
		disabled
			? 'opacity-50 ![text-[#A1A1AA]] bg-[#E4E4E7] font-normal'
			: 'opacity-100 text-white bg-gray-900 '
	} ${
		rounded ? rounded : ' rounded-xl'
	} group relative  w-full overflow-hidden  text-base font-bold `

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			type={type}
			className={classStyle}
		>
			{children}
			<div className='absolute inset-0 h-full w-full  scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-[#E4E4E7]/30'></div>
		</button>
	)
}

export default Button
