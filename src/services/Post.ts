import { request } from '../utils/request'
import { APIGetParams, ListResponse, Response } from '.'
import { ROUTE_API } from '@/src/constants'
import { convertParams } from '../utils/common'
import { CategoryI } from './Category'

export interface PostI {
	id: string
	status: boolean
	created_at_unix_timestamp: string
	content: string
	images: Array<string>
	thumbnails: Array<string>
	comment: number
	like: number
	dislike: number
	report: number
	user_id: string
	category_id: string
	title: string
	user: any
	is_like: boolean
	is_dislike: boolean
	category: CategoryI
	soft_comment_count: any
	level: any
	is_report: any
	videos: any
	location: string
	created_at: Date
}

type PostParamsPayload = {
	user_id: string
	order_option: string
}

export type PostPayload = {
	images?: Array<string>
	thumbnails?: Array<string>
	content: string
	category_id: string
	title: string
	location?: string
	videos?: string[]
}

const PostApi = {
	create: (payload: PostPayload) => request.post(ROUTE_API.POST, payload),
	update: (payload: Partial<PostPayload>, id: string) =>
		request.put(ROUTE_API.POST + `/${id}`, payload),
	getList: (
		params: APIGetParams,
		payload?: PostParamsPayload,
	): Promise<ListResponse<PostI>> =>
		request.post(
			ROUTE_API.POST_GET_LIST +
				'?' +
				new URLSearchParams(convertParams(params)),
			payload,
		),

	findOne: (
		id: string,
		params: APIGetParams,
		token?: string,
	): Promise<Response<PostI>> =>
		request.get(
			`${ROUTE_API.POST}/${id}` +
				'?' +
				new URLSearchParams(convertParams(params)),
			token
				? {
						Authorization: 'Bearer ' + token,
				  }
				: undefined,
		),
	delete: (id: string) => request.delete(ROUTE_API.POST + `/${id}`),

	like: (id: string) => request.put(`${ROUTE_API.POST_LIKE}/${id}`, {}),
	unLike: (id: string) => request.put(`${ROUTE_API.POST_UNLIKE}/${id}`, {}),
	dislike: (id: string) => request.put(`${ROUTE_API.POST_DISLIKE}/${id}`, {}),
	unDisLike: (id: string) => request.put(`${ROUTE_API.POST_UNDISLIKE}/${id}`, {}),
	report: (id: string) => request.put(`${ROUTE_API.POST_REPORT}/${id}`, {}),
	unreport: (id: string) => request.put(`${ROUTE_API.POST_UNREPORT}/${id}`, {}),
}

export default PostApi
