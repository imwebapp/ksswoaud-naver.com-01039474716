'use client'

import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useAppDisPatch, useAppSelector } from '@/src/stores/hook'
import { searchActions } from '@/src/stores/search/searchSlice'
import { ShopItem } from '@/src/components/Board'
import EmptyShopIcon from '@/src/components/Icon/EmptyShopIcon'

export interface SearchShopProps {
	keyword?: string
}

export default function SearchShop({ keyword }: SearchShopProps) {
	const dispatch = useAppDisPatch()

	const { data, total } = useAppSelector((state) => state.search)

	const loadMore = () => {
		dispatch(searchActions.loadMore())
	}

	useEffect(() => {
		dispatch(searchActions.setKeyword(keyword))
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
							{data.map((shop, i) => (
								<ShopItem
									id={shop.id}
									title={shop.title}
									images={shop.images}
									hashtags={shop.tags?.map((tag) => tag.tag?.name)}
									distance={shop.distance}
									opening_hours={shop.opening_hours}
									is_like={shop.is_like}
									key={i}
									keyword={keyword}
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
