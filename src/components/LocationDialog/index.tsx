import { useEffect, useState } from 'react'
import Image from 'next/image'

import Dialog from '../Dialog'
import { classNames } from '@/src/utils/common'
import { LOCATION_LIST } from '@/src/constants'

interface LocationDialogProps {
	open: boolean
	province?: string
	district?: string
	onClose: () => void
	onSubmit?: (province: string, district: string) => void
}

export default function LocationDialog({
	open,
	onClose,
	onSubmit,
	...props
}: LocationDialogProps) {
	const [province, setProvince] = useState(
		props.province ?? LOCATION_LIST[0].name,
	)
	const [district, setDistrict] = useState<string | undefined>(props.district)

	const data = LOCATION_LIST.find((item) => item.name === province)?.data

	const handleChangeProvince = (province: string) => {
		setProvince(province)
		setDistrict(undefined)
	}

	const handleChangeDistrict = (name: string) => {
		setDistrict(name)
		onSubmit && onSubmit(province, name)
		onClose()
	}

	const [listData, setListData] = useState<any>([])

	const convertData = () => {
		let newData = []
		const length = Math.ceil(LOCATION_LIST.length / 3)

		for (let index = 0; index < length; index++) {
			let data: any = []
			if (index * 3 < LOCATION_LIST.length) {
				data.push(LOCATION_LIST[index * 3])
			}
			if (index * 3 + 1 < LOCATION_LIST.length) {
				data.push(LOCATION_LIST[index * 3 + 1])
			}
			if (index * 3 + 2 < LOCATION_LIST.length) {
				data.push(LOCATION_LIST[index * 3 + 2])
			}
			newData.push(data)
		}
		setListData(newData)
	}

	useEffect(() => {
		convertData()
	}, [])

	return (
		<Dialog open={open} onClose={onClose} fullScreen maxWidth='md'>
			<div className='py-2.5 px-4'>
				<button className='flex gap-2 items-center' onClick={onClose}>
					<Image src='/icons/arrow-left.svg' alt='' width={24} height={24} />
					<span className='font-bold'>지역</span>
				</button>
				<div className='mt-6'>
					<div>
						{listData.map((item: any, index: any) => (
							<>
								<div className='border border-black rounded-[10px] grid grid-cols-3 mt-2'>
									{item.map((itemChild: any, i: any) => (
										<Tab
											key={i}
											active={province === itemChild.name}
											onClick={() => handleChangeProvince(itemChild.name)}
										>
											{itemChild.name}
										</Tab>
									))}
								</div>
							</>
						))}
					</div>
					<div className='flex gap-6 flex-col mt-4'>
						{data?.map((item, index) => {
							const active = district === item
							return (
								<div
									key={index}
									className='cursor-pointer flex justify-between'
									onClick={() => handleChangeDistrict(item)}
								>
									<span
										className={classNames(
											active ? 'text-[#0162F2]' : 'text-[#272B30]',
										)}
									>
										{item}
									</span>
									{active ? (
										<Image
											src='/icons/check.svg'
											alt=''
											width={24}
											height={24}
										/>
									) : null}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</Dialog>
	)
}

interface TabProps {
	children?: React.ReactNode
	active?: boolean
	onClick?: () => void
}

const Tab = ({ children, active, onClick }: TabProps) => {
	return (
		<button
			className={classNames(
				'grow py-2 font-medium rounded-[10px]',
				active ? 'bg-black text-white' : null,
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
