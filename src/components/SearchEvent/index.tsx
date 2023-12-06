'use client'

import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useAppDisPatch, useAppSelector } from '@/src/stores/hook'
import { searchEventActions } from '@/src/stores/searchEvent/searchEventSlice'
import EmptyShopIcon from '@/src/components/Icon/EmptyShopIcon'
import { EventItem } from '@/src/components/Board'

export interface SearchEventProps {
	keyword?: string
}

export default function SearchEvent({ keyword }: SearchEventProps) {
	const dispatch = useAppDisPatch()

	const { data, total } = useAppSelector((state) => state.searchEvent)

	const loadMore = () => {
		dispatch(searchEventActions.loadMore())
	}

	useEffect(() => {
		dispatch(searchEventActions.setKeyword(keyword))
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
							{data.map((event, i) => (
								<EventItem
									shopId={event.shop_id}
									shopTitle={event.shop.alias}
									key={i}
									distance={event.distance}
									image={event.shop.images[0]}
									end_time={event.end_time}
									description={event.description}
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
