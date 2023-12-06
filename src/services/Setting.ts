import { APIGetParams, ListResponse } from '.'
import { ROUTE_API } from '../constants'
import { convertParams } from '../utils/common'
import { request } from '../utils/request'

const extractData = (response: any) =>
	response && response.results ? response.results : {}

export interface SettingI {
	id: string
	status: boolean
	created_at_unix_timestamp: number
	value_array: any[]
	value_array_obj: any[]
	created_at: string
	updated_at: string
	deleted_at: string | null
	field: string
	value: string
}

const SettingApi = {
	SettingAdmin: async () => {
		return request.get('/setting_admin').then(extractData)
	},
	fetchSetting: (params: APIGetParams): Promise<ListResponse<SettingI>> =>
		request.get(
			ROUTE_API.SETTING + '?' + new URLSearchParams(convertParams(params)),
		),
}

export default SettingApi
