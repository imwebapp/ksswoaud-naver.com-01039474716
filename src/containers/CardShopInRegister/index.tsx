'use client'

import Tag from '@/src/components/Tag'
import { convertToKoreanTime } from '@/src/utils/common'
import { find, isEmpty } from 'lodash'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { TiTick } from 'react-icons/ti'

const IcTik = () => {
	return (
		<svg
			width='10'
			height='9'
			viewBox='0 0 10 9'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M0.800781 3.29922L5.00078 7.49922L9.20078 1.19922'
				stroke='white'
				strokeWidth='1.5'
				strokeLinecap='round'
			/>
		</svg>
	)
}

const CardAdsShop = ({ src }: { src: string }) => {
	return (
		<div className='w-[278px] h-[196px] relative'>
			<Image src={src} fill className='rounded-md absolute' alt='' />
		</div>
	)
}

const CardShopInRegister = ({
	data,
	setListCardChoose,
	name,
}: {
	data: any
	setListCardChoose: Function
	type?: string
	name?: string
}) => {
	const { tags, opening_hours } = data

	const inputRef = useRef(null)
	const pushListImage = (item: any) => {
		const newList = [item]
		setListCardChoose(newList)
	}

	const handleEvent = (el: any) => (func: any) => {
		if (el.current) {
			el.current.checked = true
			el.current.dispatchEvent(new Event('change'))
			func(data)
		}
	}

	return (
		<div
			className='max-w-[375px]  flex flex-col gap-3 my-3'
			onClick={() => {
				handleEvent(inputRef)(pushListImage)
			}}
		>
			<div className='flex justify-between  items-baseline'>
				<div className='flex justify-start  items-baseline gap-1 w-[80%] '>
					<p className='font-semibold text-[20px] break-all max-w-[75%] w-fit text-start'>
						{data?.title}
					</p>
					<p className='text-[16px] font-medium w-[50px]'>홈케어 </p>
				</div>
				<label className='cursor-pointer label relative w-fit h-fit'>
					<input
						ref={inputRef}
						name={name}
						type={'radio'}
						// className='text-lg w-[22px] h-[22px] checked:bg-red-500'
						className='
							rounded-full 
							appearance-none h-[22px] w-[22px] border border-black
							checked:bg-[#0063F7]
                            checked:border-0
							transition-all duration-200 peer
						'
					/>
					<div
						className={`rounded bottom-[11px] left-[6.5px]  h-fit w-fit absolute  pointer-events-none flex justify-center items-center
            peer-checked:border-green-300 `}
					>
						<IcTik />
					</div>
				</label>
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

export default CardShopInRegister
