'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function PostDetailAction() {
	const router = useRouter()

	const handleUp = () => {
		window.scrollTo(0, 0)
	}

	const handleClose = () => {
		router.back()
	}

	return (
		<div className='flex flex-col gap-3.5'>
			<PostDetailActionItem
				name='위로'
				icon='/icons/arrow-up.svg'
				onClick={handleUp}
			/>
			<PostDetailActionItem
				name='닫기'
				icon='/icons/close.svg'
				onClick={handleClose}
			/>
		</div>
	)
}

interface PostDetailActionItemProps {
	icon: string
	name: string
	onClick?: () => void
}

const PostDetailActionItem = ({
	icon,
	name,
	onClick,
}: PostDetailActionItemProps) => {
	return (
		<button
			className='rounded-full bg-white text-black w-[50px] h-[50px]
      flex flex-col justify-center items-center'
			onClick={onClick}
		>
			<Image src={icon} alt='' width={20} height={20} />
			<span className='text-[15px] font-medium'>{name}</span>
		</button>
	)
}
