'use client'

import Image from 'next/image'

import Avatar from '../Avatar'
import { classNames, formatDateTime } from '@/src/utils/common'
import ReviewApi, { ReviewI } from '@/src/services/Review'
import LockCloseIcon from '../Icon/LockCloseIcon'
import PolygonIcon from '../Icon/PolygonIcon'
import { useAppSelector } from '@/src/stores/hook'
import { enqueueSnackbar } from 'notistack'
import ReplyIcon from '../Icon/ReplyIcon'

interface ReviewItemProps {
	id: string
	nickname?: string
	avatar?: string
	content: string
	created_at: string
	count_reply: number
	post_id?: string
	shop_id?: string
	replies?: ReviewI[]
	text_white?: boolean
	selected_reply?: boolean
	isPrivate?: boolean
	hidden?: boolean
	user_id: string
	onCLickReply?: (id?: string) => void
	onGetReply?: () => void
	onDelete?: (id: string, parent_id?: string) => void
}

export default function ReviewItem(props: ReviewItemProps) {
	const {
		id,
		nickname,
		avatar,
		content,
		created_at,
		count_reply,
		replies,
		text_white,
		selected_reply,
		isPrivate,
		hidden,
		user_id,
		onCLickReply,
		onGetReply,
		onDelete,
	} = props

	const userData = useAppSelector((state) => state.user.profile)

	const handleReport = async (id: string) => {
		try {
			await ReviewApi.report(id)
			enqueueSnackbar('report success', { variant: 'success' })
		} catch (err) {
			enqueueSnackbar((err as any).message, { variant: 'error' })
		}
	}

	return (
		<div className='gap-2 w-full'>
			<div className='flex w-full'>
				{!hidden ? <Avatar size='sm' url={avatar} /> : null}
				<div className='grow ml-2'>
					<div className='flex justify-between items-center mb-4'>
						<div className='flex items-center  gap-1'>
							<p
								className={classNames(
									'text-lg font-bold',
									userData.id === user_id ? 'text-[#005BDB]' : '',
								)}
							>
								{hidden ? '비밀' : nickname}
							</p>
							{isPrivate ? (
								<span className='text-[#F00]'>
									<LockCloseIcon />
								</span>
							) : null}
						</div>
						<span className='text-xs text-[#ACACAC]'>
							{formatDateTime(created_at)}
						</span>
					</div>
					<p
						className={classNames(
							'mb-4',
							text_white ? 'text-white' : 'text-[#39424E]',
						)}
					>
						{!hidden ? content : '비밀글입니다'}
					</p>
					<div
						className={classNames(
							'flex justify-end text-sm',
							text_white ? 'text-white' : 'text-[#647488]',
						)}
					>
						{userData.id !== user_id ? (
							<button className='mr-4' onClick={() => handleReport(id)}>
								신고
							</button>
						) : null}
						{userData.id === user_id ? (
							<button className='mr-4' onClick={() => onDelete && onDelete(id)}>
								삭제
							</button>
						) : null}
						<button
							onClick={() => {
								if (onCLickReply) {
									if (selected_reply) {
										onCLickReply(undefined)
									} else {
										onCLickReply(id)
									}
								}
							}}
							className={classNames(selected_reply ? 'text-[#FF0000]' : '')}
						>
							답글
						</button>
					</div>
				</div>
			</div>
			{+count_reply &&
			(!replies || (replies && +count_reply > replies.length)) ? (
				<button
					className={classNames(
						'flex items-center  mt-4 ml-12 text-sm',
						text_white ? 'text-[#00B9FF]' : 'text-[#1FA990]',
					)}
					onClick={onGetReply}
				>
					<PolygonIcon />
					<span className='ml-1'>답글 {count_reply}개 보기</span>
				</button>
			) : null}
			{replies && replies.length ? (
				<div>
					{replies?.map((reply, i) => (
						<div key={i} className='flex items-start'>
							<span
								className={classNames(
									'mr-2',
									text_white ? 'text-white' : 'text-black',
								)}
							>
								<ReplyIcon />
							</span>
							<ReviewItem
								id={reply.id}
								content={reply.content}
								created_at={reply.created_at}
								count_reply={reply.count_reply}
								avatar={reply.user?.avatar}
								nickname={reply.user?.nickname}
								text_white={text_white}
								isPrivate={reply.private}
								hidden={hidden && reply.user_id !== userData.id}
								user_id={reply.user_id}
								onCLickReply={() => {
									if (onCLickReply) {
										onCLickReply(id)
									}
								}}
								onDelete={() => {
									onDelete && onDelete(reply.id, id)
								}}
							/>
						</div>
					))}
				</div>
			) : null}
		</div>
	)
}
