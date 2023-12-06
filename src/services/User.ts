import { APIGetParams, ListResponse } from '.'
import { ROUTE_API } from '../constants'
import { convertParams } from '../utils/common'
import { request } from '../utils/request'
import { ShopListParams } from './Shop'

const extractData = (response: any) =>
	response && response.results?.object ? response.results?.object : {}

const UserApi = {
	GET_USER_BY_ID: async (param: any, option?: any) => {
		return await request
			.get(`/user/${param}?fields=["$all"]`, option)
			.then(extractData)
	},
	UPDATE_USER: (body: any,config? : any) => {
		return request.put(`/user/${body.id}`, { ...body },{...config})
	},
	GET_LIST_USER: (params: APIGetParams): Promise<ListResponse<any>> =>
		request.get(
			ROUTE_API.USER + '?' + new URLSearchParams(convertParams(params)),
		),
}

export default UserApi
