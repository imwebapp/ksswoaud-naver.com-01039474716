import { useEffect, useState } from 'react'
import CreateStoreTab from '../CreateStoreTab'
import StoreInputField from '../StoreInputField'
import StoreUploadAvatarStaff from '../StoreUploadAvatarStaff'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../Button'
import { v4 as uuidv4 } from 'uuid'
import { isEmpty } from 'lodash'
import TabListMemtor from './TabListMemtor'
import { RootState } from '@/src/stores'
import { shopActions } from '@/src/stores/shop/shopSlice'

const StoreStaffStep = () => {
	const shop = useSelector((state: RootState) => state.shop.store)
	const memtor = useSelector((state: RootState) => state.shop.memtor)
	const [tabCurrent, setTabCurrent] = useState('registion')
	const [disabled, setDisabled] = useState(true)

	const handleOnchangeTab = (item: any) => {
		setTabCurrent(item)
	}
	const {
		updateInformationShop,
		updateInformationMemtor,
		resetInformationMentor,
	} = shopActions
	const dispatch = useDispatch()

	const handleOnchangeAvatar = (f: any) => {
		dispatch(
			updateInformationMemtor({
				images: [f.url],
			}),
		)
	}

	const handleChangeInputValue = (e: any) => {
		dispatch(
			updateInformationMemtor({
				[`${e.target.name}`]: e.target.value,
			}),
		)
	}
	const handleSubmitMemtor = () => {
		const memtorId = uuidv4()
		const memtorOn = Object.values(memtor).some((v) => isEmpty(`${v}`))

		if (!memtorOn) {
			if (memtor.id) {
				const shopMemtorClone = shop.mentors.map((v: any) =>
					v.id === memtor.id ? { ...v, ...memtor } : v,
				)

				dispatch(updateInformationShop({ mentors: shopMemtorClone }))
			} else {
				const newMemtor = { ...memtor, id: memtorId }
				const newMemtors = shop.mentors
					? [...shop.mentors, newMemtor]
					: [newMemtor]

				dispatch(updateInformationMemtor({ id: memtorId }))
				dispatch(updateInformationShop({ mentors: newMemtors }))
			}

			setTabCurrent('list')
			dispatch(resetInformationMentor())
		}
	}

	useEffect(() => {
		const list = ['images', 'name', 'description']
		const isdisabled = list.some((v) => !memtor[v])
		setDisabled(isdisabled)
	}, [memtor])

	return (
		<div className='pb-10'>
			<CreateStoreTab
				tab={tabCurrent}
				onChange={handleOnchangeTab}
				items={[
					{
						value: 'registion',
						label: '담당자 등록',
					},
					{
						value: 'list',
						label: '담당자 목록',
					},
				]}
			/>
			{tabCurrent === 'registion' ? (
				<div className='py-8'>
					<StoreUploadAvatarStaff
						value={memtor?.images}
						name='images'
						label='담당자 이미지'
						onChange={handleOnchangeAvatar}
					/>
					<StoreInputField
						value={memtor?.name}
						name='name'
						label='이름'
						placeholder='예시)홍길동'
						onChange={handleChangeInputValue}
					/>

					<StoreInputField
						value={memtor?.description}
						onChange={handleChangeInputValue}
						name='description'
						label='소개'
						row={8}
						placeholder='예시) 안녕하세요  홍길동입니다 회원님들께 인사드립니다 제 주된 코스는 두피케어 피부관리 그리고 추가되어 전문적인 건식통증테라피(경혈지압과 체형교정) 아로마테라피 (다이어트 림프순환관리) 정성으로 회원님들께 보답하겠습니다 '
					/>
				</div>
			) : (
				<>
					<TabListMemtor
						context={{
							setTabCurrent,
						}}
					/>
				</>
			)}
			{tabCurrent === 'registion' && (
				<div onClick={handleSubmitMemtor}>
					<Button disabled={disabled}>코스추가</Button>
				</div>
			)}
		</div>
	)
}

export default StoreStaffStep
