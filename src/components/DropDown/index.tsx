'use client'

import { useEffect, useRef, useState } from 'react'

import useClickOutside from '@/src/hooks/useClickOutside'

export interface DropDownProps {
	children?: React.ReactNode
	className?: string
	anchorEl?: HTMLElement | null
	onClose?: () => void
}

export default function DropDown(props: DropDownProps) {
	const { children, className, anchorEl, onClose } = props

	const ref = useRef<HTMLDivElement | null>(null)

	const left = anchorEl ? anchorEl.getBoundingClientRect().left : 0
	const top = anchorEl
		? anchorEl.getBoundingClientRect().top +
		  anchorEl.getBoundingClientRect().height
		: 0

	const handleClose = () => {
		onClose && onClose()
	}

	useClickOutside(ref, handleClose)

	useEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect()
			const isOverRight = rect.x + rect.width > window.innerWidth
			if (isOverRight) {
				ref.current.style.right = '16px'
				ref.current.style.left = 'unset'
			}
		}
		if (anchorEl) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [ref.current, anchorEl])

	return anchorEl ? (
		<div className='fixed inset-0 z-50'>
			<div className='w-full h-full relative'>
				<div
					className='rounded-xl p-3 shadow-[0px_32px_48px_-8px_rgba(0,0,0,0.10),0px_0px_14px_-4px_rgba(0,0,0,0.05),0px_40px_64px_-12px_rgba(0,0,0,0.08),0px_-2px_12px_0px_rgba(0,0,0,0.08)]
             bg-white backdrop-blur-lg'
					style={{
						position: 'absolute',
						top,
						left,
					}}
					ref={ref}
				>
					{children}
				</div>
			</div>
		</div>
	) : null
}
