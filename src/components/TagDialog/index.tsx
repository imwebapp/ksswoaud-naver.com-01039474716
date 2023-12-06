import React, { ChangeEvent, useEffect, useState } from 'react'

import Dialog from '../Dialog'
import { find, isEmpty, some } from 'lodash'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/stores'
import FixedComponent from '../FixedComponent'

interface TagDialogProps {
	title?: string
	open: boolean
	onClose: () => void
	onChange?: (e: any) => void
	data?: { id: string; name: string }[]
	name?: string
	type?: any
}

export default function TagDialog({
	title,
	open,
	onClose,
	onChange = () => {},
	name,
	data,
}: TagDialogProps) {
	const shop = useSelector((state: RootState) => state.shop.store)

	const [listCardChoose, setListCardChoose] = useState<string[]>(
		shop?.tag_ids ?? [],
	)

	const pushListImage = (item: any) => {
		const newList = [...listCardChoose]
		const itemChecked = find(listCardChoose, { id: item.id })
		if (isEmpty(itemChecked)) {
			newList.push(item.id)
		} else {
			return
		}
		setListCardChoose(newList)
	}
	const shiftListImage = (item: any) => {
		const shiftList = [...listCardChoose].filter((v) => v !== item.id)
		setListCardChoose(shiftList)
	}

	useEffect(() => {
		onChange && onChange(listCardChoose)
	}, [listCardChoose])

	return (
		<Dialog
			open={open}
			onClose={onClose}
			bottom
			fullWidth
			maxWidth='md'
			borderTop
		>
			<div className='h-[100vh] max-h-[calc(100vh-100px)] py-5'>
				<p className='text-center py-3 text-xl font-bold'>{title}</p>
				<div className='px-4 py-5 pb-[100px]'>
					{data?.map((item, index) => (
						<label key={index} className='flex justify-between py-3 text-xl'>
							<span>{item.name}</span>
							<input
								type='checkbox'
								name={name}
								checked={
									!!listCardChoose.find((tag: string) => tag === item.id)
								}
								className='w-[22px] h-[22px]'
								onChange={(e) => {
									e.target.checked ? pushListImage(item) : shiftListImage(item)
								}}
							/>
						</label>
					))}
				</div>
				<FixedComponent>
					<div className='w-full py-3 pb-[15px] px-[15px] bg-white'>
						<button
							onClick={() => {
								onClose && onClose()
							}}
							className='rounded-[8px] text-white bg-[#1A70E7] w-full py-3 cursor-pointer disabled:bg-[#C9C9C9] max-w-[502px] mx-auto'
						>
							적용
						</button>
					</div>
				</FixedComponent>
			</div>
		</Dialog>
	)
}
