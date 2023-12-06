'use client'

import { useEffect } from 'react'
import {
	AutoSizer,
	InfiniteLoader,
	List,
	WindowScroller,
} from 'react-virtualized'

import { useAppDisPatch, useAppSelector } from '@/src/stores/hook'
import { EventItem } from '../Board'
import { eventActions } from '@/src/stores/event/eventSlice'

export interface ListEventProps {
	keyword?: string
}

export default function ListEvent({ keyword }: ListEventProps) {
	const { data, pagination } = useAppSelector((state) => state.event)

	const dispatch = useAppDisPatch()

	const isRowLoaded = ({ index }: { index: number }) => {
		return !!data && !!data[index]
	}

	const loadMoreRows = async () => {
		dispatch(eventActions.loadMore())
	}

	const rowRenderer = ({ index, key, style }: any) => {
		if (data) {
			const item = data[index]
			return (
				<div key={key} style={style} className='h-full'>
					<EventItem
						shopId={item.shop_id}
						shopTitle={item.shop.alias}
						key={index}
						distance={item.distance}
						image={item.shop.images[0]}
						end_time={item.end_time}
						description={item.description}
					/>
				</div>
			)
		}
	}

	useEffect(() => {
		dispatch(eventActions.getList())
	}, [dispatch])

	useEffect(() => {
		dispatch(eventActions.setKeyword(keyword))
	}, [keyword])

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
									rowCount={pagination.total}
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
											rowHeight={250}
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
