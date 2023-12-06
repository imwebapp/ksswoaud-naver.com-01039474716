import { APIGetParams, ListResponse } from '.'
import { ROUTE_API } from '../constants'
import { convertParams } from '../utils/common'
import { request } from '../utils/request'

const HistoryApi = {
	getUserJumpUp: (params: APIGetParams): Promise<any> => {
		return request.get(
			ROUTE_API.SHOP_JUMP_UP_HISTORY +
				'?' +
				new URLSearchParams(convertParams(params)),
		)
	},
}

export default HistoryApi
