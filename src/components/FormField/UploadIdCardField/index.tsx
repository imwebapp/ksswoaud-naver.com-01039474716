import Image from 'next/image'
import React, { useRef, useState, ChangeEvent, useEffect } from 'react'
import InfomationCardID from '../../InfomationCardID'
import FileApi from '@/src/services/File'

const PreviewDefault = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-2 w-fit px-8'>
			<Image src='/icons/upload.svg' width={45} height={45} alt='' />
			<p>운전면허증,주민등록증 가릴부분 가리고 사진을 올려주세요.</p>
		</div>
	)
}

interface UploadIdCardFieldProps {
	type?: string
	accept?: string
	register?: Function
	name?: string
	onChange?: (file: File | null) => void // Chỉ định kiểu File cho tham số file
	setValue?: Function
}

const UploadIdCardField: React.FC<UploadIdCardFieldProps> = ({
	type = 'file',
	accept = 'image/*',
	onChange,
	register,
	name,
	setValue = () => {},
}) => {
	const [previewCover, setPreviewCover] = useState<{
		src: File | null
		url: string
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
		<div className='flex flex-col justify-center items-center  gap-5'>
			{!inputRef?.current?.value && <InfomationCardID />}
			<div
				className='h-[208px] w-[343px]  border flex justify-center items-center relative pointer border-dashed rounded-xl'
				onClick={() => inputRef.current && inputRef.current.click()}
			>
				{previewCover && inputRef?.current?.value ? (
					<div className='absolute h-[208px] w-[343px]  overflow-hidden'>
						<Image
							src={previewCover.url}
							layout='fill'
							objectFit='cover'
							alt='avatar'
						/>
					</div>
				) : (
					<PreviewDefault />
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
			</div>
		</div>
	)
}

export default UploadIdCardField
