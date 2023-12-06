'use client'

import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { searchBlogActions } from '@/src/stores/searchBlog/searchBlogSlice'
import { useAppDisPatch, useAppSelector } from '@/src/stores/hook'
import BlogItem from '../BlogItem'
import EmptyShopIcon from '@/src/components/Icon/EmptyShopIcon'

export interface SearchBlogProps {
	keyword?: string
}

export default function SearchBlog({ keyword }: SearchBlogProps) {
	const dispatch = useAppDisPatch()

	const { data, total } = useAppSelector((state) => state.searchBlog)

	const loadMore = () => {
		dispatch(searchBlogActions.loadMore())
	}

	useEffect(() => {
		dispatch(searchBlogActions.setKeyword(keyword))
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
							{data.map((blog, i) => (
								<BlogItem
									key={i}
									id={blog.id}
									thumbnails={blog.thumbnails}
									title={blog.title}
									content={blog.content}
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
