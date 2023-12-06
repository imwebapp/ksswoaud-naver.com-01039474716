import ShareDialog from '@/src/components/ShareDialog'
import Image from 'next/image'
import { useState } from 'react'

interface ShareButtonProps {
	url?: string
	icon: string
}

export default function ShareButton({ url, icon }: ShareButtonProps) {
	const [openDialog, setOpenDialog] = useState(false)

	const shareData = {
		title: '',
		text: '',
		url: url || window.location.href,
	}

	const sharePost = async (e: any) => {
		e.preventDefault()
		const sharePromise = navigator as any
		if (sharePromise.canShare && sharePromise.canShare(shareData)) {
			await sharePromise.share(shareData)
		} else {
			setOpenDialog(true)
		}
	}
	return (
		<button
			onClick={sharePost}
			className='p-2 flex flex-row items-center gap-1'
		>
			<Image src={icon} width={24} height={24} alt='' />
			<ShareDialog
				open={openDialog}
				onClose={() => setOpenDialog(false)}
				url={window.location.href}
			/>
		</button>
	)
}
