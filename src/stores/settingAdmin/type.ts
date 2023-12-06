export interface SettingAdminI {
	id: string
	status: boolean
	mentor_status: boolean
	created_at_unix_timestamp: Date | null
	created_at: Date | null
	updated_at: Date | null
}

export interface SettingAdminState {
	object?: SettingAdminI
	loading?: boolean
}

export interface SettingAdminPayload {
	id: string
}

export const SETTING_ADMIN = 'settingAdmin'

export const GET_SETTING_ADMIN = `${SETTING_ADMIN}/getSettingAdmin`
