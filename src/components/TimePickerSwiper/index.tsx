import Image from 'next/image'
import { useEffect, useState } from 'react'
import NumberSwiper from '../NumberSwiper'

const MAX_HOUR = 23
const MAX_MINUTE = 59

export interface TimePickerSwiperProps {
	onChange: (v: any) => void
	hour?: number
	min?: number
}

const TimePickerSwiper = ({ onChange, ...props }: TimePickerSwiperProps) => {
	const [hour, setHour] = useState<any>(props.hour ?? 0)
	const [minute, setMinute] = useState<any>(props.min ?? 0)

	const handlePickHour = (v: any) => {
		setHour(v)
	}

	const handlePickMinute = (v: any) => {
		setMinute(v)
	}

	useEffect(() => {
		onChange(`${hour}:${minute}`)
	}, [hour, minute])

	return (
		<div
			className='flex items-center space-x-2 text-xl font-medium
      border rounded-2xl py-2.5 px-6 [&*]:cursor-default justify-center'
		>
			<Image src={'/icons/double-arrow.svg'} alt='' height={34} width={10} />
			<NumberSwiper
				onChange={handlePickHour}
				option={Array.from({ length: MAX_HOUR + 1 }, (value, index) => {
					return String(index).padStart(2, '0')
				})}
			/>
			<NumberSwiper
				onChange={handlePickMinute}
				option={Array.from({ length: 59 + 1 }, (value, index) => {
					return String(index).padStart(2, '0')
				})}
			/>
			<Image src={'/icons/double-arrow.svg'} alt='' height={34} width={10} />
		</div>
	)
}

export default TimePickerSwiper
