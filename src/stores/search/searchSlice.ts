import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ShopI } from '@/src/services/Shop'
import { mergeDataById } from '@/src/utils/common'

interface SearchState {
	page: number
	total: number
	keyword?: string
	data?: ShopI[]
}

const initialState: SearchState = {
	page: 1,
	total: 0,
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setKeyword: (state, action: PayloadAction<string | undefined>) => {
			const keyword = action.payload
			if (keyword !== state.keyword) {
				state.page = 1
				state.keyword = keyword
			}
		},
		getListSuccess: (
			state,
			action: PayloadAction<{ data: ShopI[]; total: number }>,
		) => {
			const { data, total } = action.payload
			if (state.page === 1) {
				state.data = data
			} else {
				if (state.data) state.data = mergeDataById(state.data, data) as ShopI[]
			}
			state.total = total
		},
		loadMore: (state) => {
			state.page = state.page + 1
		},
	},
})

export const searchActions = searchSlice.actions

const searchReducer = searchSlice.reducer
export default searchReducer
