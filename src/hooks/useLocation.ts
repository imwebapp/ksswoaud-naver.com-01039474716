import { useEffect, useState } from 'react'
import UserApi from '../services/User'
import { DEFAULT_LOCATION } from '../constants'
import cookies from '@/src/utils/cookies'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/navigation'

interface LocationData {
	latitude: number
	longitude: number
}

interface LocationError {
	code: number
	message: string
}

type LocationResult = {
	location?: LocationData | null
	error?: LocationError | null
	getUseLocation: (v: any) => void
}

function useLocation(): LocationResult {
	const [location, setLocation] = useState<LocationData | null>(null)
	const [error, setError] = useState<LocationError | null>(null)
	const router = useRouter()
	useEffect(() => {}, [])

	const showPosition = (position: any, userCurrent: any) => {
		console.log(
			'Latitude: ' +
				position.coords.latitude +
				', Longitude: ' +
				position.coords.longitude,
		)

		UserApi.UPDATE_USER({
			id: userCurrent?.id,
			longitude: position.coords.longitude,
			latitude: position.coords.latitude,
		})
			.then((res) => {
				setLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				})
			})
			.finally(() => {
				router.refresh()
			})
	}

	const showError = (error: any, userCurrent: any) => {
		UserApi.UPDATE_USER({
			id: userCurrent?.id,
			longitude: DEFAULT_LOCATION.lng,
			latitude: DEFAULT_LOCATION.lat,
		})
			.then((res) => {
				setLocation({
					latitude: DEFAULT_LOCATION.lat,
					longitude: DEFAULT_LOCATION.lng,
				})
			})
			.finally(() => {
				router.refresh()
			})
	}

	const getUseLocation = (userCurrent: any) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					if (!isEmpty(userCurrent)) {
						showPosition(pos, userCurrent)
					} else {
						cookies.setValueIntoKey('lat', pos.coords.latitude)
						cookies.setValueIntoKey('lng', pos.coords.longitude)
						router.refresh()
					}
				},
				(err) => {
					if (!isEmpty(userCurrent)) {
						showError(err, userCurrent)
					} else {
						cookies.setValueIntoKey('lat', DEFAULT_LOCATION.lat)
						cookies.setValueIntoKey('lng', DEFAULT_LOCATION.lng)
						router.refresh()
					}
				},
			)
		} else {
			// Geolocation không được hỗ trợ bởi trình duyệt này.
		}
	}

	return { getUseLocation, location }
}

export default useLocation
