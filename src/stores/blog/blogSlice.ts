import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

import { BlogI } from '@/src/services/Blog'
import { mergeDataById } from '@/src/utils/common'
import { RootState } from '..'

export interface BlogListState {
	page: number
	total: number
	key: string
	data?: BlogI[]
}

interface BlogState {
	[key: string]: BlogListState
}

export interface GetBlogPayload {
	thema_id: string
	category_id?: string
	keyword?: string
}

export interface GetListBlogSuccessPayload {
	thema_id: string
	data: BlogI[]
	total: number
}

const initialState: BlogState = {}

const blogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {
		getList: (state, action: PayloadAction<GetBlogPayload>) => {
			const { thema_id, category_id, keyword } = action.payload
			const newKey = JSON.stringify({ category_id, keyword })
			if (state[thema_id] && state[thema_id].key !== newKey) {
				state[thema_id] = { ...state[thema_id], page: 1, key: newKey }
			} else {
				if (!state[thema_id])
					state[thema_id] = {
						page: 1,
						total: 0,
						key: newKey,
					}
			}
		},
		getListSuccess: (
			state,
			action: PayloadAction<GetListBlogSuccessPayload>,
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
		loadMore: (state, action: PayloadAction<GetBlogPayload>) => {
			const { thema_id } = action.payload
			if (state[thema_id]) {
				state[thema_id].page = state[thema_id].page + 1
			}
		},
	},
})

const selectData = (state: RootState) => state.blog
export const selectListBlogByThema = (thema_id: string) =>
	createSelector([selectData], (data) => data[thema_id])

export const blogActions = blogSlice.actions

const blogReducer = blogSlice.reducer
export default blogReducer
