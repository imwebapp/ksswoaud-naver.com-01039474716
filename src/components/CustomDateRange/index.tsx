'use client'

import { useState } from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import Dialog from '../Dialog'

export interface CustomDateRangePickerProps {
	open?: boolean
	onClose?: () => void
	ranges: Range[]
	onChange?: (value: Range) => void
}

export default function CustomDateRangePicker({
	ranges,
	onChange,
	open,
	onClose,
}: CustomDateRangePickerProps) {
	const [selectedRanges, setSelectedRanges] = useState<Range>(ranges[0])

	const handleApply = () => {
		if (onChange) {
			onChange(selectedRanges)
			if (onClose) onClose()
		}
	}

	const handleCancel = () => {
		setSelectedRanges(ranges[0])
		if (onClose) {
			onClose()
		}
	}

	return (
		<Dialog open={!!open} onClose={onClose}>
			<DateRange
				editableDateInputs={true}
				onChange={(range) => setSelectedRanges(range.selection)}
				moveRangeOnFirstSelection={false}
				ranges={[selectedRanges]}
				fixedHeight
				showDateDisplay={false}
				displayMode='dateRange'
			/>
			<div className='flex font-semibold p-3 border-t gap-2'>
				<button
					className='grow py-2 text-[#696F8C] border rounded'
					onClick={handleCancel}
				>
					취소
				</button>
				<button
					className='grow py-2 text-white rounded bg-[#06F]'
					onClick={handleApply}
				>
					적용
				</button>
			</div>
		</Dialog>
	)
}
