'use client'

import { useRef, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { classNames } from '@/src/utils/common'
import { Motion } from '../Motion'

export interface NavigationTabProps {
	label: string
	href?: string
	active?: boolean
	onClick?: () => void
}

export interface NavigationTabs {
	data: NavigationTabProps[]
}

export default function NavigationTabs({ data }: NavigationTabs) {
	const pathname = usePathname()
	const router = useRouter()

	const scrollRef = useRef<HTMLElement>(null)
	const indicatorRef = useRef<HTMLElement>(null)

	const [windowWidth, setWindowWidth] = useState(0)

	const handleClickItem = (href?: string, onClick?: () => void) => {
		if (href) {
			router.push(href)
		} else {
			onClick && onClick()
		}
	}

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		if (scrollRef.current) {
			const activeItem: HTMLElement | null =
				scrollRef.current.querySelector('.is-active')
			if (activeItem) {
				scrollRef.current.scroll(
					activeItem.offsetLeft -
						(scrollRef.current.clientWidth - activeItem.clientWidth) / 2,
					0,
				)

				if (indicatorRef.current) {
					indicatorRef.current.style.left =
						activeItem.offsetLeft.toString() + 'px'
					indicatorRef.current.style.width =
						activeItem.clientWidth.toString() + 'px'
				}
			}
		}
	}, [data, windowWidth])
	return (
		<nav
			className='flex w-full overflow-auto no-scrollbar px-2 py-4 max-w-[502px]
        justify-around relative gap-4'
			ref={scrollRef}
		>
			{data.map((item, index) => {
				return (
					<div
						className={classNames(
							item.active
								? 'font-bold is-active text-black'
								: 'font-normal text-[#52525B]',
							'whitespace-nowrap cursor-pointer',
						)}
						key={index}
						onClick={() => handleClickItem(item.href, item.onClick)}
					>
						<Motion>{item.label}</Motion>
					</div>
				)
			})}
			<span
				ref={indicatorRef}
				className='absolute bottom-0 bg-[linear-gradient(148deg,_#5099FF_16.53%,_#005BDB_84.41%)] 
          h-0.5 transition-[all_1s_ease] rounded-t-3xl'
			/>
		</nav>
	)
}
