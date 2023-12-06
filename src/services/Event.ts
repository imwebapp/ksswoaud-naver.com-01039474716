import { request } from '../utils/request'
import { APIGetParams, ListResponse, Response } from '.'
import { ROUTE_API } from '@/src/constants'
import { convertParams } from '../utils/common'

export interface EventI {
	id: string
	title: string
	start_time: string
	end_time: string
	description: string
	shop_id: string
	shop: {
		alias: string
		images: string[]
	}
	distance: number
}

export type EventListParams = {
	latitude?: number
	longitude?: number
	order_option?: string
	distance_order: string
}

export interface EventPayload {
	shop_id: string
	start_time: number
	end_time: number
	description: string
	user_id: string
	images: string[]
}

const EventApi = {
	getList: (
		params: APIGetParams,
		payload?: EventListParams,
	): Promise<ListResponse<EventI>> =>
		request.post(
			ROUTE_API.EVENT_GET_LISTS +
				'?' +
				new URLSearchParams(convertParams(params)),
			payload,
		),
	create: (payload: EventPayload) =>
		request.post(ROUTE_API.EVENT_CREATE, payload),
	get: (id: string, params: APIGetParams): Promise<Response<EventI>> =>
		request.get(
			ROUTE_API.EVENT +
				'/' +
				id +
				'?' +
				new URLSearchParams(convertParams(params)),
		),
	update: (id: string, payload: EventPayload) =>
		request.put(ROUTE_API.EVENT + '/' + id, payload),
}

export default EventApi
