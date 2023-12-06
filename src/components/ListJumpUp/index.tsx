'use client'

import { useEffect } from 'react'
import {
	AutoSizer,
	InfiniteLoader,
	List,
	WindowScroller,
} from 'react-virtualized'

import { useAppDisPatch, useAppSelector } from '@/src/stores/hook'
import {
	listShopActions,
	selectListShopByThema,
} from '@/src/stores/listShop/listShopSlice'
import { JumpUpItem } from '../Board'
import { classNames, transformArrayJumpUp } from '@/src/utils/common'

interface LisJumpUpFilter {
	thema_id: string
	filter: any
}

export default function ListJumpUp(props: LisJumpUpFilter) {
	const shopList = useAppSelector(selectListShopByThema(props.thema_id))

	const data =
		shopList && shopList.data ? transformArrayJumpUp(shopList.data) : undefined

	const totalRows = shopList?.total
		? Math.ceil((shopList.total - 3) / 3 + 2)
		: undefined

	const dispatch = useAppDisPatch()

	const isRowLoaded = ({ index }: { index: number }) => {
		return !!data && !!data[index]
	}

	const loadMoreRows = async () => {
		dispatch(
			listShopActions.loadMore({
				thema_id: props.thema_id,
				filter: props.filter,
			}),
		)
	}

	const rowRenderer = ({ index, key, style }: any) => {
		if (data && data[index]) {
			return (
				<div key={key} style={style} className='h-full'>
					<div
						className={classNames(
							'flex gap-2 overflow-hidden h-full',
							index == 0
								? '[&>*]:w-full max-h-[360px]'
								: index === 1
								? '[&>*]:w-[50%] max-h-[145px]'
								: '[&>*]:w-[33%] max-h-[145px]',
						)}
					>
						{data[index].map((item) => {
							const shop = item.old_shop || item
							return (
								<JumpUpItem
									key={item.id}
									id={shop.id}
									title={shop.title}
									image={shop.images[0]}
									first={index === 0}
								/>
							)
						})}
					</div>
				</div>
			)
		}
	}

	useEffect(() => {
		dispatch(
			listShopActions.getList({
				thema_id: props.thema_id,
				filter: props.filter,
				jumpUp: true,
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
									rowCount={totalRows}
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
											rowHeight={({ index }) => (index === 0 ? 368 : 153)}
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
