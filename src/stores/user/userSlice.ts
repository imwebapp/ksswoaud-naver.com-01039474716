import cookies from '@/src/utils/cookies'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	loading: false,
	profile: {
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

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getUserProfile: (state) => {
			state.loading = true
		},
		saveUserProfile: (state, action) => {
			state.profile = action.payload
			localStorage.setItem('userData', JSON.stringify(action.payload))
			cookies.setValueIntoKey('userData', JSON.stringify(action.payload))
			cookies.setValueIntoKey('lat', action.payload.latitude)
			cookies.setValueIntoKey('lng', action.payload.longitude)
			state.loading = false
		},
		updatePendingPost: (state, action: PayloadAction<number>) => {
			state.profile.current_pending_post += action.payload
		},
	},
})

export const userActions = userSlice.actions

const userReducer = userSlice.reducer
export default userReducer
