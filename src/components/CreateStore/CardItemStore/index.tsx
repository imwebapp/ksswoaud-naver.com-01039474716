import { RootState } from '@/src/stores'
import { listShopActions } from '@/src/stores/listShop/listShopSlice'
import { shopActions } from '@/src/stores/shop/shopSlice'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

const CardItemStore = ({
	onChange,
	value,
	checked,
	content,
	item,
	context,
	type,
}: {
	onChange?: any
	value?: any
	checked?: any
	content?: any
	item?: any
	context?: any
	type?: any
}) => {
	const shop = useSelector((state: RootState) => state.shop.store)
	const { setTabCurrent } = context
	const {
		updateInformationShop,
		updateInformationCourse,
		updateInformationMemtor,
	} = shopActions
	const dispatch = useDispatch()

	let listItem = type === 'memtor' ? shop.mentors : shop.courses

	const updateList = (clone: any) => {
		return type === 'memtor'
			? dispatch(updateInformationShop({ mentors: [...clone] }))
			: dispatch(updateInformationShop({ courses: [...clone] }))
	}

	const handleEditItem = () => {
		if (type === 'memtor') {
			dispatch(updateInformationMemtor({ ...item }))
		} else {
			dispatch(updateInformationCourse({ ...item }))
		}
		setTabCurrent('registion')
	}

	const handleUpRange = () => {
		const currentIndex = listItem.indexOf(item)
		let cloneShop = [...listItem]

		if (currentIndex - 1 >= 0) {
			;[cloneShop[currentIndex], cloneShop[currentIndex - 1]] = [
				cloneShop[currentIndex - 1],
				cloneShop[currentIndex],
			]
			updateList(cloneShop)
		}
	}

	const handleDownRange = () => {
		const currentIndex = listItem.indexOf(item)
		let cloneShop = [...listItem]

		if (currentIndex !== cloneShop.length - 1) {
			;[cloneShop[currentIndex], cloneShop[currentIndex + 1]] = [
				cloneShop[currentIndex + 1],
				cloneShop[currentIndex],
			]
			updateList(cloneShop)
		}
	}

	const handleClone = () => {
		const itemClone = { ...item, id: uuidv4() }
		const currentIndex = listItem.indexOf(item)
		let cloneShop = [...listItem]
		cloneShop.splice(currentIndex + 1, 0, itemClone)

		updateList(cloneShop)
	}

	const handleRemove = () => {
		let cloneShop = [...listItem].filter((v) => v.id !== item.id)
		updateList(cloneShop)
	}

	return (
		<div>
			<div className='flex h-[109px] border border-gray-300 rounded-2xl px-3 py-3 justify-between my-2 items-start '>
				<div className='font-medium'>{content}</div>

				<input
					className='mt-2'
					type='radio'
					value={value}
					checked={checked}
					onChange={onChange}
				/>
			</div>
			{checked && (
				<>
					<div className='flex justify-start gap-3'>
						<button className='rounded-full w-[50px] h-[50px] shadow border border-gray-300 flex flex-col justify-center items-center'>
							<Image src={'/icons/it-tick.svg'} width={20} height={20} alt='' />
							<p className='text-xs font-semibold'>추천</p>
						</button>
						<button
							className='rounded-full w-[50px] h-[50px] shadow border border-gray-300 flex flex-col justify-center items-center'
							onClick={handleEditItem}
						>
							<Image src={'/icons/it-edit.svg'} width={21} height={20} alt='' />
							<p className='text-xs font-semibold'>수정</p>
						</button>
						<button
							onClick={handleUpRange}
							className='rounded-full w-[50px] h-[50px] shadow border border-gray-300 flex flex-col justify-center items-center'
						>
							<Image src={'/icons/it-up.svg'} width={10} height={19} alt='' />
							<p className='text-xs font-semibold'> 위로</p>
						</button>
						<button
							onClick={handleDownRange}
							className='rounded-full w-[50px] h-[50px] shadow border border-gray-300 flex flex-col justify-center items-center'
						>
							<Image src={'/icons/it-down.svg'} width={21} height={20} alt='' />
							<p className='text-xs font-semibold'>아래로</p>
						</button>
						<button
							onClick={handleClone}
							className='rounded-full w-[50px] h-[50px] shadow border border-gray-300 flex flex-col justify-center items-center'
						>
							<Image
								src={'/icons/it-coppy.svg'}
								width={21}
								height={20}
								alt=''
							/>
							<p className='text-xs font-semibold'> 복제</p>
						</button>
						<button
							onClick={handleRemove}
							className='rounded-full w-[50px] h-[50px] shadow border border-gray-300 flex flex-col justify-center items-center'
						>
							<Image
								src={'/icons/it-trash.svg'}
								width={20}
								height={20}
								alt=''
							/>
							<p className='text-xs font-semibold'>삭제</p>
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default CardItemStore
