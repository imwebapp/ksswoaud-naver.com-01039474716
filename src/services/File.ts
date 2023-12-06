import { request } from '../utils/request'
import { ROUTE_API } from '../constants'
import { Response } from '.'

const extractData = (response: any) =>
	response && response.results ? response.results?.object : {}

interface ImageResponse {
	file_name: string
	url: string
}

const FileApi = {
	uploadFile: async (file: any, name = '') => {
		if (!file || !file?.size) return { imgURL: null, name: name }
		const formData = new FormData()
		formData.append('image', file)
		return request
			.uploadFile('/image/upload/1920', formData, 'files')
			.then(extractData)
			.catch((err) => console.log('err =>>>>>>', err))
	},
	uploadMultipleImages: (
		files: FileList | File[],
	): Promise<
		Response<{
			high_quality_images: ImageResponse[]
			low_quality_images: ImageResponse[]
		}>
	> => {
		const formData = new FormData()
		Array.from(files).forEach((file) => formData.append('images', file))
		formData.get('images')
		return request.uploadFile(
			`${ROUTE_API.IMAGE_MULTIPLE_UPLOAD}/300/1920`,
			formData,
			'files',
		)
	},
}

export default FileApi
