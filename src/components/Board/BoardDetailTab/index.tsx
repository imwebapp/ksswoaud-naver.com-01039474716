'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

import { classNames } from '@/src/utils/common'
import ShopApi from '@/src/services/Shop'
import { useCheckLogin } from '@/src/hooks/useCheckLogin'

interface BoardDetailTabProps {
	id: string
	title: string
	is_like?: boolean
}

export default function BoardDetailTab({
	id,
	is_like,
	title,
}: BoardDetailTabProps) {
	const router = useRouter()
	const pathName = usePathname()
	const checkLogin = useCheckLogin()

	const isReviewPath = pathName.includes('/review')

	const ref = useRef<HTMLDivElement>(null)
	const [getPin, setGetPin] = useState(false)
	const [like, setLike] = useState(!!is_like)

	const handleReviewTab = () => {
		const params = new URLSearchParams()
		params.set('tab', 'review')
		const reviewTabUrl = pathName.replace('/review', '') + '/review'
		router.replace(reviewTabUrl)
	}

	const handleDetailTab = () => {
		const detailTabUrl = pathName.replace('/review', '')
		router.replace(detailTabUrl)
	}

	const handleLike = async () => {
		checkLogin()
		if (like) {
			setLike(false)
			await ShopApi.unLike(id)
		} else {
			setLike(true)
			await ShopApi.like(id)
		}
	}

	useEffect(() => {
		if (ref.current)
			if (window.scrollY >= ref?.current.offsetTop - 1) {
				setGetPin(true)
			}
		const checkGetPin = () => {
			if (ref.current) {
				if (window.scrollY >= ref.current.offsetTop - 1) {
					setGetPin(true)
				} else {
					setGetPin(false)
				}
			}
		}
		document.addEventListener('scroll', checkGetPin)
		return () => document.removeEventListener('scroll', checkGetPin)
	}, [])

	return (
		<div className='sticky top-0 bg-white z-10' ref={ref}>
			{getPin ? (
				<div className='flex justify-between px-3 pt-4'>
					<div className='truncate'>
						<button
							className='w-8 h-8 relative align-middle'
							onClick={router.back}
						>
							<Image src='/icons/chevron-left.svg' alt='' fill />
						</button>
						{title}
					</div>
					<div className='flex'>
						<button className='mr-3'>
							<Image src='/icons/share.svg' alt='' width={32} height={32} />
						</button>
						<button onClick={handleLike}>
							<Image
								src={like ? '/icons/heart.svg' : '/icons/heart-outline.svg'}
								alt=''
								width={32}
								height={32}
							/>
						</button>
					</div>
				</div>
			) : null}
			<div className='flex'>
				<button
					className={classNames(
						'grow text-center py-2.5 border-r',
						!isReviewPath ? 'border-b-2 border-b-[#2D343D]' : null,
					)}
					onClick={handleDetailTab}
				>
					정보
				</button>
				<button
					className={classNames(
						'grow text-center py-2.5',
						isReviewPath ? 'border-b-2 border-b-[#2D343D]' : null,
					)}
					onClick={handleReviewTab}
				>
					리뷰
				</button>
			</div>
		</div>
	)
}
