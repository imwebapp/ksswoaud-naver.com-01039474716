import { useEffect, useState } from 'react'
import Dialog from '../Dialog'
import { classNames } from '@/src/utils/common'
import TimePickerSwiper from '../TimePickerSwiper'

interface TimeShopDialog {
	open?: boolean
	onClose?: () => void
	onChange?: Function
}

export default function TimeShopDialog({
	open,
	onClose,
	onChange = () => {},
}: TimeShopDialog) {
	const [activeTime, setActiveTime] = useState(1)
	const [valueTimeStart, setValueTimeStart] = useState<any>(undefined)
	const [valueTimeEnd, setValueTimeEnd] = useState<any>(undefined)
	const [timePicker, setTimePicker] = useState<any>()
	const handleOnchange = (data: any) => {
		setTimePicker(data)
	}
	useEffect(() => {
		if (activeTime === 1) {
			setValueTimeStart(timePicker)
		} else {
			setValueTimeEnd(timePicker)
		}
	}, [activeTime, timePicker])

	return (
		<Dialog
			open={!!open}
			bottom
			borderTop
			fullWidth
			maxWidth='md'
			onClose={onClose}
		>
			<div>
				<p className='text-center border-b text-xl font-bold py-3'>운영시간</p>
				<div className='px-4'>
					<div className='flex my-8 items-center gap-3 justify-center'>
						<div onClick={() => setActiveTime(1)}>
							<WorkingTimeInput
								label='오픈시간'
								value={valueTimeStart}
								{...(activeTime === 1 ? { active: true } : '')}
							/>
						</div>
						<span>~</span>
						<div onClick={() => setActiveTime(2)}>
							<WorkingTimeInput
								label='마감시간'
								value={valueTimeEnd}
								{...(activeTime === 2 ? { active: true } : '')}
							/>
						</div>
					</div>
					<TimePickerSwiper onChange={handleOnchange} />
				</div>
				<div className='mx-4 my-8'>
					<button
						onClick={() => {
							onChange({
								timeStart: valueTimeStart || 0,
								timeEnd: valueTimeEnd || 0,
							})
							onClose && onClose()
						}}
						disabled={!valueTimeStart || !valueTimeEnd}
						className='text-xl font-bold py-4 w-full rounded-xl text-white
            bg-[linear-gradient(148deg,#5099FF_16.53%,#005BDB_84.41%)] disabled:bg-slate-50'
					>
						적용
					</button>
				</div>
			</div>
		</Dialog>
	)
}

interface WorkingTimeInputProps {
	label: string
	value?: string
	active?: boolean
}

const WorkingTimeInput = ({ label, value, active }: WorkingTimeInputProps) => {
	return (
		<div
			className={classNames(
				'border-b border-black px-4 py-2 w-full',
				active ? 'bg-black text-white' : 'bg-white',
			)}
		>
			<p
				className={classNames(
					'text-xs',
					active
						? 'bg-[linear-gradient(148deg,#5099FF_16.53%,#005BDB_84.41%)] bg-clip-text font-bold'
						: null,
				)}
				style={
					active
						? {
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
						  }
						: undefined
				}
			>
				오픈시간
			</p>
			<input
				className={classNames('rounded-t w-full bg-inherit')}
				readOnly
				value={value}
			></input>
		</div>
	)
}
