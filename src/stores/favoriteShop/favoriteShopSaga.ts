import { call, select, takeLatest, all, put } from 'redux-saga/effects'

import { RootState } from '..'
import ShopApi from '@/src/services/Shop'
import { favoriteShopActions } from './favoriteShopSlice'
import cookies from '@/src/utils/cookies'

const { get, getSuccess } = favoriteShopActions

function* fetch(): any {
	try {
		const { page, limit } = yield select(
			(state: RootState) => state.favoriteShop.pagination,
		)
		const userData = yield select((state: RootState) => state.user.profile)
		const response = yield call(
			ShopApi.getFavoriteShop,
			{
				limit,
				page,
				fields: ['$all', { shop: ['$all', { tags: ['$all'] }] }],
				filter: { user_id: userData.id },
			},
			{
				latitude: cookies.getValueFromKey('lat'),
				longitude: cookies.getValueFromKey('lng'),
				distance_order: 'ASC',
			},
		)
		yield put(
			getSuccess({
				data: response.results.objects.rows,
				total: response.results.objects.count,
			}),
		)
	} catch (e) {
		console.log(e)
	}
}

function* watchFetch() {
	yield takeLatest([get.type], fetch)
}

export default function* favoriteShopSaga() {
	yield all([watchFetch()])
}
