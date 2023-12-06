import { put, call, select, takeLatest, all } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import cookies from '@/src/utils/cookies'
import ShopApi from '@/src/services/Shop'
import { listShopActions, GetShopPayload } from './listShopSlice'
import { RootState } from '..'
import { DEFAULT_LOCATION } from '@/src/constants'

function* fetchList(action: PayloadAction<GetShopPayload>): any {
	const { thema_id, filter, jumpUp, orderBy } = action.payload
	const page = yield select(
		(state: RootState) => state.listShop[thema_id]?.page || 1,
	)

	const distanceOrder = {
		latitude: cookies.getValueFromKey('lat') ?? DEFAULT_LOCATION.lat,
		longitude: cookies.getValueFromKey('lng') ?? DEFAULT_LOCATION.lng,
		distance_order: orderBy ? 'ASC' : undefined,
	}

	try {
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
					{
						category: ['$all', { thema: ['$all'] }, { $filter: { thema_id } }],
					},
					{ user: ['show_shop_tag'] },
				],
				filter,
				page,
				limit: 20,
				order: jumpUp ? [['jump_order', 'DESC']] : undefined,
			},
			distanceOrder,
		)
		yield put(
			listShopActions.getListSuccess({
				thema_id,
				data: response.results.objects.rows,
				total: response.results.objects.total_rows,
			}),
		)
	} catch (e) {
		console.log(e)
	}
}

function* watchGetList() {
	yield takeLatest(
		[listShopActions.getList.type, listShopActions.loadMore.type],
		fetchList,
	)
}

export default function* listShopSaga() {
	yield all([watchGetList()])
}
