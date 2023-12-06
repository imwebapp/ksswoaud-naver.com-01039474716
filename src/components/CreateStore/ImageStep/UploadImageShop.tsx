import FileApi from '@/src/services/File'
import Image from 'next/image'
import React, { useRef, useState, ChangeEvent, useEffect } from 'react'

interface UploadImageShopProps {
	type?: string
	accept?: string
	register?: Function
	name?: string
	setValue?: Function
	value?: string
	onChange?: (file: File | null) => void // Chỉ định kiểu File cho tham số file
}

const UploadImageShop: React.FC<UploadImageShopProps> = ({
	type = 'file',
	accept = 'image/*',
	onChange,
	register,
	name,
	setValue = () => {},
	value = '',
}) => {
	const [previewCover, setPreviewCover] = useState<{
		src: File | null
		url: string
	} | null>(null)

	const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event?.target?.files?.[0] || null
		if (file) {
			onChange && onChange(file)
			setPreviewCover({
				src: file,
				url: file ? URL.createObjectURL(file) : '',
			})
		}
	}
	const registerField: any = register && register(name, {})
	useEffect(() => {
		if (previewCover) {
			setValue(name, previewCover.url)
			FileApi.uploadFile(previewCover.src).then((res) => {
				setValue(name, res.url)
			})
		}
	}, [previewCover])

	return (
		<label className='w-full h-full flex items-center justify-center'>
			{(value && typeof value === 'string') || previewCover ? (
				<Image
					src={previewCover?.url || value}
					layout='fill'
					objectFit='cover'
					alt='avatar'
				/>
			) : (
				<Image src='/icons/union.svg' alt='' width={44} height={44} />
			)}
			<input
				{...registerField}
				name={name}
				type={type}
				accept={accept}
				className='hidden'
				onChange={handleUploadImage}
			/>
		</label>
	)
}

export default UploadImageShop
