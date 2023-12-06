import { put, call, fork, take, select } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import { authActions, LoginPayload } from './authSlice'
import { RootState } from '..'
import AuthAPI from '@/src/services/Auth'
import { UserState } from './type'
import { globalActions } from '../global/globalSlice'
import { userActions } from '../user/userSlice'

const { logout, login, loginSuccess, loginStatus } = authActions
const { loadingPage, loadingPageSucess } = globalActions
const { saveUserProfile } = userActions

function* fetchLogin(action: LoginPayload) {
	try {
		//**Login */
		yield put(loginStatus(false))
		yield put(loadingPage({}))
		const respone: UserState = yield call(AuthAPI.LOGIN, { ...action })
		yield put(loginSuccess({ ...respone }))
	} catch (err) {
		yield put(loginStatus(err))
	}
}

function* watchLoginFlow() {
	while (true) {
		const isLogin: boolean = yield select(
			(state: RootState) => state.auth.isLogin,
		)
		if (!isLogin) {
			const action: PayloadAction<LoginPayload> = yield take(login.type)
			yield call(fetchLogin, action.payload)
		} else {
			yield take(logout.type)
			yield call(logout)
			yield put(saveUserProfile({}))
		}
	}
}

export default function* authSaga() {
	yield fork(watchLoginFlow)
}
