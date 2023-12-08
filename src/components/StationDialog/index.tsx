import { useEffect, useState } from 'react'
import Image from 'next/image'

import Dialog from '../Dialog'
import { classNames } from '@/src/utils/common'
import { STATION_LIST } from '@/src/constants'

interface StationDialogProps {
	open: boolean
	location?: string
	line?: string
	station?: string
	onClose: () => void
	onSubmit?: (location: string, line: string, station: string) => void
}

export default function StationDialog({
	open,
	location,
	line,
	station,
	onClose,
	onSubmit,
}: StationDialogProps) {
	const [locationSelected, setLocationSelected] = useState<any>()
	const [lineSelected, setLineSelected] = useState<any>()
	const [stationSelected, setStationSelected] = useState<any>()
	const [step, setStep] = useState(1)
	const [title, setTitle] = useState('')

	const handleChangeLocation = (index: number) => {
		setLocationSelected(index)
		setStationSelected(undefined)
		setLineSelected(undefined)
		setStep(2)
		setTitle(STATION_LIST[index].name)
	}

	const handleChangeLine = (index: number) => {
		setLineSelected(index)
		setStationSelected(undefined)
		setStep(3)
		setTitle(STATION_LIST[locationSelected].stationLineList[index].name)
	}

	const handleChangeSubway = (index: number) => {
		setStationSelected(index)
		onSubmit &&
			onSubmit(
				STATION_LIST[locationSelected].name,
				STATION_LIST[locationSelected].stationLineList[lineSelected].name,
				STATION_LIST[locationSelected].stationLineList[lineSelected]
					.stationSubwayList[index],
			)
		onClose()
	}

	const convertData = (values: any) => {
		const length = Math.ceil(values.length / 3)

		let newData = []
		for (let index = 0; index < length; index++) {
			let data: any = []
			if (index * 3 < values.length) {
				data.push(values[index * 3])
			}
			if (index * 3 + 1 < values.length) {
				data.push(values[index * 3 + 1])
			}
			if (index * 3 + 2 < values.length) {
				data.push(values[index * 3 + 2])
			}
			newData.push(data)
		}
		return newData
	}

	const _onClose = () => {
		const newStep = step - 1
		if (newStep < 1) onClose()
		setStep(newStep)
		switch (newStep) {
			case 1:
				setTitle(STATION_LIST[locationSelected].name)
				break
			case 2:
				setTitle(
					STATION_LIST[locationSelected].stationLineList[lineSelected].name,
				)
				break
			default:
				break
		}
	}

	const LocationSubwayWidget = () => {
		return (
			<table className='w-full'>
				<tbody>
					{convertData(STATION_LIST).map((items: any, index: number) => {
						return (
							<tr key={index} className='w-[10px]'>
								{items.map((item: any, i: number) => {
									const active = locationSelected === index * 3 + i
									return (
										<>
											<td
												onClick={() => handleChangeLocation(index * 3 + i)}
												className={classNames(
													'border text-center w-[33.3333%] py-4 text-base font-medium',
													active ? 'bg-black' : null,
													active ? 'text-white' : 'text-black',
												)}
											>
												{item.name}
											</td>
										</>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		)
	}
	const LineSubwayWidget = () => {
		return (
			<table className='w-full'>
				<tbody>
					{convertData(STATION_LIST[locationSelected].stationLineList).map(
						(items: any, index: number) => {
							return (
								<tr key={index} className='w-[10px]'>
									{items.map((item: any, i: number) => {
										const active = lineSelected === index * 3 + i
										console.log('item.color', item.color)

										return (
											<>
												<td
													onClick={() => handleChangeLine(index * 3 + i)}
													className={classNames(
														'border border-l-[10px] text-center w-[33.3333%] py-4 text-base font-medium',
														active ? 'text-white' : 'text-black',
													)}
													style={{
														borderLeftColor: item.color,
														background: active ? item.color : 'white',
													}}
												>
													{item.name}
												</td>
											</>
										)
									})}
								</tr>
							)
						},
					)}
				</tbody>
			</table>
		)
	}
	const StationSubwayWidget = () => {
		return (
			<table className='w-full'>
				<tbody>
					{convertData(
						STATION_LIST[locationSelected].stationLineList[lineSelected]
							.stationSubwayList,
					).map((items: any, index: number) => {
						return (
							<tr key={index} className='w-[10px]'>
								{items.map((item: any, i: number) => {
									const active = stationSelected === index * 3 + i
									return (
										<>
											<td
												onClick={() => handleChangeSubway(index * 3 + i)}
												className={classNames(
													'border text-center w-[33.3333%] py-4 text-base font-medium',
													active ? 'bg-black' : null,
													active ? 'text-white' : 'text-black',
												)}
											>
												{item}
											</td>
										</>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		)
	}

	const Header = () => {
		return (
			<div className='flex flex-row justify-between items-center border-b-[4px] '>
				<button
					className='flex gap-2 items-center py-2.5 px-4'
					onClick={_onClose}
				>
					<Image src='/icons/arrow-left.svg' alt='' width={24} height={24} />
					<span className='font-bold'>지역</span>
				</button>
				<span className='font-bold text-black'>{title}</span>
				<div className='w-[94px]'></div>
			</div>
		)
	}

	return (
		<Dialog open={open} onClose={onClose} fullScreen maxWidth='md'>
			<Header />
			{step === 1 && <LocationSubwayWidget />}
			{step === 2 && <LineSubwayWidget />}
			{step === 3 && <StationSubwayWidget />}
		</Dialog>
	)
}
