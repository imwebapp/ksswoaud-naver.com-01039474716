'use client'

import { useRef, useState, KeyboardEvent, useEffect, use } from 'react'

import { StoreInput } from '../StoreInputField'

export default function CreateStorePhoneInput({
	onChange,
	valueInput,
}: {
	onChange: Function
	valueInput?: string
}) {
	const [value, setValue] = useState('')

	const ref1 = useRef<HTMLInputElement>(null)
	const ref2 = useRef<HTMLInputElement>(null)
	const ref3 = useRef<HTMLInputElement>(null)

	const handleChangeValue = (string: string, index: number, length: number) => {
		if (string && !string.match(/^[0-9]+$/)) return
		let _value = value
		_value =
			_value.substring(0, index) + string + _value.substring(index + length)

		setValue(_value)
	}

	const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Backspace' && !event.currentTarget.value) {
			let _value = value
			_value = _value.slice(0, -1)
			setValue(_value)
			if (value.length < 5) {
				ref1.current?.focus()
			} else if (value.length < 9) {
				ref2.current?.focus()
			}
		} else {
			if (value.length === 4) {
				ref2.current?.focus()
			} else if (value.length === 8) {
				ref3.current?.focus()
			}
		}
	}

	useEffect(() => {
		if (valueInput) {
			setValue(valueInput)
		}
	}, [])

	useEffect(() => {
		onChange(value)
	}, [value])

	return (
		<div
			className='flex gap-3.5 [&>input]:py-2 [&>input]:text-center 
      [&>input]:rounded-xl [&>input]:border [&>input]:w-full text-xl '
		>
			<input
				type='text'
				ref={ref1}
				maxLength={4}
				placeholder='0101'
				value={value.substring(0, 4)}
				onChange={(e) => handleChangeValue(e.target.value, 0, 4)}
				onKeyUp={onKeyDown}
			/>
			<input
				type='text'
				ref={ref2}
				maxLength={4}
				placeholder='1234'
				value={value.substring(4, 8)}
				onChange={(e) => handleChangeValue(e.target.value, 4, 5)}
				onKeyUp={onKeyDown}
			/>
			<input
				type='text'
				ref={ref3}
				maxLength={4}
				placeholder='1234'
				value={value.substring(8, 12)}
				onChange={(e) => handleChangeValue(e.target.value, 8, 12)}
				onKeyUp={onKeyDown}
			/>
		</div>
	)
}
