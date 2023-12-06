import React, { ChangeEvent, useState } from 'react'

import Dialog from '../Dialog'

interface PostCategoryDialogProps {
	title?: string
	open: boolean
	onClose: () => void
	onChange?: (e: any) => void
	data?: { id: string; name: string }[]
	name?: string
	type?: any
	value?: string
}

export default function PostCategoryDialog({
	title,
	open,
	onClose,
	onChange = () => {},
	name,
	data,
	value,
}: PostCategoryDialogProps) {
	const handleRadioChange = (e: any) => {
		onChange(e)
		onClose && onClose()
	}

	const handleClose = () => {
		onClose()
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			bottom
			fullWidth
			maxWidth='md'
			borderTop
		>
			<div className='h-[100vh] max-h-[calc(100vh-100px)]'>
				<p className='text-center py-3 text-xl font-bold'>{title}</p>
				<div className='px-4'>
					{data?.map((item, index) => (
						<label key={index} className='flex justify-between py-3 text-xl'>
							<span>{item.name}</span>
							<input
								type='radio'
								name={name}
								value={JSON.stringify(item)}
								checked={value === item.id}
								onChange={handleRadioChange}
							/>
						</label>
					))}
				</div>
			</div>
		</Dialog>
	)
}
