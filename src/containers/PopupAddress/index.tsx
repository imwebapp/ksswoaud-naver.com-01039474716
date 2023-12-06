import Dialog from '@/src/components/Dialog'
import useLoadPostCode from '@/src/hooks/useLoadPostCode'
import { useEffect, useRef } from 'react'

const IconClose = () => {
	return (
		<svg
			width='16'
			height='15'
			viewBox='0 0 16 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M1.63574 13.8652L14.3637 1.13731'
				stroke='black'
				strokeWidth='1.5'
				strokeLinecap='round'
			/>
			<path
				d='M14.3638 13.8652L1.63585 1.13731'
				stroke='black'
				strokeWidth='1.5'
				strokeLinecap='round'
			/>
		</svg>
	)
}

const PopupAddress = ({
	open = false,
	onClose,
	onChange = () => {},
}: {
	open?: boolean
	onClose: () => void
	onChange?: (data: {
		address: string
		latitude: number
		longitude: number
	}) => void
}) => {
	const testRef = useRef(null)
	const { openPostCode } = useLoadPostCode(testRef)

	useEffect(() => {
		open &&
			openPostCode((data) => {
				onChange && onChange(data)
				onClose && onClose()
			})
	}, [open])

	return (
		<Dialog open={open} onClose={onClose} fullScreen fullWidth>
			<div className='max-w-[502px] mx-auto'>
				<div className='pb-4 px-4 pt-1'>
					<div onClick={onClose}>
						<IconClose />
					</div>
				</div>
				<hr />
				<div ref={testRef} className='h-screen daum-post'></div>
			</div>
		</Dialog>
	)
}

export default PopupAddress
