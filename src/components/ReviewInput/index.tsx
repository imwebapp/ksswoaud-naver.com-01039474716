'use client'

import { forwardRef } from 'react'
import Image from 'next/image'
import { useState } from 'react'

import { classNames } from '@/src/utils/common'
import LockIcon from '../Icon/LockIcon'
import LockCloseIcon from '../Icon/LockCloseIcon'

interface ReviewInputProps {
	onSubmit?: (value: string) => void
	black?: boolean
	isPrivate?: boolean
	onClickPrivate?: () => void
}

const ReviewInput = forwardRef<HTMLInputElement, ReviewInputProps>(
	({ onSubmit, black, isPrivate, onClickPrivate }, ref) => {
		const [value, setValue] = useState<string>()

		const handleSubmit = async () => {
			setValue('')
			if (value) {
				if (onSubmit) {
					onSubmit(value)
				}
			}
		}

		return (
			<div>
				<div className='flex gap-2 items-center'>
					<button
						onClick={onClickPrivate}
						className={black ? 'text-white' : 'text-black'}
					>
						{isPrivate ? <LockCloseIcon /> : <LockIcon />}
					</button>
					<input
						ref={ref}
						className={classNames(
							'rounded-[100px] border p-3 grow',
							black ? 'bg-black' : 'none',
						)}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder='글 입력...'
					/>
					<button disabled={!value} onClick={handleSubmit}>
						<Image src='/icons/send.svg' alt='' width={24} height={24} />
					</button>
				</div>
			</div>
		)
	},
)

ReviewInput.displayName = 'Review Input'

export default ReviewInput
