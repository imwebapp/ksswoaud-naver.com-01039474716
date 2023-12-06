import { useState } from 'react'
import Image from 'next/image'

import Dialog from '../Dialog'
import { classNames } from '@/src/utils/common'
import { STATION_LIST } from '@/src/constants'

interface StationDialogProps {
	open: boolean
	line?: string
	station?: string
	onClose: () => void
	onSubmit?: (station: string, location: string) => void
}

export default function StationDialog({
	open,
	line,
	station,
	onClose,
	onSubmit,
}: StationDialogProps) {
	const [lineSelected, setLineSelected] = useState<string>(
		line ?? STATION_LIST[0].name,
	)
	const [stationSelected, setStationSelected] = useState<string | undefined>(
		station,
	)

	const handleChangeStation = (name: string) => {
		setLineSelected(name)
		setStationSelected(undefined)
	}

	const handleChangeLocation = (name: string) => {
		setStationSelected(name)
		onSubmit && onSubmit(lineSelected, name)
		onClose()
	}

	const dataList = STATION_LIST.find((item) => item.name === lineSelected)?.data

	return (
		<Dialog open={open} onClose={onClose} fullScreen maxWidth='md'>
			<div className=''>
				<button
					className='flex gap-2 items-center py-2.5 px-4'
					onClick={onClose}
				>
					<Image src='/icons/arrow-left.svg' alt='' width={24} height={24} />
					<span className='font-bold'>지역</span>
				</button>
				<div className='py-3 px-4 border-b'>
					<div className='flex border-t border-l border-black flex-wrap'>
						{STATION_LIST.map((item, index) => {
							const active = lineSelected === item.name
							return (
								<button
									key={index}
									className={classNames(
										'border-r border-b border-black py-2 font-medium  whitespace-nowrap',
										index === 0 || index === 1
											? 'basis-1/3'
											: index === 2 || index === 3
											? 'basis-1/6'
											: 'basis-1/2',
										active ? 'bg-black' : null,
									)}
									style={{ color: item.color }}
									onClick={() => handleChangeStation(item.name)}
								>
									{item.name}
								</button>
							)
						})}
					</div>
				</div>
				<div className='py-2.5 px-4 grid grid-cols-2'>
					{dataList?.map((item, index) => {
						const active = stationSelected === item
						return (
							<div
								key={index}
								className={classNames(
									'p-3 cursor-pointer',
									active ? 'bg-[#F86C3E] text-white' : null,
								)}
								onClick={() => handleChangeLocation(item)}
							>
								{item}
							</div>
						)
					})}
				</div>
			</div>
		</Dialog>
	)
}
