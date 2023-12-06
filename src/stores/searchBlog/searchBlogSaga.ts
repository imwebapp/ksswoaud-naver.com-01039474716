import { select, put, call, takeLatest, all } from 'redux-saga/effects'

import { RootState } from '@/src/stores'
import { searchBlogActions } from './searchBlogSlice'
import BlogApi from '@/src/services/Blog'

function* fetch(): any {
	try {
		const { page, keyword } = yield select(
			(state: RootState) => state.searchBlog,
		)
		const response = yield call(BlogApi.getList, {
			fields: ['$all'],
			filter: { title: keyword ? { $iLike: `%${keyword}%` } : undefined },
			page,
			limit: 20,
		})

		const { rows, count } = response.results.objects
		yield put(searchBlogActions.getListSuccess({ data: rows, total: count }))
	} catch (e) {
		console.log(e)
	}
}

function* watchFetch() {
	yield takeLatest(
		[searchBlogActions.setKeyword.type, searchBlogActions.loadMore.type],
		fetch,
	)
}

export default function* searchBlogSaga() {
	yield all([watchFetch()])
}
