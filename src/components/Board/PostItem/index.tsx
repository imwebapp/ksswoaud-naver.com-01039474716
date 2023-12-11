'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useAppSelector } from '@/src/stores/hook'
import {
	classNames,
	convertLinkIframe,
	formatDate,
	getImageFromHtml,
} from '@/src/utils/common'
import MoreHorizontalIcon from '../../Icon/MoreHorizontalIcon'
import { Motion } from '../../Motion'
import ArrowRightIcon from '../../Icon/ArrowRightIcon'
import { useCheckLogin } from '@/src/hooks/useCheckLogin'
import ShopApi from '@/src/services/Shop'
import { useState } from 'react'
import PostApi from '@/src/services/Post'
import ShareButton from '@/src/containers/ShareButton'

interface PostItemProps {
	id: string
	images?: any
	title?: string
	createdAt?: Date
	comment?: number
	nickname?: string
	user_id?: string
	content: string
	avatarUser: string
	video?: string
	like?: number
	dislike?: number
	report?: number
	is_like?: boolean
	is_dislike?: boolean
	is_report?: boolean
	onClickAction?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function PostItem({
	id,
	images,
	title,
	createdAt,
	comment,
	nickname,
	user_id,
	content,
	avatarUser,
	video,
	like,
	dislike,
	report,
	is_like,
	is_dislike,
	is_report,
	onClickAction,
}: PostItemProps) {
	const userData = useAppSelector((state) => state.user.profile)
	const checkLogin = useCheckLogin()
	const [countLike, setCountLike] = useState<any>(like)
	const [countDisLike, setCountDisLike] = useState<any>(dislike)
	const [_islike, setLike] = useState(!!is_like)
	const [_isDislike, setDisLike] = useState(!!is_dislike)
	const [_isReport, setReport] = useState(!!is_report)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		onClickAction && onClickAction(event)
	}

	const ImageWidget = () => {
		return (
			<div className='mt-[18px] flex max-w-full overflow-auto gap-3.5'>
				{images?.map((image: any, index: any) => {
					if (index > 2) return
					return (
						<div
							key={index}
							className={classNames(
								images.length === 1 ? 'w-full' : 'w-[80%] min-w-[80%]',
								'rounded-xl h-[300px] overflow-hidden relative',
							)}
						>
							<Motion className='w-full h-full'>
								<Image
									src={image}
									alt=''
									fill
									priority={true}
									className='object-cover'
								/>
							</Motion>
							<div className='absolute w-[50px] h-[30px] bg-black opacity-50 top-4 right-4 text-center rounded-full'>
								<span className='text-xs text-white'>
									{index + 1}/{images.length}
								</span>
							</div>
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
		)
	}

	const VideoWidget = () => {
		return (
			<>
				{video && (
					<div className='flex justify-center mt-2'>
						<iframe src={convertLinkIframe(video)} width={502} height={250} />
					</div>
				)}
			</>
		)
	}

	const InfoUserWidget = () => {
		return (
			<>
				<div className='flex items-center justify-between'>
					<div className='flex gap-2'>
						<div className='min-w-[52px]'>
							{avatarUser ? (
								<Image
									src={avatarUser}
									alt=''
									width={52}
									height={52}
									className='aspect-square object-cover rounded-full'
								/>
							) : (
								<div className='flex border w-[52px] min-w-[52px] h-[52px] rounded-full flex-col items-center justify-center gap-2'>
									<Image src='/icons/cycle.svg' width={12} height={12} alt='' />
									<Image src='/icons/eclip.svg' width={21} height={12} alt='' />
								</div>
							)}
						</div>
						<div className='flex flex-col justify-center'>
							<p className='line-clamp-2 font-medium mb-2'>{title}</p>
							<div className='flex flex-col'>
								<span className='text-base '>{nickname ?? ''}</span>
								<li className='text-xs text-[#272B30] mt-1'>
									{formatDate(createdAt)}
								</li>
							</div>
						</div>
					</div>
					{userData.id === user_id ? (
						<button className='p-2' onClick={handleClick}>
							<Image
								src='/icons/more-vertical.svg'
								width={24}
								height={24}
								alt=''
							/>
						</button>
					) : null}
				</div>
				<div className='h-[12px]'></div>
			</>
		)
	}

	const ContentWidget = () => {
		return (
			<span className='mt-2 text-[15px] text-[#222222] line-clamp-2'>
				{content}
			</span>
		)
	}

	const handleLike = async (e: any) => {
		e.preventDefault()
		checkLogin()
		if (_islike) {
			setCountLike(countLike - 1)
			setLike(false)
			await PostApi.unLike(id)
		} else {
			setCountLike(countLike + 1)
			setLike(true)
			await PostApi.like(id)
		}
	}

	const handleDisLike = async (e: any) => {
		e.preventDefault()
		checkLogin()
		if (_isDislike) {
			setCountDisLike(countDisLike - 1)
			setDisLike(false)
			await PostApi.unDisLike(id)
		} else {
			setCountDisLike(countDisLike + 1)
			setDisLike(true)
			await PostApi.dislike(id)
		}
	}

	const handleReportPost = async (e: any) => {
		e.preventDefault()
		checkLogin()
		if (_isReport) {
			setReport(false)
			await PostApi.unreport(id)
		} else {
			setReport(true)
			await PostApi.report(id)
		}
	}

	const ActionWidget = () => {
		return (
			<div className='mt-[12px] flex flex-row justify-between items-center border-b-[1px] border-[#B9BCBF]'>
				<button
					onClick={handleLike}
					className='p-2 flex flex-row items-center gap-1'
				>
					<Image
						src={!!_islike ? '/icons/like2.svg' : '/icons/like.svg'}
						width={24}
						height={24}
						alt=''
					/>
					<span className='text-base mb-1'>{countLike}</span>
				</button>
				<button
					onClick={handleDisLike}
					className='p-2 flex flex-row items-center gap-1'
				>
					<Image
						src={!!_isDislike ? '/icons/dislike2.svg' : '/icons/dislike.svg'}
						width={24}
						height={24}
						alt=''
					/>
					<span className='text-base mb-1'>{countDisLike}</span>
				</button>
				<button className='p-2 flex flex-row items-center gap-1'>
					<Image src='/icons/chat.svg' width={24} height={24} alt='' />
					<span className='text-base mb-1'>{comment}</span>
				</button>
				<button
					onClick={handleReportPost}
					className='p-2 flex flex-row items-center gap-1'
				>
					<Image
						src={!!_isReport ? '/icons/security2.svg' : '/icons/security.svg'}
						width={24}
						height={24}
						alt=''
					/>
					<span
						className={`text-base mb-1 ${
							!!_isReport ? 'text-[#B31F24]' : 'text-black'
						}`}
					>
						신고
					</span>
				</button>
				<div className='p-2 flex flex-row items-center gap-1'>
					<ShareButton icon='/icons/forward.svg' />
				</div>
			</div>
		)
	}

	return (
		<Link href={`/post/detail/${id}`} className='px-4 pt-4 block'>
			<InfoUserWidget />
			<ContentWidget />
			<ImageWidget />
			<VideoWidget />
			<ActionWidget />
		</Link>
	)
}
