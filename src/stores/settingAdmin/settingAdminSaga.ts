import { call, put, takeEvery } from 'redux-saga/effects'
import { settingAdminActions } from './settingAdminSlice'
import SettingApi from '@/src/services/Setting'
import { GET_SETTING_ADMIN, SettingAdminState } from './type'

const { saveSettingAdmin } = settingAdminActions

function* fetchSettingAdmin() {
	try {
		const respone: SettingAdminState = yield call(SettingApi.SettingAdmin)
		yield put(saveSettingAdmin(respone))
	} catch (error) {}
}

export default function* settingAdminSaga() {
	yield takeEvery(GET_SETTING_ADMIN, fetchSettingAdmin)
}
