import Image from 'next/image'

const InfomationCardID = () => {
	return (
		<div className='text-sm flex flex-col gap-3 '>
			<p className='font-bold text-start'>｢청소년 보호법 시행령｣ 제17조에 따른 나이 및 본인여부 확인 기능</p>
			<div className='relative w-fit  flex flex-col items-center gap-3 border border-[#E4E4E7] rounded-xl py-3 bg-[#F6F8FA] '>
				<Image
					src='/images/ID-card.svg'
					height={208}
					width={319}
					alt='id-card'
				/>
				<div className='flex flex-col gap-2 px-3 text-start'>
					<p className='flex justify-start items-center gap-2'>
						<span>
							<Image
								src={'/icons/star.svg'}
								width={16}
								height={15}
								alt='start'
							/>
						</span>
						주민번호{' '}
						<span className='text-purple-500'>
							뒷번호는 가리고 첨부바랍니다.
						</span>
					</p>
					<p className='flex justify-start items-start gap-2'>
						<span>
							<Image
								src={'/icons/star.svg'}
								width={16}
								height={15}
								alt='start'
							/>
						</span>
						생년월일 앞6자와 이름만 확인하니, 다른 정보는 가려주세요.
					</p>
				</div>
			</div>
		</div>
	)
}

export default InfomationCardID
