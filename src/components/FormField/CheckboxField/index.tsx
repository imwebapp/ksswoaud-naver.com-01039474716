import React from 'react'
import { TiTick } from 'react-icons/ti'

interface CheckboxFieldProps {
	name: string
	label?: string | JSX.Element
	register: Function
	errors?: any
	type?: 'checkbox' | 'radio'
	defaultChecked?: boolean
	required?: boolean
	className?: string
	onClick?: Function
}

function CheckboxField(props: CheckboxFieldProps) {
	const {
		name,
		label = '',
		register,
		errors,
		required,
		defaultChecked,
		type = 'checkbox',
		className,
		onClick = () => {},
	} = props
	return (
		<>
			<div className='flex gap-3 px-2'>
				<label className='cursor-pointer label relative w-fit h-fit'>
					<input
						{...register(name, {
							...(required && { required: 'Field is required' }),
						})}
						onClick={onClick}
						name={name}
						type='checkbox'
						defaultChecked={defaultChecked}
						className='
							rounded-full 
							rounded
							appearance-none h-6 w-6 border
							checked:bg-[#2A5591]
							transition-all duration-200 peer
						'
					/>
					<div
						className={`rounded bottom-[5px] left-[1px]  h-6 w-6 absolute  pointer-events-none flex justify-center items-center
            peer-checked:border-green-300 rounded-full  ${className}`}
					>
						<TiTick color={'white'} size={'1.2em'} />
					</div>
				</label>
				<span className='label-text text-base text-[#000000] font-medium mr-2 text-start'>
					{label}
				</span>
			</div>

			{type !== 'checkbox' && errors[name] && (
				<p className={'mt-1 text-red-500'}>{errors[name]?.message}</p>
			)}
		</>
	)
}

export default CheckboxField
