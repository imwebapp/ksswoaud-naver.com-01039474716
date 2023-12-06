import { useEffect, useState } from 'react'

const useLoadPostCode = (ref: any) => {
	const [scriptLoaded, setLoaded] = useState(false)
	const [scriptError, setLoadedError] = useState(false)

	useEffect(() => {
		const script = document.createElement('script')
		script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
		script.onload = () => {
			setLoaded(true)
		}
		script.onerror = () => {
			setLoadedError(true)
		}
		document.body.appendChild(script)
	}, [])

	const openPostCode = (
		fnc: (data: {
			address: string
			latitude: number
			longitude: number
		}) => void,
	) => {
		if (scriptLoaded) {
			// The script has loaded successfully
			var element_wrap = null
			if (ref) {
				element_wrap = ref.current
			}
			// @ts-ignore
			new daum.Postcode({
				oncomplete: async function (data: any) {
					const geocoder = new (window as any).google.maps.Geocoder()
					geocoder.geocode(
						{ address: data.addressEnglish },
						function (results: any, status: any) {
							if (status == (window as any).google.maps.GeocoderStatus.OK) {
								fnc({
									address: data.address,
									latitude: results[0].geometry.location.lat(),
									longitude: results[0].geometry.location.lng(),
								})
							}
						},
					)
				},
				width: '100%',
				height: '100%',
			}).embed(element_wrap)
		} else if (scriptError) {
			console.error(scriptError)
		}
	}

	return {
		openPostCode,
	}
}

export default useLoadPostCode
