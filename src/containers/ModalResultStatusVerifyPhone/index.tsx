import Dialog from '@/src/components/Dialog'
import BackButton from '@/src/components/BackButton'
import Button from '@/src/components/Button'
import IconBack from '@/src/components/Icon/IconBack'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import UserApi from '@/src/services/User'
import { LOGIN_TYPE } from '@/src/constants'
const ModalResultStatusVerifyPhone = ({
	open,
	onClose = () => {},
	data = null,
}: {
	open: boolean
	onClose: () => void
	data?: any
}) => {
	const [info, setInfo] = useState()
	const [note, setNote] = useState('')
	const [type, setType] = useState('')
	const [dataPhone, setDataPhone] = useState<any>('')
	const router = useRouter()
	const flag = ''

	useEffect(() => {
		open &&
			UserApi.GET_LIST_USER({
				fields: ['$all'],
				filter: [
					{
						id: data?.id,
					},
				],
			}).then((res) => setDataPhone(res.results.objects.rows[0]))
	}, [data])

	useEffect(() => {
		if (data?.login_type === LOGIN_TYPE.GOOGLE) {
			setNote('SNS회원가입 하셨던 회원입니다.')
			setType(`google 로그인 아이디:${dataPhone && dataPhone?.username}`)
		} else {
			setNote('회원가입 하셨던 회원입니다.')
			setType(`아이디:${dataPhone && dataPhone?.username}`)
		}
	}, [dataPhone])
	return (
		<Dialog open={open} onClose={onClose} fullScreen fullWidth>
			<main className='text-center'>
				<div className='w-full text-start flex justify-start p-5 px-10'>
					<div onClick={onClose}>
						<IconBack />
					</div>
				</div>
				<div className='text-start px-4'>
					<p className='font-semibold'>전화 인증</p>
					<p className='text-[#6D727A]'>{data?.phone}</p>

					<p className='text-red-500'>{note}</p>
					<p>{type}</p>
				</div>
				<div className='mt-32'>
					<Button
						type={'submit'}
						className='text-sm px-3 w-full max-w-[350px]'
						onClick={() => {
							router.push('/login')
							onClose()
						}}
					>
						로그인 하러가기
					</Button>
				</div>
			</main>
		</Dialog>
	)
}

export default ModalResultStatusVerifyPhone
