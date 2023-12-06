import React, { useState, useEffect } from 'react'
import './style.css'

interface RippleButtonProps {
	children: React.ReactNode
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	className?: string
}

const RippleButton: React.FC<RippleButtonProps> = ({ children, onClick ,className}) => {
	const [coords, setCoords] = useState<{ x: number; y: number }>({
		x: -1,
		y: -1,
	})
	const [isRippling, setIsRippling] = useState(false)

	useEffect(() => {
		if (coords.x !== -1 && coords.y !== -1) {
			setIsRippling(true)
			const timeoutId = setTimeout(() => setIsRippling(false), 300)
			return () => clearTimeout(timeoutId)
		} else {
			setIsRippling(false)
		}
	}, [coords])

	useEffect(() => {
		if (!isRippling) setCoords({ x: -1, y: -1 })
	}, [isRippling])

	return (
		<button
			className={`ripple-button ${className}`}
			onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
				const rect = e.currentTarget.getBoundingClientRect()
				setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
				onClick && onClick(e)
			}}
		>
			{isRippling ? (
				<span
					className='ripple'
					style={{
						left: coords.x,
						top: coords.y,
					}}
				/>
			) : (
				''
			)}
			<span className='content'>{children}</span>
		</button>
	)
}

export default RippleButton
