import { put, takeLatest, all, select, call, fork } from 'redux-saga/effects'
import { contentActions } from './contentSlice'
import ContentApi from '@/src/services/Content'
import { ListResponse } from '@/src/services'

interface CompanyInfoI {
	id: string
	status: boolean
	createdAtUnixTimestamp: number
	createdAt: string
	updatedAt: string
	deletedAt?: string
	type: string
	content: string
}

const { fetchListStarted, fetchListSuccess, fetchListFailded, loadingPage } =
	contentActions

function* fetchContent(action: any) {
	const param = action.payload ?? {
		fields: ['$all'],
	}
	try {
		yield put(loadingPage(true))

		const response: ListResponse<CompanyInfoI> = yield call(
			ContentApi.getList,
			param,
		)

		yield put(loadingPage(false))

		yield put(fetchListSuccess(response))
	} catch (error) {
		yield put(fetchListFailded(error))

		yield put(loadingPage(false))
	}
}

function* watchGetList() {
	yield takeLatest([fetchListStarted.type], fetchContent)
}

export default function* contentSaga() {
	yield all([watchGetList()])
	// yield fork(watchGetList)
}
