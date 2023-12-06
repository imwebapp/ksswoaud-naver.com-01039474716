import { HTMLProps, useEffect } from 'react'
import Image from 'next/image'
import { useState } from 'react'

import { classNames } from '@/src/utils/common'

export default function CreateStoreTab({
	onChange,
	items = [],
	tab = ''
}: {
	onChange: Function
	items: any[]
	tab : any
}) {
	

	return (
		<div className='flex'>
			<CreateStoreTabButton
				name={items[0].value}
				value={items[0].value}
				onClick={() => onChange(items[0].value)}
				icon={
					tab === 'registion'
						? '/icons/store-plus-white.svg'
						: '/icons/store-plus.svg'
				}
				active={tab === 'registion'}
			>
				{items[0].label}
			</CreateStoreTabButton>
			<CreateStoreTabButton
				onClick={() => onChange(items[1].value)}
				name={items[1].value}
				value={items[1].value}
				icon={
					tab === items[1].value
						? '/icons/store-menu-white.svg'
						: '/icons/store-menu.svg'
				}
				active={tab === items[1].value}
			>
				{items[1].label}
			</CreateStoreTabButton>
		</div>
	)
}

interface CreateStoreTabButtonProps extends HTMLProps<HTMLButtonElement> {
	active?: boolean
	icon?: string
	onClick?: () => void
}

const CreateStoreTabButton = ({
	className,
	active,
	icon,
	onClick,
	children,
	...props
}: CreateStoreTabButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={classNames(
				className,
				'py-2.5 text-[#71717A] rounded-md flex justify-center items-center w-full',
				active ? 'bg-black text-white' : null,
			)}
		>
			{icon ? <Image src={icon} alt='' width={24} height={24} /> : null}
			<span>{children}</span>
		</button>
	)
}
