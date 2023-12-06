import { useEffect, useState } from 'react'
import Image from 'next/image'

import { formatTwoDigit } from '@/src/utils/common'
import useOnWheel from '@/src/hooks/useOnWheel'

interface TimePickerProps {
	value?: string
	onChange?: (time: string) => void
}

const MAX_HOUR = 23
const MAX_MINUTE = 59

export default function TimePicker({ onChange }: { onChange: Function }) {
	const [hour, setHour] = useState<any>(0)
	const [minute, setMinute] = useState<any>(0)
	const {
		handleTouchMove: touchHour,
		handleTouchStart: touchHourStart,
		handleTouchEnd: touchHourEnd,
	} = useOnWheel()

	const {
		handleTouchMove: touchMinute,
		handleTouchStart: touchMinuteStart,
		handleTouchEnd: touchMinuteEnd,
	} = useOnWheel()

	const handleHourScroll = (e: React.WheelEvent<HTMLInputElement>) => {
		const newHour = hour + (e.deltaY > 0 ? 1 : -1)
		if (newHour >= 0 && newHour <= MAX_HOUR) {
			setHour(newHour)
		}
	}

	const handleMinuteScroll = (e: React.WheelEvent<HTMLInputElement>) => {
		const newMinute = minute + (e.deltaY > 0 ? 1 : -1)
		if (newMinute >= 0 && newMinute <= MAX_MINUTE) {
			setMinute(newMinute)
		}
	}

	useEffect(() => {
		onChange(`${formatTwoDigit(hour)}:${formatTwoDigit(minute)}`)
	}, [hour, minute])

	return (
		<div
			className='flex items-center space-x-2 text-xl font-medium
      border rounded-2xl py-2.5 px-6 [&*]:cursor-default justify-center'
		>
			<Image src={'/icons/double-arrow.svg'} alt='' height={34} width={10} />
			<div
				className='w-16 p-1 flex flex-col'
				onWheel={handleHourScroll}
				onTouchStart={touchHourStart}
				onTouchMove={(e) => {
					touchHour(e, (delY: any) => {
						const newHour = hour + (delY > 0 ? -1 : 1)
						if (newHour >= 0 && newHour <= MAX_HOUR) {
							setHour(newHour)
						}
					})
				}}
				onTouchEnd={touchHourEnd}
			>
				<span className='w-full h-full text-center outline-none text-[#D8D8D8] min-h-[1.75rem]'>
					{hour > 0 ? formatTwoDigit(hour - 1) : null}
				</span>
				<span className='w-full h-full text-center outline-none'>
					{formatTwoDigit(hour)}
				</span>
				<span className='w-full h-full text-center outline-none text-[#D8D8D8] min-h-[1.75rem]'>
					{hour < MAX_HOUR ? formatTwoDigit(hour + 1) : null}
				</span>
			</div>
			<span className='text-xl'>:</span>
			<div
				className='w-16 p-1 flex flex-col'
				onWheel={handleMinuteScroll}
				onTouchStart={touchMinuteStart}
				onTouchMove={(e) => {
					touchMinute(e, (delY: any) => {
						const newMinute = minute + (delY > 0 ? -1 : 1)
						if (newMinute >= 0 && newMinute <= MAX_MINUTE) {
							setMinute(newMinute)
						}
					})
				}}
				onTouchEnd={touchMinuteEnd}
			>
				<span className='w-full h-full text-center outline-none text-[#D8D8D8] min-h-[1.75rem]'>
					{minute > 0 ? formatTwoDigit(minute - 1) : null}
				</span>
				<span className='w-full h-full text-center outline-none'>
					{formatTwoDigit(minute)}
				</span>
				<span className='w-full h-full text-center outline-none text-[#D8D8D8] min-h-[1.75rem]'>
					{minute < MAX_MINUTE ? formatTwoDigit(minute + 1) : null}
				</span>
			</div>
			<Image src={'/icons/double-arrow.svg'} alt='' height={34} width={10} />
		</div>
	)
}
