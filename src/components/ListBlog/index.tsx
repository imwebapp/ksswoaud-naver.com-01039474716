'use client'

import { useEffect } from 'react'
import {
	AutoSizer,
	InfiniteLoader,
	List,
	WindowScroller,
} from 'react-virtualized'

import BlogItem from '../BlogItem'
import { useAppDisPatch, useAppSelector } from '@/src/stores/hook'
import { blogActions, selectListBlogByThema } from '@/src/stores/blog/blogSlice'

export interface ListBlogProps {
	thema_id: string
	category_id?: string
	keyword?: string
}

export default function ListBlog({
	category_id,
	thema_id,
	keyword,
}: ListBlogProps) {
	const listData = useAppSelector(selectListBlogByThema(thema_id))
	const data = listData?.data

	const dispatch = useAppDisPatch()

	const isRowLoaded = ({ index }: { index: number }) => {
		return !!data && !!data[index]
	}

	const loadMoreRows = async () => {
		dispatch(blogActions.loadMore({ category_id, thema_id, keyword }))
	}

	const rowRenderer = ({ index, key, style }: any) => {
		if (data) {
			const item = data[index]
			return (
				<div key={key} style={style} className='h-full'>
					<BlogItem
						id={item.id}
						thumbnails={item.thumbnails}
						title={item.title}
						content={item.content}
					/>
					{index < data.length - 1 ? (
						<div className='w-full h-[7px] border border-[#ECEEED] bg-[#F2F3F5]' />
					) : null}
				</div>
			)
		}
	}

	useEffect(() => {
		dispatch(blogActions.getList({ category_id, thema_id, keyword }))
	}, [category_id, thema_id, keyword])

	return (
		<div>
			{data ? (
				<AutoSizer disableHeight={true}>
					{({ width }) => (
						<WindowScroller>
							{({ height, isScrolling, onChildScroll, scrollTop }) => (
								<InfiniteLoader
									isRowLoaded={isRowLoaded}
									loadMoreRows={loadMoreRows}
									rowCount={data.length}
								>
									{({ onRowsRendered, registerChild }) => (
										<List
											autoHeight
											onRowsRendered={onRowsRendered}
											ref={registerChild}
											height={height}
											isScrolling={isScrolling}
											onScroll={onChildScroll}
											rowCount={data?.length || 0}
											rowHeight={183}
											rowRenderer={rowRenderer}
											scrollTop={scrollTop}
											width={width}
										/>
									)}
								</InfiniteLoader>
							)}
						</WindowScroller>
					)}
				</AutoSizer>
			) : null}
		</div>
	)
}
