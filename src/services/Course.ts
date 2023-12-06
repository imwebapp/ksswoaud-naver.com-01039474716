import { ROUTE_API } from "../constants"
import { request } from "../utils/request"

export interface CourseI {
	id: string
	images: string[]
	thumbnails: string[]
	title: string
	running_time: string
	description: string
	recommended: boolean
	unit: string
	prices: Price[]
}

export interface Price {
	id: string
	name: 'ALL' | 'NIGHT' | 'DAY'
	price: number
	discount: number
}

const CourseApi = {
	createCourse: (shopId : any, payload :  any) => {
		return request.post(`${ROUTE_API.COURSE}/set_courses/${shopId}`, payload)
	},
}

export default CourseApi

