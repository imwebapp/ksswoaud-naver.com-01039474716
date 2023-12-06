import { request } from '../utils/request'
import { ROUTE_API } from '@/src/constants'
import { Response } from '.'

export interface SeoI {
	title?: string
	description?: string
	icon?: string
	keywords?: string
	avatar?: string
	meta?: string
}

const SeoApi = {
	get: (): Promise<Response<SeoI>> => request.get(ROUTE_API.SEO_SSR),
}

export default SeoApi
