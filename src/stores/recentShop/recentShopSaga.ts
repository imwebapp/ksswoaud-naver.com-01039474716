import { call, select, takeLatest, all, put } from 'redux-saga/effects'

import { RootState } from '..'
import ShopApi from '@/src/services/Shop'
import { recentShopActions } from './recentShopSlice'

const { get, getSuccess } = recentShopActions

function* fetch(): any {
	try {
		const { page, limit } = yield select(
			(state: RootState) => state.recentShop.pagination,
		)
		const userData = yield select((state: RootState) => state.user.profile)
		const response = yield call(ShopApi.getRecentShop, {
			limit,
			page,
			fields: [
				'$all',
				{ shop: ['$all', { tags: ['$all', { tag: ['$all'] }] }] },
			],
			filter: { user_id: userData.id },
			order: [['created_at', 'DESC']],
		})
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

export default function* recentShopSage() {
	yield all([watchFetch()])
}
