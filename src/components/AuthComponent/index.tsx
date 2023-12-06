"use client"

import { useRouter } from 'next/navigation'
import React, { Component, useEffect, useState } from 'react'

type AuthComponentType = Component<any, any>

export default function withAuth<AuthProps extends AuthComponentType>(
	AuthComponent: React.ComponentType<AuthProps>,
): React.FC<AuthProps> {
	return function Authenticated(props: AuthProps) {
		const [loading, setLoading] = useState(true)
		const router = useRouter()

		useEffect(() => {
			const userData = localStorage.getItem('user')
			if (!userData) {
				router.push('/login')
			}
			setLoading(false)
		}, [])
		if (loading) {
			return <h1>loading</h1>
		}
		return <AuthComponent {...props} />
	}
}
