import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PostI } from '@/src/services/Post'
import { mergeDataById } from '@/src/utils/common'

interface SearchState {
	page: number
	total: number
	keyword?: string
	data?: PostI[]
}

const initialState: SearchState = {
	page: 1,
	total: 0,
}

const searchPostSlice = createSlice({
	name: 'searchPost',
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
			action: PayloadAction<{ data: PostI[]; total: number }>,
		) => {
			const { data, total } = action.payload
			if (state.page === 1) {
				state.data = data
			} else {
				if (state.data) state.data = mergeDataById(state.data, data) as PostI[]
			}
			state.total = total
		},
		loadMore: (state) => {
			state.page = state.page + 1
		},
	},
})

export const searchPostActions = searchPostSlice.actions

const searchPostReducer = searchPostSlice.reducer
export default searchPostReducer
