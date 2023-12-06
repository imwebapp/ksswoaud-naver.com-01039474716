'use client'

import { useState } from 'react'
import Dialog from '../Dialog'
import { convertLinkIframe } from '@/src/utils/common'

export interface PostLinkInputProps {
	open?: boolean
	onClose?: () => void
	value?: string
	onSubmit?: (link: string) => void
}

export default function PostLinkInput({
	open,
	onClose,
	onSubmit,
	...props
}: PostLinkInputProps) {
	const [value, setValue] = useState<string | undefined>(props.value)

	const handleSubmit = () => {
		onSubmit && value && onSubmit(value)
		onClose && onClose()
	}

	const handleClose = () => {
		setValue(props.value ?? undefined)
		onClose && onClose()
	}

	return (
		<Dialog open={!!open} onClose={handleClose} maxWidth='md' fullWidth>
			<div>
				<input
					placeholder='URL을 입력해주세요'
					className='p-2 text-xl w-full'
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				{value ? (
					<div className='flex justify-center'>
						<iframe src={convertLinkIframe(value)} width={502} height={250} />
					</div>
				) : null}
				<div className='flex border-t border-[#5099FF]'>
					<button
						className='text-[#5099FF] grow font-bold py-3 border-r border-black'
						onClick={handleSubmit}
					>
						취소
					</button>
					<button className='grow font-medium' onClick={handleClose}>
						확인
					</button>
				</div>
			</div>
		</Dialog>
	)
}
