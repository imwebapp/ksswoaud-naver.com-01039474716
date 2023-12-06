import {
	HTMLAttributes,
	ReactNode,
	useState,
	ChangeEvent,
	useRef,
	useEffect,
} from 'react'
import Image from 'next/image'
import FileApi from '@/src/services/File'
import { classNames } from '@/src/utils/common'

interface StoreInputFieldProps
	extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	label?: any
	row?: any
	expand?: any
	className?: any
	value?: any
	onClick?: any
	onChange?: any
	name?: any
}

export default function StoreUploadAvatarStaff({
	label,
	row,
	expand,
	className,
	value,
	onClick,
	onChange,
	name,
	...props
}: StoreInputFieldProps) {
	const [previewCover, setPreviewCover] = useState<{
		src: File | null
		url: string
	} | null>(null)

	const inputRef = useRef<HTMLInputElement | null>(null)

	const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event?.target?.files?.[0] || null

		setPreviewCover({
			src: file,
			url: file ? URL.createObjectURL(file) : '',
		})
	}

	useEffect(() => {
		if (previewCover) {
			FileApi.uploadFile(previewCover.src).then((res) => {
				onChange &&
					onChange({
						url: res.url,
					})
			})
		}
	}, [previewCover])

	return (
		<div className='mb-8'>
			{label ? <StoreLabel>{label}</StoreLabel> : null}
			<div
				className='w-24 h-24 rounded-full border flex justify-center items-center relative pointer '
				onClick={() => inputRef.current && inputRef.current.click()}
			>
				{previewCover ? (
					<div className='absolute w-24 h-24 rounded-full overflow-hidden z-20 '>
						<Image
							src={previewCover.url || value}
							layout='fill'
							objectFit='cover'
							alt='avatar'
						/>
					</div>
				) : null}

				<input
					ref={inputRef}
					className={classNames(
						'hidden rounded-full px-3 py-2 w-[100px] h-[100px] border border-[#E4E4E7]',
						className,
					)}
					type='file'
					onClick={onClick}
					readOnly={expand}
					onChange={handleUploadImage}
				/>
				{!previewCover && <IconCloundApload />}
			</div>
		</div>
	)
}

export const StoreLabel = ({ children }: { children: ReactNode }) => {
	return (
		<div className='text-2xl text-[#1C1C28] font-bold mb-3'>{children}</div>
	)
}

const IconCloundApload = () => {
	return (
		<div className=' absolute right-0 bottom-0 w-[100px] h-[100px] rounded-full border border-transparent bg-white flex justify-center items-center shadow flex flex-col '>
			<Image src='/icons/clound-upload.svg' width={46} height={38} alt='' />
			<p className='w-fit text-sm text-[#ABABAB]'>사진 업로드</p>
		</div>
	)
}
