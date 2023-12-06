'use client'

import { useEffect } from 'react'

import DefaultLayout from '@/src/layout/default'
import { useAppDisPatch, useAppSelector } from '@/src/stores/hook'
import { ShopItem } from '@/src/components/Board'
import { favoriteShopActions } from '@/src/stores/favoriteShop/favoriteShopSlice'

export default function FavoriteShop() {
	const { data } = useAppSelector((state) => state.favoriteShop)
	const userData = useAppSelector((state) => state.user.profile)

	const dispatch = useAppDisPatch()

	useEffect(() => {
		if (userData.id) {
			dispatch(favoriteShopActions.get())
		}
	}, [userData])

	return (
		<DefaultLayout title='찜목록'>
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
