import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from './type'
import cookies from '@/src/utils/cookies'
import { deleteAllCookies } from '@/src/utils/common'
import { userActions } from '../user/userSlice'

export interface LoginPayload {
	username: string
	password: string
}

const initialState: UserState = {
	isLogin: false,
	error: false,
	data: {
		id: '',
		username: '',
		email: '',
		nickname: '',
		company_name: null,
		phone: '',
		avatar: null,
		cover_avatar: null,
		login_type: '',
		account_type: '',
		latitude: 0,
		longitude: 0,
		verified: false,
		show_shop_tag: false,
		post_limit: 0,
		current_active_post: 0,
		current_pending_post: 0,
		current_expired_post: 0,
		current_rejected_post: 0,
		current_recommendation_post: 0,
		event_type: '',
		post_start_date: null,
		post_expired_date: null,
		paid_user_expiration_date: null,
		post_period: 0,
		memo: null,
		exp: 0,
		level: 0,
		ranking: 0,
		group: null,
		groups: [],
		depositor: null,
		contact: null,
		deposit_date: null,
		deposit_amount: null,
		exposure_bulletin_board: null,
		start_date: null,
		end_date: null,
		uniqueness: null,
		attachments: null,
		daily_ranking_delta: 0,
		noti_sound: false,
		language: '',
		status: false,
		image_id_card: null,
		approve: false,
		jump_limit: 0,
		created_at_unix_timestamp: '',
		notice_messenger_status: false,
		point: 0,
		sign_in_time_unix_timestamp: '',
		created_at: '',
		updated_at: '',
		role: '',
	},
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<any>) => {
			state.loading = true
		},
		loginSuccess: (state, action: PayloadAction<any>) => {
			state.data = action.payload.data
			state.token = action.payload.token
			cookies.setAccessToken(action.payload.token)
			localStorage.setItem('token', action.payload.token)
			localStorage.setItem('userData', JSON.stringify(action.payload.data))
			state.isLogin = true
			state.loading = false
			state.error = false
		},
		loginStatus: (state, action: PayloadAction<any>) => {
			state.error = action.payload
			state.loading = false
		},
		logout: (state) => {
			state.isLogin = false
			state.data = undefined
			deleteAllCookies()
			localStorage.clear()
			state.error = false
		},
	},
})

export const authActions = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer
