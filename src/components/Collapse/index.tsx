'use client'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import React, { useState } from 'react'
import RippleButton from '../RippleAnimation'

const Arrow = () => {
	return (
		<svg
			width='8'
			height='12'
			viewBox='0 0 8 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M1.70492 0L0.294922 1.41L4.87492 6L0.294922 10.59L1.70492 12L7.70492 6L1.70492 0Z'
				fill='#D4D4D8'
			/>
		</svg>
	)
}

interface CollapseItem {
	key?: any
	label?: React.ReactNode
	icon?: React.ReactNode
	children?: React.ReactNode
	onClick?: () => void
}

interface CollapseProps {
	items: CollapseItem[]
	defaultActiveKey?: string[]
	onChange?: (activeKey: string[]) => void
}

const Collapse: React.FC<CollapseProps> = ({
	items,
	defaultActiveKey = [],
	onChange,
}) => {
	const [activeKey, setActiveKey] = useState<string[]>(defaultActiveKey)

	const handleItemClick = (key: string) => {
		let newActiveKey = [...activeKey]
		if (newActiveKey.includes(key)) {
			newActiveKey = newActiveKey.filter((item) => item !== key)
		} else {
			newActiveKey.push(key)
		}

		setActiveKey(newActiveKey)

		if (onChange) {
			onChange(newActiveKey)
		}
	}

	return (
		<div>
			{items
				.filter((i) => !isEmpty(i))
				.map((item) => (
					<div key={item.key} className='px-3 '>
						<RippleButton className='hover:text-[#0A63E0] hover:font-bold'>
							<div
								className={`cursor-pointer flex gap-1 justify-between border-b border-[#F6F8FA] py-3 hover:text-[#0A63E0] hover:font-bold ${
									activeKey.includes(item.key) ? 'text-[#0A63E0] font-bold' : ''
								}`}
								onClick={() => {
									if (item.onClick) {
										item.onClick()
									}
									{
										item.children && handleItemClick(item.key)
									}
								}}
							>
								<div
									className={`flex justify-center items-center gap-2 cursor-pointer `}
								>
									{item.icon}
									{item.label}
								</div>
								<div
									className={`px-2 ${
										activeKey.includes(item.key)
											? 'rotate-90 duration-[0.4s]'
											: 'duration-[0.4s]'
									}`}
								>
									<Arrow />
								</div>
							</div>
						</RippleButton>
						<div
							className={`pl-4 text-start ml-5 flex flex-col gap-4  cursor-pointer h-0 overflow-hidden duration-[0.4s] ${
								activeKey.includes(item.key) && 'py-3 h-fit duration-[0.4s]'
							}`}
						>
							{item.children}
						</div>
					</div>
				))}
		</div>
	)
}

export default Collapse
