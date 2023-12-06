import { listShopActions } from '@/src/stores/listShop/listShopSlice'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import CardItemStore from '../CardItemStore'
import { useState } from 'react'
import { truncateText } from '@/src/utils/common'
import { RootState } from '@/src/stores'
import { shopActions } from '@/src/stores/shop/shopSlice'

const TabListPrice = ({ context }: { context: any }) => {
	const shop = useSelector((state: RootState) => state.shop.store)
	const {
		updateInformationShop,
		updateInformationCourse,
		resetInformationCourse,
	} = shopActions
	const dispatch = useDispatch()

	const { setTabCurrent } = context
	const [itemChecked, setItemChecked] = useState()
	const handleOnchangeItem = (v: any) => {
		setItemChecked(v.target.value)
	}
	const lisPrice = shop.courses || []

	return (
		<div className=' mt-16'>
			{isEmpty(lisPrice) ? (
				<div className='flex flex-col justify-center items-center my-10'>
					<Image src='/images/tag-2.png' width={140} height={140} alt='' />
					<div className='flex flex-col justify-center items-center gap-2'>
						<p className='font-medium text-lg'>
							생성하신 요금표가 아직 없습니다.
						</p>
						<p>아래코스등록을 눌러 요금표를 만들어주세요</p>
					</div>
				</div>
			) : (
				<>
					{lisPrice.map((v: any, i: any) => (
						<CardItemStore
							key={i}
							content={
								<div className='px-2'>
									<p className='font-semibold text-lg'>{v.title}</p>
									<p className='text-[#E2E2E2] '>
										{v.description && truncateText(v.description, 30)}
									</p>
									<div className='flex justify-start items-center gap-2'>
										<p>
											<span className='mr-2 text-[#3C89F6] font-bold'>
												요금
											</span>
											{`${v?.prices[0]?.discount}` +
												(v?.currency?.name || v?.unit)}
										</p>
										<p className='text-[#E2E2E2] '>
											{v?.prices[0]?.price + (v?.currency?.name || v?.unit)}
										</p>
										<p className='text-[#37C4EF] font-bold'>
											{Math.floor(
												(v.prices[0]?.discount / v.prices[0]?.price) * 100,
											) + '%'}
										</p>
									</div>
								</div>
							}
							onChange={handleOnchangeItem}
							checked={itemChecked === v.id}
							value={v.id}
							item={v}
							context={{ ...context }}
						/>
					))}
				</>
			)}
			<div className='flex flex-col justify-center items-center'>
				<button
					onClick={() => {
						setTabCurrent('registion')
						dispatch(resetInformationCourse())
					}}
					className='my-3 font-medium flex border border-blue-500 rounded text-blue-500 justify-center items-center py-2 px-10'
				>
					<p className='text-2xl'>+</p>코스등록
				</button>
			</div>
		</div>
	)
}

export default TabListPrice
