import { listShopActions } from '@/src/stores/listShop/listShopSlice'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import CardItemStore from '../CardItemStore'
import { useState } from 'react'
import { truncateText } from '@/src/utils/common'
import Avatar from '../../Avatar'
import { RootState } from '@/src/stores'
import { shopActions } from '@/src/stores/shop/shopSlice'

const TabListMemtor = ({ context }: { context: any }) => {
	const shop = useSelector((state: RootState) => state.shop.store)
	const { updateInformationShop, updateInformationMemtor } = shopActions
	const dispatch = useDispatch()

	const { setTabCurrent } = context
	const [itemChecked, setItemChecked] = useState()
	const handleOnchangeItem = (v: any) => {
		setItemChecked(v.target.value)
	}
	const lisMemtor = shop.mentors || []

	return (
		<div className=' mt-16'>
			{isEmpty(lisMemtor) ? (
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
					{lisMemtor.map((v: any, i: any) => (
						<CardItemStore
							type={'memtor'}
							key={i}
							content={
								<div className='px-2 flex justify-center items-center gap-3'>
									<div>
										<Avatar url={v.images[0]} />
									</div>
									<div>
										<p className='text-gray-700 font-bold'>{v.name}</p>
										<p className='text-[#858EA9]'>{v.description}</p>
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
						dispatch(
							updateInformationMemtor({
								name: '',
								images: '',
								thumbnails: 0,
								description: 0,

								id: null,
							}),
						)
					}}
					className='my-3 font-medium flex border border-blue-500 rounded text-blue-500 justify-center items-center py-2 px-10'
				>
					<p className='text-2xl'>+</p>코스등록
				</button>
			</div>
		</div>
	)
}

export default TabListMemtor
