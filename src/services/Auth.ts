import { isEmpty } from 'lodash'
import { request } from '../utils/request'
import { generateMD5Hash } from '../utils/common'

const extractData = (response: any) =>
	response && response.results
		? { data: response.results?.object, token: response.results?.token }
		: {}

const AuthAPI = {
	LOGIN: async (body: any) => {
		return await request.post('/auth/login', body).then(extractData)
	},
	LOGIN_GOOGLE: async (body: any) => {
		return await request.post('/auth/login_with_google', body).then()
	},
	LOGIN_FACEBOOK: async (body: any) => {
		return await request.post('/auth/login_with_facebook', body).then()
	},
	LOGIN_KAKAO: async (body: any) => {
		return await request.post('/auth/login_with_kakaotalk', body).then()
	},
	VERIFY_PHONE_NUMBER: async (prame: any) => {
		return request.get(`/user/phone/${prame}`)
	},
	VERIFY_OTP: async (body: any) => {
		// TODO : implement verify OTP from api server

		return new Promise((resolve, reject) => {
			const responseData = body?.otp === '123456'
			if (responseData) {
				resolve({
					status: 200,
					data: {
						status: 'success',
					},
				})
			} else {
				reject({ code: 'otp invalid' })
			}
		})
	},
	RESET_PASSWORD: async (body: any) => {
		return request.put('/auth/reset_password', { ...body })
	},
	REGISTER: async (body: any) => {
		const {
			email,
			username,
			password,
			phone,
			referral_code,
			nickname,
			avatar,
			account_type,
			image_id_card = '',
		} = body

		const param = {
			email ,
			username: email,
			password: generateMD5Hash(password),
			phone,
			referral_code,
			nickname: username,
			avatar,
			account_type,
			image_id_card: '',
		}
		if (!isEmpty(referral_code)) {
			param.referral_code = referral_code
		}
		return request.post('/auth/register', { ...param }).then()
	},
	CHANGE_PASSWORD: (body: any) => {
		return request.put('/user/change_password', { ...body })
	},
}

export default AuthAPI
