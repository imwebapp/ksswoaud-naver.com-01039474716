import { APIGetParams, ListResponse } from '.'
import { ROUTE_API } from '../constants'
import { convertParams } from '../utils/common'
import { request } from '../utils/request'
import { TagI } from './Tag'

export interface ThemaI {
	id: string
	status: boolean
	name: string
}

const ThemeApi = {
	getList: (params: APIGetParams): Promise<ListResponse<ThemaI>> =>
		request.get(
			ROUTE_API.THEMA + '?' + new URLSearchParams(convertParams(params)),
		),
	findOne: (id: string, params: APIGetParams) => {
		return request.get(
			ROUTE_API.THEMA +
				`/${id}` +
				'?' +
				new URLSearchParams(convertParams(params)),
		)
	},
}

export default ThemeApi
