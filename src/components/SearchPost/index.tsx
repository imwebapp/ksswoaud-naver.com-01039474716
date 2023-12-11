'use client'

import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useAppDisPatch, useAppSelector } from '@/src/stores/hook'
import { searchPostActions } from '@/src/stores/searchPost/searchPostSlice'
import { PostItem } from '@/src/components/Board'
import EmptyShopIcon from '@/src/components/Icon/EmptyShopIcon'

export interface SearchPostProps {
	keyword?: string
}

export default function SearchPost({ keyword }: SearchPostProps) {
	const dispatch = useAppDisPatch()

	const { data, total } = useAppSelector((state) => state.searchPost)

	const loadMore = () => {
		dispatch(searchPostActions.loadMore())
	}

	useEffect(() => {
		dispatch(searchPostActions.setKeyword(keyword))
	}, [keyword])

	return (
		<div>
			<p className='px-4'>검색 결과 {total}</p>
			{data ? (
				<>
					{data.length > 0 ? (
						<InfiniteScroll
							dataLength={data.length}
							loader=''
							hasMore={data.length < total}
							next={loadMore}
						>
							{data.map((post, i) => (
								<PostItem
									key={i}
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
								/>
							))}
						</InfiniteScroll>
					) : (
						<div className='flex flex-col gap-2 justify-center items-center pt-32'>
							<EmptyShopIcon />
							<p>결과가 없습니다</p>
						</div>
					)}
				</>
			) : null}
		</div>
	)
}
