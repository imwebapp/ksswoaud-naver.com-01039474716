export type FilterParams = {
	user_id?: string
	$or?: Array<FilterParams>
	$and?: Array<FilterParams>
	$contains?: Array<FilterParams>
	shop_id?: string
	[key: string]: any
}

export type APIGetParams = {
	fields?: Array<
		| string
		| {
				[key: string]: any
		  }
	>
	filter?: FilterParams
	order?: any
	limit?: number
	page?: number
}

export interface PaginationResponse {
	current_page: number
	next_page: number
	prev_page: number
	limit: number
}

export interface ListResponse<T> {
	code: number
	results: {
		objects: {
			count: number
			rows: T[]
		}
	}
	pagination: PaginationResponse
}

export interface Response<T> {
	code: number
	results: {
		object: T
	}
}
