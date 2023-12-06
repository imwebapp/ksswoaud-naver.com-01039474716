'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { SnackbarProvider } from 'notistack'

import store from '.'
import { AppWrapper } from '../context'

export default function ReduxProvider({ children }: { children: ReactNode }) {
	return (
		<SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
			<Provider store={store}>
				<AppWrapper>
					<GoogleOAuthProvider
						clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
					>
						{children}
					</GoogleOAuthProvider>
				</AppWrapper>
			</Provider>
		</SnackbarProvider>
	)
}
