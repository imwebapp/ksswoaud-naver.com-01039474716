import React, { useState, useEffect } from 'react'
import './style.css'

interface RippleButtonProps {
	children: React.ReactNode
	onClick?: (event: any) => void
	className?: string
	w?:string
	h? : string
}

const MaskedHoverEffect: React.FC<RippleButtonProps> = ({
	children,
	onClick,
	className,
	w = 70,
	h = 40
}) => {
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
		<div
			className={`ripple-button ${className}`}
			onClick={(e: any) => {
				const rect = e.currentTarget.getBoundingClientRect()
				setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
				onClick && onClick(e)
			}}
		>
			{isRippling ? (
				<span
					className='ripple z-50 '
					style={{
						left: coords.x,
						top: coords.y,
						width : w,
						height : h
					}}
				/>
			) : (
				''
			)}
			{children}
		</div>
	)
}

export default MaskedHoverEffect
