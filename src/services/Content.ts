import { request } from '../utils/request'
import { APIGetParams, ListResponse } from '.'
import { ROUTE_API } from '@/src/constants'
import { convertParams } from '../utils/common'

interface CompanyInfoI {
	id: string
	status: boolean
	createdAtUnixTimestamp: number
	createdAt: string
	updatedAt: string
	deletedAt?: string
	type: string
	content: string
}
const ContentApi = {
	getList: (params: APIGetParams): Promise<ListResponse<CompanyInfoI>> =>
		request.get(
			ROUTE_API.CONTENT + '?' + new URLSearchParams(convertParams(params)),
		),
}

export default ContentApi
