export interface UserI {
	id: string
	username: string
	email: string
	nickname: string
	company_name: string | null
	phone: string
	avatar: string | null
	cover_avatar: string | null
	login_type: string
	account_type: string
	latitude: number
	longitude: number
	verified: boolean
	show_shop_tag: boolean
	post_limit: number
	current_active_post: number
	current_pending_post: number
	current_expired_post: number
	current_rejected_post: number
	current_recommendation_post: number
	event_type: string
	post_start_date: string | null
	post_expired_date: string | null
	paid_user_expiration_date: string | null
	post_period: number
	memo: string | null
	exp: number
	level: number
	ranking: number
	group: string | null
	groups: string[]
	depositor: string | null
	contact: string | null
	deposit_date: string | null
	deposit_amount: string | null
	exposure_bulletin_board: string | null
	start_date: string | null
	end_date: string | null
	uniqueness: string | null
	attachments: string | null
	daily_ranking_delta: number
	noti_sound: boolean
	language: string
	status: boolean
	image_id_card: string | null
	approve: boolean
	jump_limit: number
	created_at_unix_timestamp: string
	notice_messenger_status: boolean
	point: number
	sign_in_time_unix_timestamp: string
	created_at: string
	updated_at: string
	role: string
}

export interface TokenUserI {
	token: string
}

export interface UserState {
	data?: UserI
	token?: TokenUserI
	isLogin: boolean
	loading?: boolean
	error?: boolean
}


