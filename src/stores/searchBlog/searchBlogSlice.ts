import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BlogI } from '@/src/services/Blog'
import { mergeDataById } from '@/src/utils/common'

interface SearchState {
	page: number
	total: number
	keyword?: string
	data?: BlogI[]
}

const initialState: SearchState = {
	page: 1,
	total: 0,
}

const searchBlogSlice = createSlice({
	name: 'searchBlog',
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
			action: PayloadAction<{ data: BlogI[]; total: number }>,
		) => {
			const { data, total } = action.payload
			if (state.page === 1) {
				state.data = data
			} else {
				if (state.data) state.data = mergeDataById(state.data, data) as BlogI[]
			}
			state.total = total
		},
		loadMore: (state) => {
			state.page = state.page + 1
		},
	},
})

export const searchBlogActions = searchBlogSlice.actions

const searchBlogReducer = searchBlogSlice.reducer
export default searchBlogReducer
