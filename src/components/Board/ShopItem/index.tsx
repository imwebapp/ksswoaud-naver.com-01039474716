'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TiTick } from 'react-icons/ti'

const IcTik = () => {
	return (
		<svg
			width='10'
			height='9'
			viewBox='0 0 10 9'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M0.800781 3.29922L5.00078 7.49922L9.20078 1.19922'
				stroke='white'
				strokeWidth='1.5'
				strokeLinecap='round'
			/>
		</svg>
	)
}

import ShopApi from '@/src/services/Shop'
import {
	classNames,
	createLinkShopDetail,
	checkOpeningHour,
} from '@/src/utils/common'
import ArrowRightIcon from '../../Icon/ArrowRightIcon'
import { Motion } from '../../Motion'

interface ShopItemProps {
	id: string
	title: string
	distance?: number
	hashtags?: string[]
	images?: string[]
	opening_hours?: string
	is_like?: boolean
	keyword?: string
	onSelect?: () => void
	checked?: boolean
	hide_select?: boolean
}

export default function ShopItem({
	id,
	title,
	distance,
	hashtags,
	images,
	opening_hours,
	is_like,
	keyword,
	onSelect,
	checked,
	hide_select,
}: ShopItemProps) {
	const [like, setLike] = useState(!!is_like)

	const handleLike = async (e: any) => {
		e.preventDefault()
		if (like) {
			setLike(false)
			await ShopApi.unLike(id)
		} else {
			setLike(true)
			await ShopApi.like(id)
		}
	}

	const highlightText = (text: string) => {
		if (!keyword || !keyword.trim()) {
			return <>{text}</>
		}

		const regex = new RegExp(`(${keyword})`, 'gi')
		const parts = text.split(regex)

		return (
			<>
				{parts.map((part, index) =>
					regex.test(part) ? (
						<span key={index} className='text-[#00F]'>
							{part}
						</span>
					) : (
						<span key={index}>{part}</span>
					),
				)}
			</>
		)
	}

	return (
		<Link href={createLinkShopDetail(title, id)}>
			<div className='flex flex-col gap-3 p-4'>
				<div className='flex justify-between px-3 gap-2'>
					<div className='flex flex-row gap-2 items-center max-w-[calc(100%-50px)]'>
						<p className='text-xl text-bold truncate'>{highlightText(title)}</p>
						{distance !== undefined ? (
							<span className='text-[#3F3F46]'>{Math.round(distance)}km</span>
						) : null}
					</div>
					{!onSelect ? (
						<Image
							src={like ? '/icons/star.svg' : '/icons/star_border.svg'}
							alt={title}
							width={24}
							height={24}
							onClick={handleLike}
						/>
					) : (
						<>
							{!hide_select ? (
								<label className='cursor-pointer label relative w-fit h-fit'>
									<input
										type='checkbox'
										onClick={(e) => {
											e.stopPropagation()
										}}
										onChange={onSelect}
										checked={checked}
										className='rounded-full appearance-none h-[22px] w-[22px] border border-black
							  checked:bg-[#0063F7] checked:border-0 transition-all duration-200 peer'
									/>
									<div
										className={`rounded bottom-[11px] left-[6.5px] h-fit w-fit absolute pointer-events-none 
                flex justify-center items-center peer-checked:border-green-300`}
									>
										<IcTik />
									</div>
								</label>
							) : null}
						</>
					)}
				</div>
				<div className='flex max-w-full overflow-auto gap-3.5'>
					{images?.map((image, index) => {
						if (index > 2) return
						return (
							<div
								key={index}
								className={classNames(
									images.length === 1 ? 'w-full' : 'w-[90%] min-w-[90%]',
									'rounded-xl h-[196px] overflow-hidden relative',
								)}
							>
								<Motion className='w-full h-full'>
									<Image
										src={image}
										alt=''
										width={502}
										height={300}
										priority={true}
										className='object-cover w-full h-full'
									/>
								</Motion>
							</div>
						)
					})}
					{images && images.length > 3 ? (
						<div
							className='flex items-center justify-center flex-col font-bold
              gap-1'
						>
							<div className='p-[15px] bg-[#D9D9D9] rounded-full'>
								<ArrowRightIcon />
							</div>
							<p>더보기</p>
						</div>
					) : null}
				</div>
				<div className='bg-[#F6F8FA] p-1 rounded-[32px]'>
					{opening_hours ? (
						<span
							className={classNames(
								'px-2 py-1 bg-white rounded-3xl mr-2 font-bold',
								!checkOpeningHour(opening_hours) ? 'text-[#B00006]' : '',
							)}
						>
							<>{checkOpeningHour(opening_hours) ? '영업 중' : '영업 전'}</>
						</span>
					) : null}
					<span>{opening_hours}</span>
				</div>
				<div className='flex gap-2 overflow-auto no-scrollbar'>
					{hashtags?.map((item, index) => (
						<div
							key={index}
							className='p-1 bg-[#F6F8FA] text-xs text-[#71717A] rounded
                whitespace-nowrap'
						>
							{highlightText(item)}
						</div>
					))}
				</div>
			</div>
		</Link>
	)
}
