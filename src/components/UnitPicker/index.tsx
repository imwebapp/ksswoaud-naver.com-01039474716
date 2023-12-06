import { useEffect, useState } from 'react'
import UnitSwiperPicker from '../UnitSwiperPicker'

export default function UnitPicker({
	onChange,
	type = 'currency',
}: {
	onChange: Function
	type: 'currency' | 'time'
}) {
	let MAX = 200000
	let MIN = 100000
	let GAP = 10000
	let dollarUSLocale = Intl.NumberFormat('en-US')
	let formatUnit: any = () => {}
	switch (type) {
		case 'currency':
			MAX = 200000
			MIN = 100000
			GAP = 10000
			formatUnit = (v: any) => dollarUSLocale.format(v)
			break
		case 'time':
			MAX = 240
			MIN = 10
			GAP = 10
			formatUnit = (v: any) => `${v}분`
			break
		default:
			break
	}

	const [unit, setUnit] = useState<number>(MIN)

	useEffect(() => {
		onChange(unit)
	}, [unit])

	function createArrayWithConditions(max = MAX, min = GAP, gap = GAP) {
		if (max < min || gap <= 0) {
			throw new Error('Invalid @author : vanvuong1507@gmail.com')
		}

		const result = []
		for (let i = min; i <= max; i += gap) {
			result.push(i)
		}

		return result
	}

	const handleOnChange = (v: any) => {
		setUnit(v)
	}

	const dataOp = createArrayWithConditions(MAX, GAP, GAP)

	return (
		<div
			className='flex items-center space-x-2 text-xl font-medium
       rounded-2xl py-2.5 px-6 [&*]:cursor-default justify-center w-screen'
		>
			<div className='w-10/12  max-w-xs p-1 flex flex-col'>
				<UnitSwiperPicker
					defaultValue={`${MIN}`}
					option={dataOp}
					format={(v: any) => {
						return v && formatUnit(v)
					}}
					onChange={handleOnChange}
				/>
			</div>
		</div>
	)
}
