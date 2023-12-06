import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { userActions } from './userSlice'
import UserApi from '@/src/services/User'
import { RootState } from '..'
import { dataUserFromCookies } from '@/src/utils/common'

const { saveUserProfile } = userActions
function* fetchUserProfile() {
	try {
		// TODO :  get token from cookie
		const { userToken } = dataUserFromCookies()
		const userId = userToken?.payload?.user_id
		const isLoading: boolean = yield select(
			(state: RootState) => state.user.loading,
		)
		if (isLoading && userId) {
			const response: unknown = yield call(UserApi.GET_USER_BY_ID, userId)

			if (response) {
				yield put(saveUserProfile({ ...response }))
			}
		}
	} catch (error) {}
}

export default function* userSaga() {
	yield takeLatest('user/getUserProfile', fetchUserProfile)
}
