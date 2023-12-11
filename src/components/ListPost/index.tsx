'use client'

import { useEffect, useState } from 'react'
import {
	AutoSizer,
	InfiniteLoader,
	List,
	WindowScroller,
} from 'react-virtualized'
import { useRouter } from 'next/navigation'

import { useAppDisPatch, useAppSelector } from '@/src/stores/hook'
import { postActions, selectListPostByThema } from '@/src/stores/post/postSlice'
import { PostItem } from '../Board'
import DropDown from '../DropDown'
import UserEditIcon from '../Icon/UserEditIcon'
import PostDeleteIcon from '../Icon/PostDeleteIcon'
import { classNames } from '@/src/utils/common'
import InfiniteScroll from 'react-infinite-scroll-component'

interface ListPostProps {
	thema_id: string
	category_id?: string
	keyword?: string
}

export default function ListPost(props: ListPostProps) {
	const { thema_id, category_id, keyword } = props
	const listData = useAppSelector(selectListPostByThema(thema_id))
	const data = listData?.data
	const total = listData?.total

	const router = useRouter()
	const dispatch = useAppDisPatch()
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const [selectedId, setSelectedId] = useState<string>()

	const isRowLoaded = ({ index }: { index: number }) => {
		return !!data && !!data[index]
	}

	const loadMoreRows = async () => {
		dispatch(postActions.loadMore({ thema_id, category_id, keyword }))
	}

	const rowRenderer = (index: any) => {
		if (data && data[index]) {
			const post = data[index]
			return (
				<PostItem
					key={index}
					id={post.id}
					images={post.images}
					title={post.title}
					comment={post.comment}
					like={post.like}
					dislike={post.dislike}
					report={post.report}
					is_like={post.is_like}
					is_dislike={post.is_dislike}
					is_report={post.is_report}
					createdAt={post.created_at}
					nickname={post.user?.nickname}
					content={post.content}
					avatarUser={post.user?.avatar}
					user_id={post.user_id}
					video={post.videos && post.videos[0]}
					onClickAction={(e) => {
						handleClickAction(e)
						setSelectedId(post.id)
					}}
				/>
			)
		}
	}

	const handleClickAction = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleEdit = () => {
		router.push(`/post/create/${thema_id}/${selectedId}`)
		handleClose()
	}

	const handleDelete = () => {
		if (selectedId) {
			dispatch(postActions.delete({ id: selectedId, thema_id }))
		}
		handleClose()
	}

	useEffect(() => {
		dispatch(postActions.getList({ thema_id, category_id, keyword }))
	}, [dispatch, category_id, thema_id, keyword])

	return (
		<div>
			{data ? (
				<InfiniteScroll
					dataLength={data.length}
					loader=''
					hasMore={data.length < total}
					next={loadMoreRows}
				>
					{data.map((item, i) => (
						<>{rowRenderer(i)}</>
					))}
				</InfiniteScroll>
			) : null}
			<DropDown anchorEl={anchorEl} onClose={handleClose}>
				<div className='flex flex-col gap-2 min-w-[130px]'>
					<button className='flex gap-3 items-center py-3' onClick={handleEdit}>
						<UserEditIcon />
						수정
					</button>
					<button
						className='flex gap-3 items-center py-3'
						onClick={handleDelete}
					>
						<PostDeleteIcon />
						삭제
					</button>
				</div>
			</DropDown>
		</div>
	)
}
