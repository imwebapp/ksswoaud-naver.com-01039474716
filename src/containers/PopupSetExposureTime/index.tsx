import Dialog from '@/src/components/Dialog'
import Image from 'next/image'

const PopupSetExposureTime = ({
	open,
	onClose = () => {},
	handleSetting = () => {},
}: {
	open: boolean
	onClose: () => void
	handleSetting: Function
}) => {
	const items = [
		{ id: 1, value: '5', label: '5분 간격' },
		{ id: 2, value: '10', label: '10분 간격' },
		{ id: 3, value: '30', label: '30분 간격' },
		{ id: 4, value: '60', label: '1시간 간격' },
		{ id: 5, value: '120', label: '2시간 간격' },
		{ id: 6, value: '180', label: '3시간 간격' },
		{ id: 7, value: '360', label: '6시간 간격' },
	]
	const ButtonSetting = ({ item, key }: { item?: any; key?: any }) => {
		return (
			<button
				key={key}
				onClick={() => {
					onClose()
					handleSetting(item)
				}}
				className='w-full border rounded-3xl border-gray-300 py-3 font-medium'
			>
				{item.label}
			</button>
		)
	}
	return (
		<Dialog
			open={open}
			onClose={onClose}
			bottom
			fullWidth
			maxWidth='md'
			borderTop
		>
			<div className='h-[400px]'>
				<div className='w-full flex justify-between items-center px-3 py-3'>
					<p className='font-semibold text-lg'>광고 상단노출 시간설정</p>
					<p className='font-semibold text-lg' onClick={() => onClose()}>
						<Image src='/icons/ic-close.svg' width={24} height={24} alt='' />
					</p>
				</div>
				<div className='px-3  flex flex-col gap-3 py-5'>
					{items.map((v, idx) => {
						return <ButtonSetting key={idx} item={v} />
					})}
				</div>
			</div>
		</Dialog>
	)
}
export default PopupSetExposureTime
