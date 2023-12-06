import Image from 'next/image'

import BackButton from '@/src/components/BackButton'
import EventTab from '@/src/components/EventTab'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<div className='flex items-center py-2.5 px-4 gap-2 font-bold'>
				<BackButton
					icon={
						<button>
							<Image
								src='/icons/arrow-left.svg'
								alt=''
								width={24}
								height={24}
							/>
						</button>
					}
				/>
				이벤트 행사관리
			</div>
			<div>
				<EventTab />
			</div>
			<div>{children}</div>
		</div>
	)
}
