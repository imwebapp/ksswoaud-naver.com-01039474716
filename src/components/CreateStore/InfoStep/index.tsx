import StoreInputField, { StoreInput, StoreLabel } from '../StoreInputField'

import CreateStorePhoneInput from '../CreateStoryPhoneInput'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { shopActions } from '@/src/stores/shop/shopSlice'
import { RootState } from '@/src/stores'
import PopupAddress from '@/src/containers/PopupAddress'
import MaskedHoverEffect from '../../MaskedHoverEffect'

export default function InfoStep() {
	const { updateInformationShop } = shopActions
	const dispatch = useDispatch()
	const shop = useSelector((state: RootState) => state.shop.store)
	const [openAddress, setOpenAddress] = useState(false)

	const handleChangeInputValue = (e: any) => {
		dispatch(
			updateInformationShop({
				[`${e.target.name}`]: e.target.value,
			}),
		)
	}

	const handleChangeDetailAddress = (address: string) => {
		dispatch(
			updateInformationShop({
				address_2: address,
			}),
		)
	}

	const handleChangePostcode = ({
		address,
		latitude,
		longitude,
	}: {
		address: string
		latitude: number
		longitude: number
	}) => {
		dispatch(
			updateInformationShop({
				address,
				latitude,
				longitude,
			}),
		)
	}

	return (
		<div>
			<StoreInputField
				value={shop.title}
				name='title'
				onChange={handleChangeInputValue}
				label='매장 이름'
				placeholder='지역명도 같이 넣어주세요'
			/>
			<StoreInputField
				value={shop.description}
				name='description'
				onChange={handleChangeInputValue}
				label='매장 소개'
				row={5}
				placeholder='매장의 소개해주세요
구글 혹은 네이버에 노출 될 수 있으니
소개글과 노출 원하는 키워드도 같이
입력바랍니다. 예시: 강남케어, 강남맛집,강남추천 등~'
			/>
			<div className='mb-8'>
				<StoreInputField
					placeholder='012345678'
					label='매장 번호'
					name='contact_phone'
					value={shop.contact_phone}
					onChange={(e) => {
						const value = e.currentTarget.value
						if (value && !value.match(/^[0-9]+$/)) return
						handleChangeInputValue(e)
					}}
				/>
			</div>

			<div>
				<StoreLabel>
					<p>
						매장 주소<span className='text-[#ABABAB]'>(위치기반 적용)</span>
					</p>
				</StoreLabel>
				<MaskedHoverEffect>
					<StoreInput
						onClick={() => {
							setOpenAddress(true)
						}}
						value={shop.address}
						className='mb-3'
						placeholder='주소입력'
					/>
				</MaskedHoverEffect>
				<MaskedHoverEffect>
					<StoreInput
						value={shop.address_2}
						placeholder='상세주소 입력'
						onChange={(e) => {
							handleChangeDetailAddress(e.currentTarget.value)
						}}
					/>
				</MaskedHoverEffect>
			</div>
			<PopupAddress
				open={openAddress}
				onClose={() => setOpenAddress(false)}
				onChange={handleChangePostcode}
			/>
		</div>
	)
}
