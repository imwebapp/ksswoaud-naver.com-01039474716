import { createQueryParams, mergeQueryParams } from './common'

class SearchParam {
	private queryParams: string

	constructor() {
		this.queryParams = ''
	}

	create(
		prop: {
			[key: string]: string | string[]
		},
		param: any,
	): SearchParam {
		if (prop === null || param === undefined) {
			throw new Error('Invalid prop or param')
		}

		this.queryParams = createQueryParams(prop, param)

		return this
	}

	push(router: any, pathname: string): void {
		router.push(mergeQueryParams(pathname, this.queryParams))
	}
}

export default SearchParam
