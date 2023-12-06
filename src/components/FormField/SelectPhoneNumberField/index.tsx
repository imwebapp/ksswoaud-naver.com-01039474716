import { get } from 'lodash'
import { ReactElement } from 'react'
import PrefixIcon from '../../PrefixIcon'
import Image from 'next/image'
import SuffixIcon from '../../SuffixIcon'
import DropdownFlag from './DropdownFlag'

interface InputFieldProps {
	name: string
	type?: string
	label?: string
	placeholder?: string
	required?: boolean
	register: Function
	setValue: Function
	validations?: object
	errors: Record<string, any>
}

const SelectPhoneNumberField: React.FC<InputFieldProps> = (props) => {
	const {
		name,
		type = 'text',
		label = '',
		placeholder = '',
		required,
		register,
		setValue,
		validations,
		errors,
		...rest
	} = props

	const fieldError = get(errors, name)
	const borderError = fieldError
		? 'focus:outline-none border-red-500'
		: 'focus:border-[#D7EAFA] focus:outline-none focus:border'

	return (
		<>
			<div className='form-control'>
				<label className='label'>
					<p className='label-text font-semibold text-black'>
						{required && label && (
							<span className='label-text font-semibold text-red-500 ml-1'>
								*
							</span>
						)}
					</p>
				</label>
				<div className='flex flex-col w-full max-w-sm mx-auto  bg-white'>
					<div className='flex flex-col mb-2'>
						<div className='relative'>
							{/* <PrefixIcon
                icon={
                  <div className="flex justify-center items-center gap-2 px-2">
                    <Image
                      src={"/icons/kr.svg"}
                      width={32}
                      height={24}
                      alt=""
                    />
                    <p className="text-sm">+82</p>
                  </div>
                }
              /> */}
							<DropdownFlag register={register} onChange={setValue} />
							<input
								{...register(name, {
									...(required && { required: 'Field is required' }),
									...validations,
								})}
								{...rest}
								type='number'
								placeholder='전화 번호'
								className={`text-sm sm:text-base bg-[#F6F8FA] relative w-full outline-1 border border-[#EAEFF3] rounded-[10px] placeholder-gray-400 py-2 pr-2 pl-24 py-4 focus:border-[#D7EAFA] ${borderError} `}
							/>
							<SuffixIcon />
						</div>
					</div>
					{fieldError && (
						<p className={'mt-1 text-red-500 text-sm text-left'}>
							{fieldError?.message}
						</p>
					)}
				</div>
			</div>
		</>
	)
}

export default SelectPhoneNumberField
