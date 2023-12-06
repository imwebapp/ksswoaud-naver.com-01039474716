'use client'

import { HTMLAttributes, useRef, useEffect } from 'react'

import { classNames } from '@/src/utils/common'
import useClickOutside from '@/src/hooks/useClickOutside'

export interface DrawerProps {
	open: boolean
	children?: React.ReactNode
	bottom?: boolean
	fullScreen?: boolean
	fullWidth?: boolean
	fullHeight?: boolean
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg'
	borderTop?: boolean
	left?: boolean
	className? : string
	onClose?: () => void
}

const DIALOG_MAX_WIDTH = {
	xs: 'max-w-[300px]',
	sm: 'max-w-[500px]',
	md: 'max-w-[800px]',
	lg: 'max-w-[1140px]',
}

const Drawer = (props: DrawerProps) => {
	const {
		open,
		onClose,
		children,
		bottom,
		fullScreen,
		maxWidth,
		fullWidth,
		fullHeight,
		borderTop,
		left,
		className
	} = props

	const containerRef = useRef(null)
	useClickOutside(containerRef, onClose)

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [open])

	if (!open) return null

	return (
		<div
			className={classNames(
				'fixed inset-0 bg-[rgba(0,0,0,0.32)] z-50 flex  items-center',
				left ? 'justify-start' : 'justify-center',
			)}
		>
			<div
				className={classNames(
					'bg-white overflow-auto pt-3',
					bottom ? 'self-end' : null,
					fullScreen ? 'w-full h-full' : null,
					maxWidth ? DIALOG_MAX_WIDTH[maxWidth] : null,
					fullWidth ? 'w-full' : null,
					fullHeight ? 'h-full' : null,
					borderTop ? 'rounded-t-xl' : null,
					className
				)}
				ref={containerRef}
			>
				{children}
			</div>
		</div>
	)
}

export default Drawer
