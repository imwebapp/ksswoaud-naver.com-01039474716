'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import { Motion } from '../Motion'
import HomeIcon from '../Icon/HomeIcon'
import HomeActiveIcon from '../Icon/HomeActiveIcon'
import RankIcon from '../Icon/RankIcon'
import RankActiveIcon from '../Icon/RankActiveIcon'
import CakeIcon from '../Icon/CakeIcon'
import CakeActiveIcon from '../Icon/CakeActiveIcon'
import FaceIcon from '../Icon/FaceIcon'
import FaceActiveIcon from '../Icon/FaceActiveIcon'
export interface BottomNavigationProps {
	postThema?: string
}

import FixedComponent from '../FixedComponent'
import { dataUserFromCookies } from '@/src/utils/common'

export default function BottomNavigation({ postThema }: BottomNavigationProps) {
	const pathname = usePathname()
	const { isLoginExpired } = dataUserFromCookies()
	const pathName = usePathname()
	const [show, setShow] = useState(true)

	const LINK = useMemo(
		() => [
			{
				name: '홈',
				icon: <HomeIcon />,
				activeIcon: <HomeActiveIcon />,
				href: '/',
			},
			{
				name: '이벤트',
				icon: <RankIcon />,
				activeIcon: <RankActiveIcon />,
				href: '/event',
			},
			{
				name: '커뮤니티',
				icon: <CakeIcon />,
				activeIcon: <CakeActiveIcon />,
				href: postThema ? `/post/${postThema}` : '',
			},
			{
				name: '마이',
				icon: <FaceIcon />,
				activeIcon: <FaceActiveIcon />,
				href: isLoginExpired ? '/login' : '/profile',
			},
		],
		[isLoginExpired, postThema],
	)

	const isRenderBottomNav = () => {
		switch (pathname) {
			// TODO : các router khác nếu thỏa điều kiện
			default:
				return true
		}
	}
	const isRendered = isRenderBottomNav()

	useEffect(() => {
		const threshold = 0
		let lastScrollY = window.pageYOffset
		let ticking = false

		const updateScrollDir = () => {
			const scrollY = window.pageYOffset

			if (Math.abs(scrollY - lastScrollY) < threshold) {
				ticking = false
				return
			}
			setShow(scrollY > lastScrollY ? false : true)
			lastScrollY = scrollY > 0 ? scrollY : 0
			ticking = false
		}

		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(updateScrollDir)
				ticking = true
			}
		}

		window.addEventListener('scroll', onScroll)

		return () => window.removeEventListener('scroll', onScroll)
	})

	const activeLink = (href: string) => {
		return pathName === href
	}

	return (
		<>
			{isRendered && show && (
				<FixedComponent>
					<nav className='w-full px-4 flex justify-around bg-white z-10'>
						<div className='max-w-[502px] mx-auto flex w-full  justify-around  border-t py-3'>
							{LINK.map((link, index) => {
								const active = activeLink(link.href)
								return (
									<Motion key={index}>
										<Link href={link.href}>
											<div
												className={`flex flex-col items-center text-[#71717A] gap-1.5`}
											>
												{active ? link.activeIcon : link.icon}
												<span
													className={`while-space-nowrap  text-xs ${
														!activeLink(link.href)
															? 'text-[#71717A]'
															: 'text-gray-700 font-bold'
													} `}
												>
													{link.name}
												</span>
											</div>
										</Link>
									</Motion>
								)
							})}
						</div>
					</nav>
				</FixedComponent>
			)}
		</>
	)
}
