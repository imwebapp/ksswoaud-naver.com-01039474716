import { request } from '../utils/request'
import { APIGetParams, ListResponse } from '.'
import { ROUTE_API } from '@/src/constants'
import { convertParams } from '../utils/common'

export interface BannerI {
	id: string
	status: boolean
	thumbnail: string
	title: string
	phone: string
	url: string
}

const BannerApi = {
	getList: (params: APIGetParams): Promise<ListResponse<BannerI>> =>
		request.get(
			ROUTE_API.BANNER + '?' + new URLSearchParams(convertParams(params)),
		),
}

export default BannerApi
