'use client'

import { HTMLAttributes, useRef, useEffect } from 'react'

import { classNames } from '@/src/utils/common'
import useClickOutside from '@/src/hooks/useClickOutside'

export interface DialogProps {
	open: boolean
	children?: React.ReactNode
	bottom?: boolean
	fullScreen?: boolean
	fullWidth?: boolean
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg'
	borderTop?: boolean
	onClose?: () => void
	border?: string
	fit?: boolean
	bg?: string
	transparent?: boolean

	className?: string
}

const DIALOG_MAX_WIDTH = {
	xs: 'max-w-[300px]',
	sm: 'max-w-[500px]',
	md: 'max-w-[800px]',
	lg: 'max-w-[1140px]',
}

const Dialog = (props: DialogProps) => {
	const {
		open,
		onClose,
		children,
		bottom,
		fullScreen,
		maxWidth,
		fullWidth,
		borderTop,
		border,
		fit,
		transparent,
		bg,
		className,
	} = props

	const containerRef = useRef(null)
	useClickOutside(containerRef, onClose)

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [open])

	if (!open) return null

	return (
		<div
			className={classNames(
				'fixed inset-0 z-50 flex justify-center items-center',
				!bg ? 'bg-[rgba(0,0,0,0.32)]' : bg,
			)}
		>
			<div
				className={classNames(
					'overflow-auto max-h-screen',
					bottom ? 'self-end' : null,
					fullScreen ? 'w-full h-full' : null,
					fit ? 'w-fit h-fit' : null,
					maxWidth ? DIALOG_MAX_WIDTH[maxWidth] : null,
					fullWidth ? 'w-full' : null,
					borderTop ? 'rounded-t-xl' : null,
					border,
					className,
					!transparent ? 'bg-white' : '',
				)}
				ref={containerRef}
			>
				{children}
			</div>
		</div>
	)
}

export default Dialog
