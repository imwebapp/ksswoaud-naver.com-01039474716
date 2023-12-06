import { select, put, call, takeLatest, all } from 'redux-saga/effects'

import { RootState } from '@/src/stores'
import { searchEventActions } from './searchEventSlice'
import EventApi from '@/src/services/Event'
import { MY_LIST_STATE } from '@/src/constants'

function* fetch(): any {
	try {
		const { page, keyword } = yield select(
			(state: RootState) => state.searchEvent,
		)
		const response = yield call(EventApi.getList, {
			fields: [
				'description',
				'end_time',
				'shop_id',
				{
					shop: ['alias', 'images', { category: ['id', { thema: ['alias'] }] }],
				},
			],
			filter: {
				state: MY_LIST_STATE.APPROVED,
				description: keyword ? { $iLike: `%${keyword}%` } : undefined,
			},
			page,
			limit: 20,
		})

		const { rows, count } = response.results.objects
		yield put(searchEventActions.getListSuccess({ data: rows, total: count }))
	} catch (e) {
		console.log(e)
	}
}

function* watchFetch() {
	yield takeLatest(
		[searchEventActions.setKeyword.type, searchEventActions.loadMore.type],
		fetch,
	)
}

export default function* searchEventSaga() {
	yield all([watchFetch()])
}
