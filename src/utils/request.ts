import cookies from './cookies'

export enum RequestMethod {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
	PATCH = 'patch',
	UPLOAD_FILE = 'uploadFile',
}
const API_HOST = process.env.API_HOST

const getApiDomain = (url?: string) => `${API_HOST}${url}`

const getAuthorization = (): string => {
	const token = cookies.getAccessToken()
	if (!token) {
		return ''
	}

	return `Bearer ${token}`
}

export const request = {
	[RequestMethod.GET]: async (url: string, config?: any): Promise<any> => {
		const options = {
			method: RequestMethod.GET,
			headers: {
				'Content-Type': 'application/json',
				...(getAuthorization() ? { Authorization: getAuthorization() } : {}),
				...config,
			},
		}

		try {
			const response = await fetch(getApiDomain(url), {
				...options,
				cache: 'no-cache',
			})
			const json = await response.json()
			if (response.status === 200) {
				return json
			} else {
				return Promise.reject(json)
			}
		} catch (error) {
			throw error
		}
	},
	[RequestMethod.POST]: async (
		url: string,
		body: any,
		config?: any,
	): Promise<any> => {
		const options = {
			method: RequestMethod.POST,
			headers: {
				'Content-Type': 'application/json',
				...(getAuthorization() ? { Authorization: getAuthorization() } : {}),
				...config,
			},
			body: JSON.stringify(body),
		}

		try {
			const response = await fetch(getApiDomain(url), options)
			const json = await response.json()
			if (response.status === 200) {
				return json
			} else {
				return Promise.reject(json)
			}
		} catch (error) {
			throw error
		}
	},
	[RequestMethod.DELETE]: async (url: string, config?: any): Promise<any> => {
		const options = {
			method: RequestMethod.DELETE,
			headers: {
				'Content-Type': 'application/json',
				Authorization: getAuthorization(),
				...config,
			},
		}

		try {
			const response = await fetch(getApiDomain(url), options)
			const json = await response.json()
			if (response.status === 200) {
				return json
			} else {
				return Promise.reject(json)
			}
		} catch (error) {
			throw error
		}
	},
	[RequestMethod.PUT]: async (
		url: string,
		body: any,
		config?: any,
	): Promise<any> => {
		const options = {
			method: RequestMethod.PUT,
			headers: {
				'Content-Type': 'application/json',
				...(getAuthorization() ? { Authorization: getAuthorization() } : {}),
				...config,
			},
			body: JSON.stringify(body),
		}
		try {
			const response = await fetch(getApiDomain(url), options)
			const json = await response.json()
			if (response.status === 200) {
				return json
			} else {
				return Promise.reject(json)
			}
		} catch (error) {
			throw error
		}
	},
	[RequestMethod.UPLOAD_FILE]: async (url: string, data: any, name: string) => {
		try {
			const response = await fetch(getApiDomain(url), {
				method: RequestMethod.POST,
				headers: {
					accept: 'application/json',
					...(getAuthorization() ? { Authorization: getAuthorization() } : {}),
				},
				body: data,
			})

			const json = await response.json()
			if (response.status === 200) {
				return json
			} else {
				return Promise.reject(json)
			}
		} catch (error) {
			throw error
		}
	},
}
