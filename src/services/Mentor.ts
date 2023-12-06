import { ROUTE_API } from '../constants'
import { request } from '../utils/request'

export interface MentorI {
	id: string
	name: string
	images: string[]
	thumbnail: string[]
	description: string
}

const MentorApi = {
	createMentor: (shopId: any, payload: any) => {
		return request.post(`${ROUTE_API.MENTOR}/set_mentor/${shopId}`, payload)
	},
}

export default MentorApi
