import { put, call, select, takeLatest, all } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'

import { postActions, GetPostPayload } from './postSlice'
import PostApi from '@/src/services/Post'
import { RootState } from '..'

function* fetchList(action: PayloadAction<GetPostPayload>): any {
	const { thema_id, category_id, keyword } = action.payload
	console.log('✯ ➢ file: postSage.ts:11 ➢ keyword:', keyword)
	const page = yield select(
		(state: RootState) => state.post[thema_id]?.page || 1,
	)
	const filter: any = {
		category_id,
	}
	if (keyword) {
		filter.title = { $ilike: `%${keyword}%` }
	}
	try {
		const response = yield call(PostApi.getList, {
			fields: [
				'$all',
				{ user: ['nickname','avatar'] },
				{ category: ['id', { $filter: { thema_id } }] },
			],
			filter,
			order: [['created_at', 'DESC']],
			page: page,
			limit: 20,
		})
		yield put(
			postActions.getListSuccess({
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
		[postActions.getList.type, postActions.loadMore.type],
		fetchList,
	)
}

function* fetchDelete(action: PayloadAction<{ id: string; thema_id: string }>) {
	const { id, thema_id } = action.payload
	try {
		yield call(PostApi.delete, id)
		yield put(postActions.deleteSuccess({ id, thema_id }))
		enqueueSnackbar('Delete success', { variant: 'success' })
	} catch (e) {
		enqueueSnackbar((e as any).message, { variant: 'error' })
	}
}

function* watchFetchDelete() {
	yield takeLatest([postActions.delete.type], fetchDelete)
}

export default function* postSaga() {
	yield all([watchGetList(), watchFetchDelete()])
}
