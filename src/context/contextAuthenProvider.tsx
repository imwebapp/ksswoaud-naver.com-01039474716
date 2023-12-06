'use client'

import { useRouter } from 'next/navigation'
import React, {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
} from 'react'
import cookies from '../utils/cookies'
import { dataUserFromCookies } from '../utils/common'

type SharedState = {}

const AppContext = createContext<SharedState | undefined>(undefined)

type AppWrapperProps = {
	children: ReactNode
}

const LoadingOverlay = () => {
	return (
		<div className='flex items-center justify-center min-h-full p-5 bg-gray-100 w-screen absolute left-0'>
			<div className='flex space-x-2 animate-pulse'>
				<div className='w-3 h-3 bg-gray-500 rounded-full'></div>
				<div className='w-3 h-3 bg-gray-500 rounded-full'></div>
				<div className='w-3 h-3 bg-gray-500 rounded-full'></div>
			</div>
		</div>
	)
}

const publicRoute = ['login']

export function AuthenContextWrapper({ children }: AppWrapperProps) {
	const [loading, setLoading] = useState(true)
	const router = useRouter()
	const { isLoginExpired } = dataUserFromCookies()

	useEffect(() => {
		const userData = localStorage.getItem('token')
		if (isLoginExpired) {
			localStorage.removeItem('token')
			cookies.removeAccessToken()
		}
		if (!userData) {
			router.push('/login')
		} else {
			setLoading(false)
		}
	}, [])

	const sharedState: SharedState = {}
	if (loading) {
		return <LoadingOverlay />
	}

	return (
		<AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
	)
}

export function useAuthenContext(): SharedState | undefined {
	const context = useContext(AppContext)
	if (context === undefined) {
		throw new Error('useAppContext must be used within an AppWrapper')
	}
	return context
}
