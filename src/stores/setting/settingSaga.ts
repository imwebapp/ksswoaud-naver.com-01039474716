import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { settingActions } from './settingSlice'
import { ListResponse } from '@/src/services'
import SettingApi from '@/src/services/Setting'

const { loadingPage, fetchSettingStarted, fetchSettingSuccess } = settingActions
interface SettingI {
	id: string
	status: boolean
	created_at_unix_timestamp: number
	value_array: any[]
	value_array_obj: any[]
	created_at: string
	updated_at: string
	deleted_at: string | null
	field: string
	value: string
}
function* fetchSetting(action: any) {
	const param = action.payload ?? {
		fields: ['$all'],
	}
	try {
		yield put(loadingPage(true))

		const response: ListResponse<SettingI> = yield call(
			SettingApi.fetchSetting,
			param,
		)

		yield put(loadingPage(false))

		yield put(fetchSettingSuccess(response))
	} catch (error) {
		yield put(fetchSettingSuccess(error))

		yield put(loadingPage(false))
	}
}

function* watchGetList() {
	yield takeLatest([fetchSettingStarted.type], fetchSetting)
}

export default function* settingSaga() {
	yield all([watchGetList()])
}
