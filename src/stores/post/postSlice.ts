import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'

import { PostI } from '@/src/services/Post'
import { RootState } from '..'
import { mergeDataById } from '@/src/utils/common'

interface PostListState {
	page: number
	total: number
	key: string
	data?: PostI[]
}

interface PostState {
	[key: string]: PostListState
}

export interface GetPostPayload {
	thema_id: string
	category_id?: string
	keyword?: string
}

export interface GetListPostSuccessPayload {
	thema_id: string
	data: PostI[]
	total: number
}

const initialState: PostState = {}

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		getList: (state, action: PayloadAction<GetPostPayload>) => {
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
			action: PayloadAction<GetListPostSuccessPayload>,
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
		loadMore: (state, action: PayloadAction<GetPostPayload>) => {
			const { thema_id } = action.payload
			if (state[thema_id]) {
				state[thema_id].page = state[thema_id].page + 1
			}
		},
		delete: (
			state,
			action: PayloadAction<{ id: string; thema_id: string }>,
		) => {},
		deleteSuccess: (
			state,
			action: PayloadAction<{ id: string; thema_id: string }>,
		) => {
			const { id, thema_id } = action.payload

			if (state[thema_id]) {
				if (state[thema_id].data) {
					state[thema_id].data = state[thema_id].data?.filter(
						(item) => item.id !== id,
					)
				}
			}
		},
	},
})

const selectData = (state: RootState) => state.post
export const selectListPostByThema = (thema_id: string) =>
	createSelector([selectData], (data) => data[thema_id])

export const postActions = postSlice.actions

const postReducer = postSlice.reducer
export default postReducer
