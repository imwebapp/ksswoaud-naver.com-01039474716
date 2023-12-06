import { put, call, select, takeLatest, all } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '..'
import BlogApi from '@/src/services/Blog'
import { blogActions, GetBlogPayload } from './blogSlice'

function* fetchList(action: PayloadAction<GetBlogPayload>): any {
	const { thema_id, category_id, keyword } = action.payload
	const { limit, page } = yield select(
		(state: RootState) => state.event.pagination,
	)
	const filter: any = {
		category_id,
	}

	if (keyword) {
		filter.title = { $ilike: `${keyword}` }
	}

	try {
		const response = yield call(BlogApi.getList, {
			fields: ['$all', { category: ['id', { $filter: { thema_id } }] }],
			filter,
			order: [['created_at', 'DESC']],
			limit,
			page,
		})

		yield put(
			blogActions.getListSuccess({
				thema_id,
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
		[blogActions.getList.type, blogActions.loadMore.type],
		fetchList,
	)
}

export default function* blogSaga() {
	yield all([watchFetchList()])
}
