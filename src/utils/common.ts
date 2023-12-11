import moment, { MomentInput } from 'moment'
import cookies from './cookies'
import { MY_LIST_STATE, BOARD_ROUTE, BOARD } from '../constants'
import { ShopI } from '../services/Shop'
import crypto from 'crypto'

/** helper function merge class css */
export const classNames = (...names: (string | undefined | null)[]): string =>
	(names || []).filter((e) => !!e && typeof e === 'string').join(' ')

export const formatDate = (date: MomentInput) =>
	moment(date).format('YYYY-MM-DD')

export const formatDateTime = (date: MomentInput) =>
	moment(date).format('YYYY-MM-DD HH:mm')

export const formatTwoDigit = (number: number) =>
	number < 10 ? `0${number}` : number

/** helper function get username frome email */

export const getEmailName = (email: string) => {
	const atIndex = email.indexOf('@')
	if (atIndex !== -1) {
		const name = email.slice(0, atIndex)
		if (email.endsWith('@gmail.com')) {
			return name
		}
	}
	return null
}

export const parseJWT = (token: string) => {
	const base64Url = token.split('.')[1]
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
			})
			.join(''),
	)

	return JSON.parse(jsonPayload)
}

type DateInput = moment.MomentInput

export const isPast = (date: DateInput): boolean => {
	return moment(date).isBefore()
}

export const fromUnixTime = (unixTime: number): moment.Moment => {
	return moment.unix(unixTime)
}

export const dataUserFromCookies = () => {
	const storageToken = cookies.getAccessToken()
	const tokenData = storageToken && parseJWT(storageToken)
	const tokenExpired =
		tokenData && tokenData.exp && isPast(fromUnixTime(tokenData.exp))
	const isLoginExpired = !tokenData || tokenExpired
	return {
		userToken: tokenData,
		tokenExpired,
		isLoginExpired,
	}
}

export const convertParams = (params: { [key: string]: any }) => {
	return Object.fromEntries(
		Object.entries(params).map(([key, value]) => [key, JSON.stringify(value)]),
	)
}

export const getAuthorizationFromServer = (serverCookies: any): any => {
	const token = serverCookies().get('token').value
	if (!token) {
		return ''
	}
	return { Authorization: `Bearer ${token}` }
}

export const createLinkShopDetail = (title: string, id: string) =>
	`/detail/${encodeURIComponent(title)}/${id}`

export const createQueryParams = (
	data: {
		[key: string]: string | string[]
	},
	params: URLSearchParams,
) => {
	Object.entries(data).forEach(([key, value]) => {
		if (value && value.length) {
			params.set(key, Array.isArray(value) ? value.toString() : value)
		} else {
			params.delete(key)
		}
	})
	return params.toString()
}

export const mergeQueryParams = (pathname: string, queryParams: string) => {
	if (!queryParams) return pathname
	return pathname + '?' + queryParams
}

export interface CreateShopFilterProps {
	keyword?: string
	categories?: string[]
	tags?: string[]
	province?: string
	district?: string
	location?: string
	line?: string
	station?: string
}

export const createShopFilter = ({
	keyword,
	categories,
	tags,
	province,
	district,
	location,
	line,
	station,
}: CreateShopFilterProps): any => {
	return {
		$and: [
			categories && categories.length
				? {
						$or: categories.map((category) => ({ category_id: category })),
				  }
				: undefined,
			{
				$or: [
					{
						$and: [
							{ state: MY_LIST_STATE.APPROVED },
							{ title: keyword ? { $iLike: `%${keyword}%` } : undefined },
						],
					},
					{
						$and: [
							{ old_shop: { $ne: null } },
							{
								'old_shop.title': keyword
									? { $iLike: `%${keyword}%` }
									: undefined,
							},
						],
					},
				],
			},
			{
				tag_ids:
					tags && tags.length > 0
						? {
								$contains: tags,
						  }
						: undefined,
			},
			{
				shop_province: province,
			},
			{ shop_district: district },
			{ subway_location: location },
			{ subway_line: line },
			{ subway_station: station },
		].filter(Boolean),
	}
}

export const mergeDataById = (
	data: Array<{
		id: string
		[key: string]: any
	}>,
	newData: Array<{
		id: string
		[key: string]: any
	}>,
	mergeFirst?: boolean,
) => {
	const ids = new Set(data.map((item: any) => item.id))
	return mergeFirst
		? [...newData.filter((item: any) => !ids.has(item.id)), ...data]
		: [...data, ...newData.filter((item: any) => !ids.has(item.id))]
}

export const transformArrayJumpUp = (data: ShopI[]) => {
	const newArray: ShopI[][] = []
	let currentIndex = 0

	while (currentIndex < data.length) {
		if (currentIndex === 0) {
			newArray.push([data[currentIndex]])
			currentIndex++
		} else {
			const currentGroup = []
			if (currentIndex < 3) {
				for (let i = 0; i < 2 && currentIndex < data.length; i++) {
					currentGroup.push(data[currentIndex])
					currentIndex++
				}
			} else {
				for (let i = 0; i < 3 && currentIndex < data.length; i++) {
					currentGroup.push(data[currentIndex])
					currentIndex++
				}
			}
			newArray.push(currentGroup)
		}
	}

	return newArray
}
export const deleteAllCookies = () => {
	const cookies = document.cookie.split(';')
	for (let i = 0; i < cookies.length; i += 1) {
		const cookie = cookies[i]
		const eqPos = cookie.indexOf('=')
		const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
		document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
	}
}

export const formatToConcurrent = (number: number | string) => {
	if (typeof number === 'string') {
		number = parseInt(number)
	}

	const integer = Math.floor(number)
	const decimal = number - integer
	const decimalString = decimal.toFixed(2)
	const commaSeparatedDecimal = decimalString.replace('.', ',')

	return `${integer}${commaSeparatedDecimal}`
}

export const truncateText: (
	text: string,
	maxLength: number,
	ending?: string,
) => string = (text, maxLength, ending = '...') => {
	if (text.length <= maxLength) {
		return text
	}

	return text.slice(0, maxLength) + ending
}

export const generateMD5Hash = (data: string): string => {
	const hash = crypto.createHash('md5')
	hash.update(data)
	return hash.digest('hex')
}

export const convertToKoreanTime = (inputTime: string): string => {
	const [start, end] = inputTime.split('~')

	const startParts = start.split(':')
	const startHour = parseInt(startParts[0], 10)
	const startMinute = startParts[1]
	const startKorean = `오전${startHour
		.toString()
		.padStart(2, '0')}:${startMinute}`

	const endParts = end.split(':')
	const endHour = parseInt(endParts[0], 10)
	const endMinute = endParts[1]
	const endKorean = `오후${(startHour + 12)
		.toString()
		.padStart(2, '0')}:${endMinute}`

	return `${startKorean}~${endKorean}까지`
}

export const numberWithComma = (number: string | number) => {
	if (typeof number === 'string') number = parseInt(number)
	return number?.toLocaleString('en-US')
}

export const withoutLeading0 = (number: string | number) => {
	return parseInt(`${number}`, 10)
}

export const checkOpeningHour = (openHour: string) => {
	const now = moment()
	const open = moment(openHour.slice(0, 5), 'HH:mm')
	const close = moment(openHour.slice(6, 11), 'HH:mm')
	if (open.isSameOrAfter(close) && now.isAfter(open)) close.add(1, 'days')
	if (now.isBefore(open) && open.isSameOrAfter(close)) open.add(-1, 'days')
	return open.isSameOrBefore(now) && close.isSameOrAfter(now)
}

export function removeHtmlTags(input: string) {
	return input?.replace(/<[^>]*>/g, '')
}

export function getImageFromHtml(html: string) {
	const parser = new DOMParser()
	const doc = parser.parseFromString(html, 'text/html')

	const imgElements = doc.querySelectorAll('img')
	if (imgElements.length) {
		return imgElements[0].getAttribute('src')
	}
	return ''
}

export function generateRandomString() {
	let result = ''
	const characters = '0123456789'
	const length = 5

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length)
		result += characters.charAt(randomIndex)
	}

	return result
}

export const createBoardLink = (route: string, thema_id?: string) => {
	let href = BOARD_ROUTE[route] ? `${BOARD_ROUTE[route]}/${thema_id}` : ''

	if (route === BOARD.EVENT_BOARD) href = '/event'
	return href
}

function getVideoId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}

export const convertLinkIframe = (url :string) => {
	const videoId = getVideoId(url);
	return "https://www.youtube.com/embed/" + videoId
}

