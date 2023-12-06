import { request } from '../utils/request'
import { APIGetParams, ListResponse } from '.'
import { ROUTE_API } from '@/src/constants'
import { convertParams } from '../utils/common'

export interface LinkI {
	id: string
	status: boolean
	index: number
	route: string
	name: string
	keywords: string
	image: string
	thema_id: string
}

const LinkApi = {
	getList: (params: APIGetParams): Promise<ListResponse<LinkI>> =>
		request.get(
			ROUTE_API.LINK + '?' + new URLSearchParams(convertParams(params)),
		),
}

export default LinkApi
