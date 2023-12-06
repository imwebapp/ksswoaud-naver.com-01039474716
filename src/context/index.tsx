'use client'

import React, {
	createContext,
	useContext,
	ReactNode,
	useEffect,
	useState,
} from 'react'
import { userActions } from '../stores/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../stores'
import { dataUserFromCookies } from '../utils/common'
import useLocation from '../hooks/useLocation'
import { settingAdminActions } from '../stores/settingAdmin/settingAdminSlice'
import { contentActions } from '../stores/content/contentSlice'
import { settingActions } from '../stores/setting/settingSlice'
import { isEmpty } from 'lodash'
import { authActions } from '../stores/auth/authSlice'

type SharedState = {}

const AppContext = createContext<SharedState | undefined>(undefined)

type AppWrapperProps = {
	children: ReactNode
}

export function AppWrapper({ children }: AppWrapperProps) {
	/** STATE */
	const [openMenu, setOpenMenu] = useState(false)

	const { getUserProfile } = userActions
	const { getSettingAdmin } = settingAdminActions
	const { getUseLocation, location } = useLocation()
	const dispatch = useDispatch()
	const { isLoginExpired } = dataUserFromCookies()
	const isLogin: any = useSelector((state: RootState) => state.auth?.isLogin)
	const profile = useSelector((state: RootState) => state.user.profile)
	const test = useSelector((state: RootState) => state)
	const accountTypeUser = profile.account_type
	const { fetchListStarted } = contentActions
	const { fetchSettingStarted } = settingActions
	const [loadKakao, setLoadKakao] = useState(false)
	const [dataSNS, setDataSNS] = useState<any>(null)
	const { logout, login, loginSuccess, loginStatus } = authActions

	/** LOGIC */

	const initApp = () => {
		if (isLogin || !isLoginExpired) {
			const userCurrent = localStorage
				? JSON.parse(`${localStorage.getItem('userData')}`)
				: null
			if (userCurrent && !location) {
				getUseLocation(userCurrent)
			}
			dispatch(getUserProfile())
		}
		getUseLocation({})
		dispatch(getSettingAdmin())
		dispatch(
			fetchListStarted({
				fields: ['$all'],
				filter: {
					// type: 'company-info',
				},
			}),
		)
		dispatch(fetchSettingStarted({ fields: ['$all'] }))
	}

	useEffect(() => {
		if (isEmpty(profile.nickname) || isEmpty(profile.phone)) {
			dispatch(logout)
		}
		initApp()
	}, [isLogin, location])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
		script.onload = () => {
			setLoadKakao(true)
		}
		script.onerror = () => {
			setLoadKakao(true)
		}
		document.body.appendChild(script)
	}, [])

	useEffect(() => {
		// @ts-ignore
		if (window?.Kakao) {
			// @ts-ignore
			window?.Kakao.init(process.env.KAKAO_APP_ID)
		}
	}, [loadKakao])

	const sharedState: SharedState = {
		openMenu,
		setOpenMenu,
		accountTypeUser,
		setDataSNS,
		dataSNS,
	}

	return (
		<AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
	)
}

export function useAppContext(): any | undefined {
	const context = useContext(AppContext)
	if (context === undefined) {
		throw new Error('useAppContext must be used within an AppWrapper')
	}
	return context
}
