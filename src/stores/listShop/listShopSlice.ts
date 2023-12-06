import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

import { RootState } from '..'
import { ShopI } from '@/src/services/Shop'
import { mergeDataById } from '@/src/utils/common'

interface ListShopStateItem {
	page: number
	total: number
	key: string
	data?: ShopI[]
	jumpUp?: boolean
	orderBy?: boolean
}

export interface ListShopState {
	[key: string]: ListShopStateItem
}

export interface GetShopPayload {
	thema_id: string
	filter: any
	jumpUp?: boolean
	orderBy?: boolean
}

export interface GetListShopSuccessPayload {
	thema_id: string
	data: ShopI[]
	total: number
}

const initialState: ListShopState = {}

const listShopSlice = createSlice({
	name: 'listShop',
	initialState,
	reducers: {
		getList: (state, action: PayloadAction<GetShopPayload>) => {
			const { thema_id, filter, jumpUp, orderBy } = action.payload
			const newKey = JSON.stringify(filter) + JSON.stringify(orderBy)
			if (state[thema_id] && state[thema_id].key !== newKey) {
				state[thema_id] = { ...state[thema_id], page: 1, key: newKey }
			} else {
				if (!state[thema_id])
					state[thema_id] = {
						page: 1,
						total: 0,
						key: newKey,
						jumpUp,
						orderBy,
					}
			}
		},
		getListSuccess: (
			state,
			action: PayloadAction<GetListShopSuccessPayload>,
		) => {
			const { thema_id, data, total } = action.payload
			state[thema_id].total = total
			if (state[thema_id] && state[thema_id].page === 1) {
				state[thema_id].data = data
			} else {
				if (state[thema_id].data) {
					const oldData = state[thema_id].data as any
					state[thema_id].data = mergeDataById(oldData, data) as any
				}
			}
		},
		loadMore: (state, action: PayloadAction<GetShopPayload>) => {
			const { thema_id } = action.payload
			if (state[thema_id]) {
				state[thema_id].page = state[thema_id].page + 1
			}
		},
	},
})

const selectDate = (state: RootState) => state.listShop
export const selectListShopByThema = (thema_id: string) =>
	createSelector([selectDate], (data) => data[thema_id])

export const listShopActions = listShopSlice.actions

const listShopReducer = listShopSlice.reducer
export default listShopReducer
