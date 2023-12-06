import FileApi from '@/src/services/File'
import Image from 'next/image'
import React, { useRef, useState, ChangeEvent, useEffect } from 'react'

const UserDefault = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-2 w-fit'>
			<Image src='/icons/cycle.svg' width={24} height={24} alt='' />
			<Image src='/icons/eclip.svg' width={42} height={24} alt='' />
		</div>
	)
}

const IconCamera = ({ icon }: { icon?: any }) => {
	return (
		<div className='absolute right-0 bottom-0 w-[31px] h-[31px] rounded-full border border-transparent bg-white flex justify-center items-center shadow '>
			{icon ?? <Image src='/icons/camera.svg' width={18} height={16} alt='' />}
		</div>
	)
}

interface AvatarFieldProps {
	type?: string
	accept?: string
	register?: Function
	name?: string
	setValue?: Function
	onChange?: (file: File | null) => void // Chỉ định kiểu File cho tham số file
	value?: string
	icon?: any
}

const AvatarField: React.FC<AvatarFieldProps> = ({
	type = 'file',
	accept = 'image/*',
	onChange,
	register,
	name,
	setValue = () => {},
	value = '',
	icon,
}) => {
	const [previewCover, setPreviewCover] = useState<{
		src: File | null
		url: string | null
	} | null>(null)

	const inputRef = useRef<HTMLInputElement | null>(null)

	const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event?.target?.files?.[0] || null
		onChange && onChange(file)
		setPreviewCover({
			src: file,
			url: file ? URL.createObjectURL(file) : '',
		})
	}

	const registerField: any = register && register(name, {})

	useEffect(() => {
		if (previewCover) {
			setValue(name, previewCover?.src)
			FileApi.uploadFile(previewCover.src).then((res) => {
				setValue(name, res.url)
			})
		}
	}, [previewCover])

	return (
		<div
			className='w-[100px] h-[100px] rounded-full border flex justify-center items-center relative pointer'
			onClick={() => inputRef.current && inputRef.current.click()}
		>
			{previewCover || value ? (
				<div className='absolute w-[100px] h-[100px] rounded-full overflow-hidden'>
					<Image
						src={previewCover?.url || value}
						layout='fill'
						objectFit='cover'
						alt='avatar'
					/>
				</div>
			) : (
				<UserDefault />
			)}
			<input
				{...registerField}
				name={name}
				type={type}
				accept={accept}
				ref={inputRef}
				className='hidden'
				onChange={handleUploadImage}
			/>
			<IconCamera icon={icon} />
		</div>
	)
}

export default AvatarField
