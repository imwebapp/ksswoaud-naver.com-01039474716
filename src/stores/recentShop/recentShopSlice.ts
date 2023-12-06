import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ShopI } from '@/src/services/Shop'

export interface RecentShopI {
	id: string
	shop: ShopI
	user_id: string
	shop_id: string
}

interface RecentShopState {
	data?: RecentShopI[]
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

const recentShopSlice = createSlice({
	name: 'recentShop',
	initialState,
	reducers: {
		get: () => {},
		getSuccess: (
			state,
			action: PayloadAction<{ data: RecentShopI[]; total: number }>,
		) => {
			const { data, total } = action.payload
			state.data = data
			state.pagination.total = total
		},
	},
})

export const recentShopActions = recentShopSlice.actions

const recentShopReducer = recentShopSlice.reducer
export default recentShopReducer
