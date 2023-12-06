import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { EventI } from '@/src/services/Event'
import { mergeDataById } from '@/src/utils/common'

export interface EventState {
	data?: EventI[]
	keyword?: string
	pagination: {
		total: number
		page: number
		limit: number
	}
}

const initialState: EventState = {
	pagination: {
		page: 1,
		total: 0,
		limit: 20,
	},
}

const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		getList: () => {},
		getListSuccess: (
			state,
			action: PayloadAction<{ data: EventI[]; total: number }>,
		) => {
			const { data, total } = action.payload
			if (state.pagination.page === 1) {
				state.data = data
			} else {
				if (state.data) state.data = mergeDataById(state.data, data) as any
			}
			state.pagination.total = total
		},
		setKeyword: (state, action: PayloadAction<string | undefined>) => {
			state.keyword = action.payload
			state.pagination.page = 1
		},
		loadMore: (state) => {
			state.pagination.page = state.pagination.page + 1
		},
	},
})

export const eventActions = eventSlice.actions

const eventReducer = eventSlice.reducer
export default eventReducer
