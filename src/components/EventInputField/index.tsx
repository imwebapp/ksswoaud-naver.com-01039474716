import { HTMLAttributes, forwardRef } from 'react'
import Image from 'next/image'

import { classNames } from '@/src/utils/common'

interface EventInputFieldProps
	extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	value?: string
	label?: React.ReactNode
	row?: number
	expand?: boolean
}

const EventInputField = forwardRef<HTMLInputElement, EventInputFieldProps>(
	({ label, row, expand, className, value, onClick, ...props }, ref) => {
		return (
			<div className='mb-8'>
				{label ? <div className='text-lg font-bold mb-4'>{label}</div> : null}
				<div className='text-lg font-medium relative'>
					<input
						{...props}
						ref={ref}
						value={value}
						onClick={onClick}
						className={classNames(
							'px-3 py-2 w-full border-2 border-[#E4E4E7]',
							expand ? 'cursor-pointer pl-10' : null,
							className,
						)}
						readOnly={expand}
					/>

					{expand ? (
						<Image
							src={'/icons/expand.svg'}
							alt=''
							width={30}
							height={30}
							className='absolute left-2 top-2'
						/>
					) : null}
				</div>
			</div>
		)
	},
)

EventInputField.displayName = 'EventInputField'
export default EventInputField
