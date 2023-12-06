'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import ShareIcon from '../Icon/ShareIcon'
import ArrowLeftIcon from '../Icon/ArrowLeftIcon'
import { classNames } from '@/src/utils/common'
import FixedComponent from '../FixedComponent'
import ShareIcon2 from '../Icon/ShareIcon2'

export interface BlogDetailHeaderProps {
	title?: string
}

export default function BlogDetailHeader({ title }: BlogDetailHeaderProps) {
	const router = useRouter()

	const [scroll, setScroll] = useState(false)

	const handleGoBack = () => {
		router.back()
	}

	useEffect(() => {
		const checkScroll = () => {
			if (window.scrollY > 0) {
				setScroll(true)
			} else {
				setScroll(false)
			}
		}
		window.addEventListener('scroll', checkScroll)
		return () => window.removeEventListener('scroll', checkScroll)
	}, [])
	return (
		<>
			<FixedComponent position='top'>
				<div
					className={classNames(
						'flex justify-between items-center p-3',
						scroll ? 'bg-white text-black' : '',
					)}
				>
					<div className='flex items-center'>
						<button
							className={classNames(
								'text-[40px] text-white',
								scroll ? '' : 'rounded-full bg-[rgba(0,0,0,0.50)]',
							)}
							style={{ color: scroll ? 'black' : undefined }}
							onClick={handleGoBack}
						>
							<ArrowLeftIcon />
						</button>
						{scroll ? <p className='text-2xl font-bold'>{title}</p> : null}
					</div>
					<button>{scroll ? <ShareIcon2 /> : <ShareIcon />}</button>
				</div>
			</FixedComponent>
		</>
	)
}
