import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	loading: false,
	data: [],
}
const settingSlice = createSlice({
	name: 'setting',
	initialState,
	reducers: {
		loadingPage: (state, action) => {
			state.loading = action.payload
		},
		fetchSettingStarted: (state, action) => {
			// state.loading = true
		},
		fetchSettingSuccess: (state, action) => {
			state.data = action?.payload?.results?.objects?.rows
		},
		fetchSettingFailded: (state, action) => {},
	},
})

export const settingActions = settingSlice.actions

const settingReducer = settingSlice.reducer
export default settingReducer
