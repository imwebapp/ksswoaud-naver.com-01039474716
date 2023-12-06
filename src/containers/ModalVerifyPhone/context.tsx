'use client'

import { useRouter } from 'next/navigation'
import React, {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
} from 'react'

type SharedState = {}

const AppContext = createContext<SharedState | undefined>(undefined)

type AppWrapperProps = {
	children: ReactNode
}

export function ModalPhoneProvider({ children }: AppWrapperProps) {
	const sharedState: SharedState = {}

	return (
		<AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
	)
}

export function useModalPhoneContext(): SharedState | undefined {
	const context = useContext(AppContext)
	if (context === undefined) {
		throw new Error('useAppContext must be used within an AppWrapper')
	}
	return context
}
