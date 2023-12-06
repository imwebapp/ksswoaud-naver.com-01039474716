import { useEffect, useState } from 'react'
import Dialog from '../Dialog'
import TimePicker from '../TimePicker'
import { classNames } from '@/src/utils/common'

interface WorkingTimeDialogProps {
	open?: boolean
	onClose?: () => void
	onChange?: Function
}

export default function WorkingTimeDialog({
	open,
	onClose,
	onChange = () => {},
}: WorkingTimeDialogProps) {
	const [activeTime, setActiveTime] = useState(1)
	const [valueTimeStart, setValueTimeStart] = useState<any>(0)
	const [valueTimeEnd, setValueTimeEnd] = useState<any>(0)
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
					<div className='flex my-8 items-center gap-3'>
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
					<TimePicker onChange={handleOnchange} />
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
						className='text-xl font-bold py-4 w-full rounded-xl text-white
            bg-[linear-gradient(148deg,#5099FF_16.53%,#005BDB_84.41%)]'
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
