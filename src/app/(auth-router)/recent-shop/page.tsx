'use client'

import { useEffect } from 'react'

import { recentShopActions } from '@/src/stores/recentShop/recentShopSlice'
import { useAppSelector, useAppDisPatch } from '@/src/stores/hook'
import { ShopItem } from '@/src/components/Board'
import DefaultLayout from '@/src/layout/default'

export default function RecentShopPage() {
	const { data } = useAppSelector((state) => state.recentShop)
	const userData = useAppSelector((state) => state.user.profile)

	const dispatch = useAppDisPatch()

	useEffect(() => {
		if (userData.id) {
			dispatch(recentShopActions.get())
		}
	}, [userData])

	return (
		<DefaultLayout title='최근열람 목록'>
			<div>
				{data?.map((item, i) => {
					const shop = item.shop?.old_shop || item.shop
					if (!shop) return null
					return (
						<ShopItem
							id={shop.id}
							title={shop.title}
							images={shop.images}
							hashtags={shop.tags?.map((tag) => tag.tag?.name)}
							distance={shop.distance}
							opening_hours={shop.opening_hours}
							is_like={shop.is_like}
							key={i}
						/>
					)
				})}
			</div>
		</DefaultLayout>
	)
}
