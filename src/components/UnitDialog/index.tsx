import { useEffect, useState } from 'react'
import Dialog from '../Dialog'
import TimePicker from '../TimePicker'
import { classNames } from '@/src/utils/common'
import { listShopActions } from '@/src/stores/listShop/listShopSlice'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import UnitPicker from '../UnitPicker'

export default function UnitDialog({
	open,
	onClose,
	type,
	name,
	onChange,
	title,
}: {
	open?: any
	onClose?: any
	type?: any
	name?: any
	onChange?: any
	title?: any
}) {
	const [unit, setUnit] = useState()
	const handleUnitPick = (v: any) => {
		setUnit(v)
	}

	const handleSubmit = () => {
		onChange({ [`${name}`]: unit })
		onClose()
	}

	return (
		<Dialog open={!!open} bottom fullScreen fullWidth onClose={onClose}>
			<div>
				{title}

				<div className='px-4 flex justify-center items-center'>
					<div className='flex my-8 items-center gap-3 mx-auto'>
						<UnitPicker onChange={handleUnitPick} type={type} />
					</div>
				</div>
				<div className=' fixed bottom-0 left-0 w-screen px-4 py-3 mx-auto flex justify-center'>
					<button
						onClick={handleSubmit}
						className='text-xl rounded-3xl mx-auto font-bold py-4 w-full  text-white max-w-sm
            bg-[linear-gradient(148deg,#5099FF_16.53%,#005BDB_84.41%)]'
					>
						적용
					</button>
				</div>
			</div>
		</Dialog>
	)
}
