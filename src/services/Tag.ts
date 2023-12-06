import { request } from '../utils/request'
import { APIGetParams, ListResponse } from '.'
import { ROUTE_API } from '@/src/constants'
import { convertParams } from '../utils/common'

export interface TagI {
	id: string
	name: string
}

const TagApi = {
	getList: (params: APIGetParams): Promise<ListResponse<TagI>> =>
		request.get(
			ROUTE_API.TAG + '?' + new URLSearchParams(convertParams(params)),
		),
	findOne: (id: string, params: APIGetParams) => {
		return request.get(
			ROUTE_API.TAG +
				`/${id}` +
				'?' +
				new URLSearchParams(convertParams(params)),
		)
	},
}

export default TagApi
