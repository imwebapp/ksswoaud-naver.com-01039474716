'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { classNames } from '@/src/utils/common'

interface BackButtonProps {
	icon: JSX.Element
	className?: string
}

const BackButton: React.FC<BackButtonProps> = ({ icon, className }) => {
	const router = useRouter()
	return (
		<div
			className={classNames('text-xl flex justify-end items-center', className)}
			onClick={() => router.back()}
		>
			{icon}
		</div>
	)
}

export default BackButton
