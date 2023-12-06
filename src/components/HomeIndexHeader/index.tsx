import Image from 'next/image'
import Link from 'next/link'

import { Motion } from '../Motion'

export interface HomeIndexHeaderProps {
	title: string
	href: string
}

export default function HomeIndexHeader({ title, href }: HomeIndexHeaderProps) {
	return (
		<div className='flex justify-between p-4 border-b'>
			<p className='text-xl font-bold'>{title}</p>
			<Motion>
				<Link
					href={href}
					className='text-[#005BDB] font-medium flex items-center'
				>
					더 보기
					<Image
						src='/icons/arrow-right-blue.svg'
						alt=''
						width={20}
						height={20}
						className='inline-block'
					/>
				</Link>
			</Motion>
		</div>
	)
}
