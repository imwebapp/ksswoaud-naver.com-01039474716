import React, {
	FunctionComponent,
	ReactElement,
	ReactHTMLElement,
	useEffect,
	useRef,
	useState,
} from 'react'
import get from 'lodash/get'
import PrefixIcon from '../../PrefixIcon'
import SuffixIcon from '../../SuffixIcon'
import Image from 'next/image'

interface InputFieldProps {
	name: string
	type?: string
	label?: string
	placeholder?: string
	required?: boolean
	register: Function
	validations?: object
	errors: Record<string, any>
	prefixIcon?: ReactElement
	suffixIcon?: ReactElement
	resetField?: Function
	watch?: Function
	rounded?: string
	className?: string
	readOnly?: boolean | undefined
}

const InputField: FunctionComponent<InputFieldProps> = (props) => {
	const {
		name,
		type = 'text',
		label = '',
		placeholder = '',
		required,
		register,
		validations,
		errors,
		prefixIcon,
		suffixIcon,
		rounded,
		className,
		readOnly,
		resetField,
		watch = () => {},
		...rest
	} = props

	const fieldError = get(errors, name)
	const borderError = fieldError
		? 'focus:outline-none !border-[#FF5C5C] !text-[#FF5C5C] error'
		: 'focus:border-gray-900  text-[#18181B] focus:outline-none focus:border'

	const [showPAss, setShowpass] = useState(false)
	const IconEyePassword = () => {
		return (
			<div className='flex justify-center items-center'>
				{showPAss ? (
					<Image
						src={'/icons/eye.svg'}
						width={20}
						height={20}
						alt=''
						onClick={() => setShowpass(false)}
					/>
				) : (
					<Image
						src={'/icons/eye-slash.svg'}
						width={20}
						height={20}
						alt=''
						onClick={() => setShowpass(true)}
					/>
				)}
			</div>
		)
	}

	return (
		<>
			<div className='form-control'>
				<label className='label'>
					<p className='label-text font-semibold text-black text-start pr-2 mb-1'>
						{label}
						{/* {required && label && (
							<span className='label-text font-semibold text-red-500 ml-1'>
								*
							</span>
						)} */}
					</p>
				</label>
				<div className='flex flex-col w-full max-w-sm mx-auto  bg-white '>
					<div className='flex flex-col mb-2'>
						<div className='relative'>
							{prefixIcon && (
								<PrefixIcon icon={prefixIcon} error={fieldError} />
							)}
							<input
								{...register(name, {
									...(required && { required: 'Field is required' }),
									...validations,
								})}
								autoComplete='off'
								readOnly={readOnly}
								{...rest}
								type={type === 'password' ? (!showPAss ? type : 'text') : type}
								placeholder={placeholder}
								className={`peer text-base border h-[48px]  relative w-full outline-1 font-medium ${
									rounded ? 'rounded' : ' rounded-[10px]'
								}  placeholder-[#D4D4D8] placeholder-font-normal placeholder-text-base py-2 py-4 ${
									prefixIcon ? 'pl-[65px] pr-[30px]' : 'px-3'
								} w-[310px] ${className} ${borderError} ${
									readOnly ? 'bg-[#E4E4E7] ' : 'bg-[#F6F8FA]'
								} `}
							/>
							{type === 'password' && (
								<div className='absolute flex border border-transparent right-5 top-0 h-full w-10 mx-1'>
									<IconEyePassword />
								</div>
							)}

							{!readOnly && !suffixIcon && watch(name) && (
								<div
									className='absolute flex border border-transparent right-0 top-0 h-full w-10  '
									onClick={() => resetField && resetField(name)}
								>
									<Image
										src='/icons/Clear.svg'
										width={20}
										height={20}
										alt='image 1'
									/>
								</div>
							)}
							{suffixIcon && <SuffixIcon icon={suffixIcon} />}
						</div>
						{fieldError && (
							<p
								className={
									'mt-[15px] text-[#FF5C5C] text-sm text-left font-medium'
								}
							>
								{fieldError?.message}
							</p>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default InputField
