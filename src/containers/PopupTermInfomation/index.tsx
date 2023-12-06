import Button from '@/src/components/Button'
import Dialog from '@/src/components/Dialog'
import FixedComponent from '@/src/components/FixedComponent'
import { TYPE_COMPANY_INFO } from '@/src/constants'
import { RootState } from '@/src/stores'
import { useSelector } from 'react-redux'

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

const TYPE = [
	{
		label: '이용약관',
		type: TYPE_COMPANY_INFO.TERM_OF_SERVICE,
	},
	{
		label: '개인정보처리방침',
		type: TYPE_COMPANY_INFO.POLICY,
	},
	{
		label: '위치정보 이용약관',
		type: TYPE_COMPANY_INFO.LOCATION_BASE_SERVICES,
	},
	{
		label: '사업자정보 확인하기',

		// type: TYPE_COMPANY_INFO.COMPANY_INPFO,
	},
]

const PopupTermInfomation = ({
	open = false,
	onClose = () => {},
	typeCompany = '',
}: {
	open: boolean
	onClose: () => void
	typeCompany?: string
}) => {
	const dataContent = useSelector((state: RootState) => state.content.data)
	const getContent: any = dataContent.filter(
		(v: any) => v?.type === typeCompany,
	)[0]
	const title = TYPE.filter((v) => v.type === typeCompany)[0]?.label

	return (
		<Dialog open={open} onClose={onClose} fullScreen fullWidth>
			<div className='text-center max-w-[502px] mx-auto px-[30px] py-3 pb-[100px]'>
				<div className='flex justify-between items-center mb-5'>
					<p className='text-[18px] font-semibold'>{title}</p>
					<div onClick={onClose}>
						<IconClose />
					</div>
				</div>
				<div>
					{getContent?.content && (
						<div
							className='text-start font-medium text-[14px]'
							dangerouslySetInnerHTML={{
								__html: getContent?.content,
							}}
						></div>
					)}
				</div>
				<FixedComponent>
					<div className='p-[15px] bg-white z-[50]'>
						<Button className='mt-2' onClick={onClose}>
							닫기
						</Button>
					</div>
				</FixedComponent>
			</div>
		</Dialog>
	)
}

export default PopupTermInfomation
