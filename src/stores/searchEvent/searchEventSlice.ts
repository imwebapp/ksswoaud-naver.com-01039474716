import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EventI } from '@/src/services/Event'
import { mergeDataById } from '@/src/utils/common'

interface SearchEventState {
	page: number
	total: number
	keyword?: string
	data?: EventI[]
}

const initialState: SearchEventState = {
	page: 1,
	total: 0,
}

const searchEventSlice = createSlice({
	name: 'searchEvent',
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
			action: PayloadAction<{ data: EventI[]; total: number }>,
		) => {
			const { data, total } = action.payload
			if (state.page === 1) {
				state.data = data
			} else {
				if (state.data) state.data = mergeDataById(state.data, data) as EventI[]
			}
			state.total = total
		},
		loadMore: (state) => {
			state.page = state.page + 1
		},
	},
})

export const searchEventActions = searchEventSlice.actions

const searchEventReducer = searchEventSlice.reducer
export default searchEventReducer
