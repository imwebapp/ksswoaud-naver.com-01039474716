import { HTMLAttributes, HTMLProps, ReactNode, useEffect, useRef } from 'react'
import Image from 'next/image'

import { classNames } from '@/src/utils/common'
import MaskedHoverEffect from '../../MaskedHoverEffect'
import { isEmpty } from 'lodash'

interface StoreInputFieldProps
	extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	value?: string
	label?: React.ReactNode
	row?: number
	expand?: boolean
	name?: string
}

export default function StoreInputField({
	label,
	row,
	expand,
	className,
	value,
	onClick,
	onChange,
	name,
	...props
}: StoreInputFieldProps) {
	const textareaRef = useRef(null)

	const autoResize = (e: any) => {
		const textarea = textareaRef.current || e.target
		textarea.style.height = 'auto'
		textarea.style.height = textarea.scrollHeight + 'px'
	}
	useEffect(() => {
		if (!isEmpty(textareaRef?.current)) {
			autoResize(textareaRef?.current)
		}
	}, [value, textareaRef])

	return (
		<div className='mb-8'>
			{label ? <StoreLabel>{label}</StoreLabel> : null}
			<MaskedHoverEffect w='100px'>
				<div className='text-xl font-medium relative'>
					{row ? (
						<textarea
							ref={textareaRef}
							name={name}
							rows={row}
							onChange={(e) => {
								autoResize(e)

								onChange && onChange(e)
							}}
							{...props}
							value={value}
							onClick={onClick}
							className={classNames(
								'rounded-xl px-3 py-2 w-full resize-none border',
								expand ? 'cursor-pointer pr-12' : null,
								className,
							)}
							readOnly={expand}
						/>
					) : (
						<StoreInput
							name={name}
							onChange={onChange}
							{...props}
							value={value}
							onClick={onClick}
							className={classNames(
								'rounded-xl px-3 py-2 w-full',
								expand ? 'cursor-pointer pr-12' : null,
								className,
							)}
							readOnly={expand}
						/>
					)}
					{expand ? (
						<Image
							src={`/icons/${value ? 'expand-active' : 'expand'}.svg`}
							alt=''
							width={30}
							height={30}
							className='absolute right-2 top-2'
						/>
					) : null}
				</div>
			</MaskedHoverEffect>
		</div>
	)
}

export const StoreInput = ({
	className,
	name,
	...props
}: HTMLProps<HTMLInputElement>) => {
	return (
		<input
			name={name}
			{...props}
			className={classNames(
				'rounded-xl px-3 py-2 w-full border border-[#E4E4E7]',
				className,
			)}
		/>
	)
}

export const StoreLabel = ({ children }: { children: ReactNode }) => {
	return (
		<div className='text-2xl text-[#1C1C28] font-bold mb-3'>{children}</div>
	)
}
