import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SettingAdminState } from './type'

const initialState: SettingAdminState = {
	loading: false,
	object: {
		id: '',
		status: false,
		mentor_status: false,
		created_at_unix_timestamp: null,
		created_at: null,
		updated_at: null,
	},
}

const settingAdminSlice = createSlice({
	name: 'settingAdmin',
	initialState,
	reducers: {
		getSettingAdmin: (state) => {
			state.loading = true
		},
		saveSettingAdmin: (state, actions: PayloadAction<SettingAdminState>) => {
			state.object = actions.payload.object
			state.loading = false
		},
	},
})

export const settingAdminActions = settingAdminSlice.actions

const settingAdminReducer = settingAdminSlice.reducer
export default settingAdminReducer
