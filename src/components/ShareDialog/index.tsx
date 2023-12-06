import Dialog from '../Dialog'
import {
	FacebookShareButton,
	FacebookIcon,
	FacebookMessengerShareButton,
	FacebookMessengerIcon,
	TelegramShareButton,
	TelegramIcon,
	TwitterShareButton,
	TwitterIcon,
	WhatsappShareButton,
	WhatsappIcon,
	EmailShareButton,
	EmailIcon,
} from 'next-share'

interface ShareDialogProps {
	url: string
	open?: boolean
	onClose?: () => void
}

export default function ShareDialog({ open, onClose, url }: ShareDialogProps) {
	return (
		<Dialog
			open={!!open}
			bottom
			borderTop
			fullWidth
			maxWidth='md'
			onClose={onClose}
		>
			<div className='p-4 gap-2 flex overflow-auto'>
				<FacebookShareButton url={url}>
					<FacebookIcon size={40} round />
				</FacebookShareButton>
				<FacebookMessengerShareButton
					url={url}
					appId={''}
				>
					<FacebookMessengerIcon size={40} round />
				</FacebookMessengerShareButton>
				<TelegramShareButton url={url}>
					<TelegramIcon size={40} round />
				</TelegramShareButton>
				<TwitterShareButton url={url}>
					<TwitterIcon size={40} round />
				</TwitterShareButton>
				<WhatsappShareButton url={url}>
					<WhatsappIcon size={40} round />
				</WhatsappShareButton>
				<EmailShareButton url={url}>
					<EmailIcon size={40} round />
				</EmailShareButton>
			</div>
		</Dialog>
	)
}
