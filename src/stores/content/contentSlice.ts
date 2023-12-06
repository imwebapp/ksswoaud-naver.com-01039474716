import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	loading: false,
	data: [],
}
const contentSlice = createSlice({
	name: 'content',
	initialState,
	reducers: {
		loadingPage: (state, action) => {
			state.loading = action.payload
		},
		fetchListStarted: (state, action) => {
			// state.loading = true
		},
		fetchListSuccess: (state, action) => {
			state.data = action?.payload?.results?.objects?.rows
		},
		fetchListFailded: (state, action) => {},
	},
})

export const contentActions = contentSlice.actions

const contenReducer = contentSlice.reducer
export default contenReducer
