'use client'

import { useEffect } from 'react'
import {
	AutoSizer,
	InfiniteLoader,
	List,
	WindowScroller,
} from 'react-virtualized'
import { useParams, useSearchParams } from 'next/navigation'

import { useAppDisPatch, useAppSelector } from '@/src/stores/hook'
import {
	listShopActions,
	selectListShopByThema,
} from '@/src/stores/listShop/listShopSlice'
import { ShopItem } from '../Board'

interface ListShopFilter {
	thema_id: string
	filter: any
	orderBy?: boolean
}

export default function ListShop(props: ListShopFilter) {
	const shopList = useAppSelector(selectListShopByThema(props.thema_id))

	const dispatch = useAppDisPatch()
	const searchParams = useSearchParams()

	const keyword = searchParams.get('keyword')

	const isRowLoaded = ({ index }: { index: number }) => {
		return !!shopList.data && !!shopList.data[index]
	}

	const loadMoreRows = async () => {
		dispatch(
			listShopActions.loadMore({
				thema_id: props.thema_id,
				filter: props.filter,
				orderBy: props.orderBy,
			}),
		)
	}

	const rowRenderer = ({ index, key, style }: any) => {
		if (shopList.data) {
			const shop = shopList.data[index].old_shop || shopList.data[index]

			return (
				<div key={key} style={style}>
					<ShopItem
						id={shop.id}
						title={shop.title}
						images={shop.images}
						hashtags={shop.tags.map((tag) => tag.tag?.name)}
						distance={shop.distance}
						opening_hours={shop.opening_hours}
						is_like={shop.is_like}
						keyword={keyword ?? undefined}
					/>
				</div>
			)
		}
	}

	useEffect(() => {
		dispatch(
			listShopActions.getList({
				thema_id: props.thema_id,
				filter: props.filter,
				orderBy: props.orderBy,
			}),
		)
	}, [props, dispatch])

	return (
		<div>
			{shopList?.data ? (
				<AutoSizer disableHeight={true}>
					{({ width }) => (
						<WindowScroller>
							{({ height, isScrolling, onChildScroll, scrollTop }) => (
								<InfiniteLoader
									isRowLoaded={isRowLoaded}
									loadMoreRows={loadMoreRows}
									rowCount={shopList.total}
								>
									{({ onRowsRendered, registerChild }) => (
										<List
											autoHeight
											onRowsRendered={onRowsRendered}
											ref={registerChild}
											height={height}
											isScrolling={isScrolling}
											onScroll={onChildScroll}
											rowCount={shopList.data?.length || 0}
											rowHeight={348}
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
