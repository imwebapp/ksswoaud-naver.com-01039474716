import { classNames } from '@/src/utils/common'
import Image from 'next/image'

interface AvatarProps {
	size?: 'sm' | 'md' | 'lg'
	url?: string
}

const AVATAR_SIZE = {
	sm: 'w-11 min-w-[44px] h-11',
	md: 'w-[66px] min-w-[66px] h-[66px]',
	lg: 'w-[100px] min-w-[100px] w-[100px',
}

export default function Avatar({ size = 'md', url }: AvatarProps) {
	return (
		<div
			className={classNames(
				AVATAR_SIZE[size],
				'relative rounded-full overflow-hidden',
			)}
		>
			<Image
				src={url ?? '/images/avatar.png'}
				alt=''
				fill
				className='object-cover'
			/>
		</div>
	)
}
