'use client'

import Button from '@/src/components/Button'
import IconAdult from '@/src/components/Icon/IconAdult'
import Section from '@/src/components/Section'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const AdultCertification = () => {
	const router = useRouter()
	return (
		<main className='text-center'>
			<Section className='py-10 flex flex-col gap-5 '>
				<div className='flex flex-col justify-center items-center gap-5 py-5'>
					<IconAdult />
					<div className='px-8 text-base text-black font-semibold'>
						<p>
							본 정보 내용은 청소년 유해매체물로서 정보통신망 이용 촉진 및 정보
							보호 등에 관한 법률 및 청소년보호법의 규정에 의하여 만 19세 미만의
							청소년이 이용할 수 없습니다.
						</p>
					</div>
					<div>
						<Button
							className='text-base rounded-2xl px-5'
							rounded='rounded-3xl'
						>
							<p className='text-base  '> 19세미만 나가기</p>
						</Button>
					</div>
				</div>
				<div className='w-full h-1 bg-gray-400'></div>
				<div className='flex flex-col justify-center items-center gap-5 w-full'>
					<div className='flex flex-col gap-5 w-full px-5 py-5'>
						<p className='font-semibold'>성인접속 절차</p>
						<Button
							onClick={() => router.push(`/login?adult='true'`)}
							className='rounded-2xl bg-green-500'
							rounded={'rounded-3xl'}
						>
							<div className='flex justify-center items-strech gap-5 w-full'>
								<Image src={'/icons/user.svg'} width={24} height={24} alt='' />
								<p> 기존회원 로그인</p>
							</div>
						</Button>
						<Button
							onClick={() => router.push(`/adult-certification/certification/`)}
							className='rounded-2xl bg-purple-700'
							rounded={'rounded-3xl'}
						>
							<div className='flex justify-center items-strech gap-5 w-full'>
								<Image
									src={'/icons/user-tick.svg'}
									width={24}
									height={24}
									alt=''
								/>
								<p> 기존회원 로그인</p>
							</div>
						</Button>
					</div>
				</div>
			</Section>
		</main>
	)
}

export default AdultCertification
