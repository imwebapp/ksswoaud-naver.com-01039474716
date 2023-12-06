import { request } from '../utils/request'
import { APIGetParams, ListResponse, Response } from '.'
import { ROUTE_API } from '@/src/constants'
import { convertParams } from '../utils/common'

export interface BlogI {
	id: string
	title: string
	images: string[]
	thumbnails: string[]
	tags?: string[]
	content: string
}

const BlogApi = {
	getList: (params: APIGetParams): Promise<ListResponse<BlogI>> =>
		request.get(
			ROUTE_API.BLOG + '?' + new URLSearchParams(convertParams(params)),
		),
	get: (id: string, params: APIGetParams): Promise<Response<BlogI>> =>
		request.get(
			ROUTE_API.BLOG +
				'/' +
				id +
				'?' +
				new URLSearchParams(convertParams(params)),
		),
}

export default BlogApi
