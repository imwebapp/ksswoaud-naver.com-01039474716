import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const usePhone = ({ setValue }: { setValue: Function }) => {
	const searchParams = useSearchParams()
	const phoneOtp = searchParams.get('phone')
	const codeCountry = searchParams.get('code')
	const status = searchParams.get('status')

	useEffect(() => {
		if (phoneOtp && status === 'done') {
			setValue('phone', `${phoneOtp}`)
		}
	}, [phoneOtp, codeCountry, status])
	return
}

export default usePhone
