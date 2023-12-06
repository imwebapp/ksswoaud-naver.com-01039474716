import { RequestMethod, request } from '../utils/request'
import { APIGetParams, ListResponse, Response } from '.'
import { ROUTE_API } from '@/src/constants'
import { convertParams } from '../utils/common'
import { CategoryI } from './Category'
import { TagI } from './Tag'
import { EventI } from './Event'
import { MentorI } from './Mentor'
import { CourseI } from './Course'
import { FavoriteShopI } from '../stores/favoriteShop/favoriteShopSlice'
import { RecentShopI } from '../stores/recentShop/recentShopSlice'
export interface ShopI {
	id: string
	title: string
	category_id: string
	user_id: string
	distance: number
	images: string[]
	thumbnails: string[]
	old_shop: ShopI
	address: string
	address_2?: string
	opening_hours: string
	description: string
	contact_phone: string
	course_status: boolean
	mentor_status: boolean
	like: number
	is_like?: boolean
	category: CategoryI
	tags: [
		{
			tag: TagI
		},
	]
	events?: EventI[]
	mentors?: MentorI[]
	courses: CourseI[]
	state: string
}

export type ShopListParams = {
	latitude?: number
	longitude?: number
	order_option?: string
	distance_order?: string
}

const ShopApi = {
	getList: (
		params: APIGetParams,
		payload?: ShopListParams,
	): Promise<ListResponse<ShopI>> =>
		request.post(
			ROUTE_API.SHOP_GET_LISTS +
				'?' +
				new URLSearchParams(convertParams(params)),
			payload,
		),
	getMasterList: (
		params: APIGetParams,
		payload: ShopListParams,
	): Promise<ListResponse<ShopI>> =>
		request.post(
			ROUTE_API.SHOP_GET_MASTER_SHOP +
				'?' +
				new URLSearchParams(convertParams(params)),
			payload,
		),
	getNearShopList: (
		params: APIGetParams,
		payload: ShopListParams,
	): Promise<ListResponse<ShopI>> =>
		request.post(
			ROUTE_API.SHOP_GET_NEAR_SHOP +
				'?' +
				new URLSearchParams(convertParams(params)),
			payload,
		),
	getDetail: (id: string, token?: string): Promise<Response<{ shop: ShopI }>> =>
		request.post(
			`${ROUTE_API.SHOP}/view_shop/${id}`,
			{},
			token
				? {
						Authorization: 'Bearer ' + token,
				  }
				: undefined,
		),

	like: (id: string) => request.put(`${ROUTE_API.SHOP_LIKE}/${id}`, {}),

	unLike: (id: string) => request.put(`${ROUTE_API.SHOP_UNLIKE}/${id}`, {}),

	setUpJumUp: (id: string, payload: any): Promise<any> => {
		return request.put(`${ROUTE_API.JUMP_UP_SHOP}/${id}`, payload)
	},
	createShop: (payload: any) => {
		return request.post(`${ROUTE_API.SHOP_CREATE}`, payload)
	},
	getShopById: (id: string) => {
		return request.get(`${ROUTE_API.SHOP}/${id}?fields=["$all"]`, {})
	},
	updateShop: (id: string, payload: any) =>
		request.put(ROUTE_API.SHOP + '/' + id, payload),

	getRecentShop: (params: APIGetParams): Promise<ListResponse<RecentShopI>> =>
		request.get(
			ROUTE_API.RECENT_READING +
				'?' +
				new URLSearchParams(convertParams(params)),
		),

	getFavoriteShop: (
		params: APIGetParams,
		payload: ShopListParams,
	): Promise<ListResponse<ShopI>> =>
		request.post(
			ROUTE_API.FAVORITE_GET_LISTS +
				'?' +
				new URLSearchParams(convertParams(params)),
			payload,
		),
}

export default ShopApi
