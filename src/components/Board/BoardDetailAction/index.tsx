'use client'

import { useState } from 'react'
import Image from 'next/image'

import { useCheckLogin } from '@/src/hooks/useCheckLogin'
import ShopApi from '@/src/services/Shop'

interface BoardDetailActionProps {
	phoneNumber?: string
	id: string
	like?: boolean
}

export default function BoardDetailAction({
	phoneNumber,
	id,
	like,
}: BoardDetailActionProps) {
	const checkLogin = useCheckLogin()

	const [isLike, setIsLike] = useState(!!like)

	const handleCall = () => {
		if (phoneNumber) window.open(`tel:${phoneNumber}`)
	}

	const handleLikeShop = async () => {
		checkLogin()
		if (isLike) {
			setIsLike(false)
			await ShopApi.unLike(id)
		} else {
			setIsLike(true)
			await ShopApi.like(id)
		}
	}

	return (
		<div className='flex py-4 items-center border-y'>
			<ActionItem
				name='전화'
				icon='/icons/phone-outline.svg'
				onClick={handleCall}
			/>
			<hr className='w-[0.5px] h-[50px] bg-[#9DA7B4]' />
			<ActionItem
				name='찜하기'
				icon={isLike ? '/icons/heart.svg' : '/icons/heart-outline.svg'}
				onClick={handleLikeShop}
			/>
			<hr className='w-[0.5px] h-[50px] bg-[#9DA7B4]' />
			<ActionItem name='길찾기' icon='/icons/direction.svg' />
			<hr className='w-[0.5px] h-[50px] bg-[#9DA7B4]' />
			<ActionItem name='공유' icon='/icons/share.svg' />
		</div>
	)
}

interface ActionItemProps {
	name: string
	icon: string
	onClick?: () => void
}

const ActionItem = ({ name, icon, onClick }: ActionItemProps) => {
	return (
		<button
			className='flex flex-col items-center justify-center grow'
			onClick={onClick}
		>
			<Image src={icon} alt='' width={36} height={36} />
			<span className='font-medium'>{name}</span>
		</button>
	)
}
