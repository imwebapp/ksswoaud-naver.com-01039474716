import { request } from '../utils/request'
import { APIGetParams, ListResponse } from '.'
import { ROUTE_API } from '@/src/constants'
import { convertParams } from '../utils/common'
import { ThemaI } from './Thema'

export interface CategoryI {
	id: string
	status: boolean
	name: string
	thema_id: string
	thema: ThemaI
}

const CategoryApi = {
	getList: (params: APIGetParams): Promise<ListResponse<CategoryI>> =>
		request.get(
			ROUTE_API.CATEGORY + '?' + new URLSearchParams(convertParams(params)),
		),
	findOne: (id : string, params: APIGetParams) => {
		return request.get(
			ROUTE_API.CATEGORY +
				`/${id}` +
				'?' +
				new URLSearchParams(convertParams(params)),
		)
	},
}

export default CategoryApi
