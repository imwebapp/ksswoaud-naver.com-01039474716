'use client'

import { useRef, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { LinkI } from '@/src/services/Link'
import { classNames } from '@/src/utils/common'
import { Motion } from '../Motion'
import { createBoardLink } from '@/src/utils/common'

interface NavigationProps {
	links: LinkI[]
}

export default function Navigation({ links }: NavigationProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const scrollRef = useRef<HTMLElement>(null)
	const indicatorRef = useRef<HTMLElement>(null)

	const [windowWidth, setWindowWidth] = useState(0)

	const handleClickLink = (route: string, thema_id?: string) => {
		const href = createBoardLink(route, thema_id)
		const keyword = searchParams.get('keyword')
		if (keyword) {
			const params = new URLSearchParams()
			params.set('keyword', keyword)
			router.push(href + '?' + params.toString())
		} else {
			router.push(href)
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
	}, [pathname, windowWidth])

	return (
		<nav
			className='flex w-full overflow-auto px-2 py-4
        relative gap-4 justify-between'
			ref={scrollRef}
		>
			{links.map((link, index) => {
				const href = createBoardLink(link.route, link.thema_id)

				const isActive = href && pathname.includes(href)

				return (
					<Link
						className={classNames(
							isActive
								? 'font-bold is-active text-black'
								: 'font-normal text-[#52525B]',
							'whitespace-nowrap',
						)}
						href={href}
						onClick={(e) => {
							handleClickLink(link.route, link.thema_id)
							e.preventDefault()
						}}
						key={index}
					>
						<Motion>{link.name}</Motion>
					</Link>
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
