import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ShopI } from '@/src/services/Shop'

export interface FavoriteShopI {
	id: string
	shop: ShopI
	user_id: string
	shop_id: string
}

interface RecentShopState {
	data?: FavoriteShopI[]
	pagination: {
		page: number
		total: number
		limit: number
	}
}

const initialState: RecentShopState = {
	pagination: {
		page: 1,
		total: 0,
		limit: 50,
	},
}

const favoriteShopSlice = createSlice({
	name: 'favoriteShop',
	initialState,
	reducers: {
		get: () => {},
		getSuccess: (
			state,
			action: PayloadAction<{ data: FavoriteShopI[]; total: number }>,
		) => {
			const { data, total } = action.payload
			state.data = data
			state.pagination.total = total
		},
	},
})

export const favoriteShopActions = favoriteShopSlice.actions

const favoriteShopReducer = favoriteShopSlice.reducer
export default favoriteShopReducer
