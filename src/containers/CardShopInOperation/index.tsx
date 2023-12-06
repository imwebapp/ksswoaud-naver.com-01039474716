'use client'

import Tag from '@/src/components/Tag'
import { convertToKoreanTime } from '@/src/utils/common'
import { find, isEmpty } from 'lodash'
import Image from 'next/image'
import {  useState } from 'react'

const CardAdsShop = ({ src }: { src: string }) => {
	return (
		<div className='w-[278px] h-[196px] relative'>
			<Image src={src} fill className='rounded-md absolute' alt='' />
		</div>
	)
}

const CardShopInOperation = ({
	data,
	listCardChoose,
	setListCardChoose,
	type = 'checkbox',
	name,
}: {
	data: any
	listCardChoose: any
	setListCardChoose: Function
	type?: string
	name?: string
}) => {
	const { tags, opening_hours } = data

	const [checked, setChecked] = useState(false)

	const pushListImage = (item: any) => {
		const newList = [...listCardChoose]
		const itemChecked = find(listCardChoose, { id: item.id })
		if (isEmpty(itemChecked)) {
			newList.push(item)
		} else {
			return
		}
		setListCardChoose(newList)
	}
	const shiftListImage = (item: any) => {
		const shiftList = listCardChoose.filter((v: any) => v.id !== item.id)
		setListCardChoose(shiftList)
	}

	return (
		<div
			className='max-w-[375px]  flex flex-col gap-3 my-3 mx-[15px]'
			onClick={() => {
				const ite = find(listCardChoose, data)
				if (ite) {
					shiftListImage(data)
					setChecked(false)
				} else {
					pushListImage(data)
					setChecked(true)
				}
			}}
		>
			<div className='flex justify-between  items-baseline'>
				<div className='flex justify-start  items-baseline gap-1 w-[80%] '>
					<p className='font-semibold text-[20px] break-all max-w-[75%] w-fit text-start'>
						{data?.title}
					</p>
					<p className='text-[16px] font-medium w-[50px]'>홈케어 </p>
				</div>
				<input
					name={name}
					type={type}
					className='text-lg w-[22px] h-[22px]'
					checked={checked}
					onChange={(e) => {
						e.target.checked ? pushListImage(data) : shiftListImage(data)
					}}
				/>
			</div>
			<div className='overflow-auto  no-scrollbar flex gap-3'>
				<div className='flex gap-3'>
					{data?.images?.map((v: any, idx: any) => {
						return <CardAdsShop key={idx} src={v} />
					})}
				</div>
			</div>
			<div className=''>
				<button className='rounded-3xl w-full bg-[#F6F8FA] text-black flex justify-start items-center gap-2 py-3 px-2 '>
					<div className='bg-white py-2  rounded-3xl font-semibold'>
						영업 중
					</div>
					<p className='font-semibold'>{convertToKoreanTime(opening_hours)}</p>
				</button>
			</div>
			<div className='flex justify-start items-center gap-2 flex-wrap'>
				{tags?.map((v: any, i: any) => {
					return (
						<Tag
							key={i}
							title={v?.tag?.name}
							color='text-[#71717A]'
							bg='bg-[#F6F8FA]'
							rounded='rounded-md'
							size={'text-[12px]'}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default CardShopInOperation
