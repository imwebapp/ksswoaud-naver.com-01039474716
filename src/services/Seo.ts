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
	get: (): Promise<Response<SeoI>> => new Promise<Response<SeoI>>(resolve => {
		resolve({
			code: 200,
			results: {
				object: {
					title: '우리집마사지 - 전국 출장마사지,홈마사지,마사지 앱',
					description: '출장마사지,홈마사지,출장타이마사지,홈타이마사지,홈타이,출장타이,필리핀출장,베트남출장,출장안마,오피스타,마사지,오피걸스,타이마사지,스웨디시,아로마',
					icon: 'https://kormsg.com/assets/images/icon_app.png',
					keywords: '타이마사지, 태국마사지, 타이샵, 아로마',
					avatar: 'https://kormsg.com/assets/images/icon_app.png',
					meta: ''
				}
			}
		})
	}),
}

export default SeoApi
