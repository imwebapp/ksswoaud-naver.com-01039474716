import { select, put, call, takeLatest, all } from 'redux-saga/effects'

import { RootState } from '@/src/stores'
import { searchPostActions } from './searchPostSlice'
import PostApi from '@/src/services/Post'

function* fetch(): any {
	try {
		const { page, keyword } = yield select(
			(state: RootState) => state.searchPost,
		)
		const response = yield call(PostApi.getList, {
			fields: ['$all', { user: ['$all'] }],
			filter: { title: keyword ? { $iLike: `%${keyword}%` } : undefined },
			page,
			limit: 20,
		})

		const { rows, count } = response.results.objects
		yield put(searchPostActions.getListSuccess({ data: rows, total: count }))
	} catch (e) {
		console.log(e)
	}
}

function* watchFetch() {
	yield takeLatest(
		[searchPostActions.setKeyword.type, searchPostActions.loadMore.type],
		fetch,
	)
}

export default function* searchPostSaga() {
	yield all([watchFetch()])
}
