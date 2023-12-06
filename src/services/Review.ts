import { request } from '../utils/request'
import { APIGetParams, ListResponse } from '.'
import { ROUTE_API } from '@/src/constants'
import { convertParams } from '../utils/common'

export interface ReviewI {
	id: string
	content: string
	user_id: string
	user?: {
		nickname: string
		avatar: string
	}
	count_reply: number
	created_at: string
	private?: boolean
	replies?: ReviewI[]
}

export interface ReviewPayload {
	content: string
	shop_id?: string
	parent_id?: string
	post_id?: string
	private?: boolean
}

const ReviewApi = {
	getList: (params: APIGetParams): Promise<ListResponse<ReviewI>> =>
		request.get(
			ROUTE_API.REVIEW_GET_LIST_FOR_SHOP +
				'?' +
				new URLSearchParams(convertParams(params)),
		),
	getListReplies: (params: APIGetParams): Promise<ListResponse<ReviewI>> =>
		request.get(
			ROUTE_API.REVIEW + '?' + new URLSearchParams(convertParams(params)),
		),
	create: (payload: ReviewPayload) => request.post(ROUTE_API.REVIEW, payload),
	delete: (id: string) => request.delete(ROUTE_API.REVIEW + `/${id}`),
	report: (id: string) =>
		request.put(ROUTE_API.POST_REPORT_COMMENT + `/${id}`, {}),
}

export default ReviewApi
