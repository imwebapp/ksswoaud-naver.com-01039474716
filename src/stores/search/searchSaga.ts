import { select, put, call, takeLatest, all } from 'redux-saga/effects'

import cookies from '@/src/utils/cookies'
import { RootState } from '@/src/stores'
import { createShopFilter } from '@/src/utils/common'
import ShopApi from '@/src/services/Shop'
import { DEFAULT_LOCATION } from '@/src/constants'
import { searchActions } from './searchSlice'

function* fetch(): any {
	const distanceOrder = {
		latitude: cookies.getValueFromKey('lat') ?? DEFAULT_LOCATION.lat,
		longitude: cookies.getValueFromKey('lng') ?? DEFAULT_LOCATION.lng,
		distance_order: 'ASC',
	}

	try {
		const { page, keyword } = yield select((state: RootState) => state.search)
		const response = yield call(
			ShopApi.getList,
			{
				fields: [
					'title',
					'category_id',
					'user_id',
					'position',
					'thumbnails',
					'images',
					'view',
					'like',
					'address',
					'address_2',
					'opening_hours',
					'contact_phone',
					'min_price',
					'loyalty_status',
					'reservation_status',
					'soft_comment_count',
					'latitude',
					'longitude',
					'old_shop',
					'alias',
					'jump_order',
					{ tags: ['$all', { tag: ['$all'] }] },
				],
				filter: createShopFilter({ keyword }),
				page,
				limit: 20,
			},
			distanceOrder,
		)

		const { rows, count } = response.results.objects
		yield put(searchActions.getListSuccess({ data: rows, total: count }))
	} catch (e) {
		console.log(e)
	}
}

function* watchFetch() {
	yield takeLatest(
		[searchActions.setKeyword.type, searchActions.loadMore.type],
		fetch,
	)
}

export default function* searchSaga() {
	yield all([watchFetch()])
}
