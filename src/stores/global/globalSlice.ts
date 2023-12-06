import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	loading: false,
}

const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		initApp: (state, action) => {},
		loadingPage: (state, action) => {
			state.loading = true
		},
		loadingPageSucess: (state, action) => {
			state.loading = false
		},
	},
})

export const globalActions = globalSlice.actions

const globalReducer = globalSlice.reducer
export default globalReducer
