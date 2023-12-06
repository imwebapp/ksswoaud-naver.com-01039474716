import { put, call, select, takeLatest, all } from 'redux-saga/effects'

import { RootState } from '..'
import cookies from '@/src/utils/cookies'
import EventApi from '@/src/services/Event'
import { MY_LIST_STATE, DEFAULT_LOCATION } from '@/src/constants'
import { eventActions } from './eventSlice'

function* fetchList(): any {
	const { pagination, keyword } = yield select(
		(state: RootState) => state.event,
	)
	const { page, limit } = pagination
	const filter: any = {
		state: MY_LIST_STATE.APPROVED,
	}
	if (keyword) {
		filter.description = { ilike: `%${keyword}%` }
	}

	try {
		const response = yield call(
			EventApi.getList,
			{
				fields: [
					'description',
					'end_time',
					'shop_id',
					{
						shop: [
							'alias',
							'images',
							{ category: ['id', { thema: ['alias'] }] },
						],
					},
				],
				filter,
				limit,
				page,
			},
			{
				order_option: 'LATEST',
				distance_order: 'ASC',
				latitude: cookies.getValueFromKey('lat') ?? DEFAULT_LOCATION.lat,
				longitude: cookies.getValueFromKey('lng') ?? DEFAULT_LOCATION.lng,
			},
		)

		yield put(
			eventActions.getListSuccess({
				data: response.results.objects.rows,
				total: response.results.objects.total_rows,
			}),
		)
	} catch (err) {
		console.log(err)
	}
}

function* watchFetchList() {
	yield takeLatest(
		[
			eventActions.getList.type,
			eventActions.loadMore.type,
			eventActions.setKeyword.type,
		],
		fetchList,
	)
}

export default function* eventSaga() {
	yield all([watchFetchList()])
}
