'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import Step from '@/src/components/Step'
import {
	ImageStep,
	InfoStep,
	ConfigStep,
	PriceStep,
} from '@/src/components/CreateStore'
import { useDispatch, useSelector } from 'react-redux'
import StoreStaffStep from '@/src/components/CreateStore/StoreStaffStep'
import ShopApi, { ShopI } from '@/src/services/Shop'
import MentorApi from '@/src/services/Mentor'
import CourseApi from '@/src/services/Course'
import { RootState } from '@/src/stores'
import { shopActions } from '@/src/stores/shop/shopSlice'
import ThemeApi from '@/src/services/Thema'
import useData from '@/src/hooks/useData'
import { isEmpty, pick, result } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'
import ShopActiveStep from '@/src/components/CreateStore/ShopActiveStep'
import PopupReviewShop from '@/src/containers/PopupReviewShop'
import PopupPermissionRegisterStore from '@/src/containers/PopupPermissionRegisterStore'
import MaskedHoverEffect from '@/src/components/MaskedHoverEffect'
import { Motion } from '@/src/components/Motion'
import { enqueueSnackbar } from 'notistack'
import { generateRandomString } from '@/src/utils/common'
import { MY_LIST_STATE } from '@/src/constants'
import Loading from '@/src/components/Loading'
import { userActions } from '@/src/stores/user/userSlice'

const IconLoading = () => {
	return (
		<svg
			aria-hidden='true'
			role='status'
			className='inline mr-3 w-4 h-4 text-white animate-spin'
			viewBox='0 0 100 101'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
				fill='#E5E7EB'
			></path>
			<path
				d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
				fill='currentColor'
			></path>
		</svg>
	)
}

export default function Page() {
	const {
		resetInformationShop,
		updateInformationTheme,
		updateInformationShop,
	} = shopActions
	const search = useSearchParams()
	const dispatch = useDispatch()
	const [step, setStep] = useState(search.get('type') === 'edit' ? 0 : 1)
	const shop = useSelector((state: RootState) => state?.shop?.store)

	const { userData } = useData()
	const router = useRouter()
	const [shopActive, setShopActive] = useState<ShopI>()
	const [openReview, setOpenReview] = useState(false)
	const [loading, setLoading] = useState(false)
	const isEdit = search.get('type') === 'edit'
	const [openPermission, setOpenPermission] = useState(false)
	const [loadingFirst, setLoadingFirst] = useState(false)
	const handleNextStep = async () => {
		if (step < 5) {
			setStep(step + 1)
		}
		if (step === 5) {
			const payload = {
				title: shop.title,
				description: shop.description,
				verified: true,
				opening_hours: shop.opening_hours,
				images: shop.images.filter((v: any) => !!v),
				contact_phone: shop.contact_phone,
				latitude: shop.latitude,
				longitude: shop.longitude,
				address: shop.address,
				address_2: shop.address_2,
				expired_date: null,
				category_id: shop?.category_id,
				tag_ids: shop.tag_ids,
				shop_province: shop.shop_province,
				shop_district: shop.shop_district,
				subway_station: shop.subway_station,
				subway_location: shop.subway_location,
				subway_line: shop.subway_line,
				old_shop: shop.old_shop,
			}

			try {
				setLoading(true)
				if (isEdit) {
					const [res] = await Promise.all([
						ShopApi.updateShop(shop.id, {
							...payload,
							state: MY_LIST_STATE.PENDING,
						}),
						shop.mentor
							? MentorApi.createMentor(shop.id, {
									mentors: [
										...shop.mentors.map((v: any) => ({
											...v,
											id: generateRandomString(),
											images: v.images,
											thumbnails: v.images,
										})),
									],
							  })
							: null,

						shop.courses
							? CourseApi.createCourse(shop.id, {
									courses: [...shop.courses].map((v) => {
										const it = {
											id: generateRandomString(),
											title: v.title,
											running_time: `${v.running_time}`,
											description: v.description,
											recommended: false,
											unit: v.currency?.value ?? v.unit,
											prices: v.prices.map((v: any) => {
												const j = {
													id: generateRandomString(),
													name: v.name,
													discount: `${v.discount}`,
													price: `${v.price}`,
												}
												return j
											}),
										}
										return it
									}),
							  })
							: null,
					])
				} else {
					const res = await ShopApi.createShop({ ...payload })
					const idShop = res.results.object.shop.id
					await Promise.all([
						shop.mentors
							? MentorApi.createMentor(idShop, {
									mentors: [
										...shop.mentors.map((v: any) => ({
											...v,
											id: generateRandomString(),
											images: v.images,
											thumbnails: v.images,
										})),
									],
							  })
							: null,

						shop.courses
							? CourseApi.createCourse(idShop, {
									courses: [...shop.courses].map((v) => {
										const it = {
											id: generateRandomString(),
											title: v.title,
											running_time: `${v.running_time}`,
											description: v.description,
											recommended: false,
											unit: v.currency?.value ?? v.unit,
											prices: v.prices.map((v: any) => {
												const j = {
													id: generateRandomString(),
													name: v.name,
													discount: `${v.discount}`,
													price: `${v.price}`,
												}
												return j
											}),
										}
										return it
									}),
							  })
							: null,
					])
					dispatch(userActions.updatePendingPost(1))
				}
				setStep(0)
				router.push('/store/create?type=edit')
			} catch (err) {
				enqueueSnackbar((err as any).message, { variant: 'error' })
			} finally {
				setLoading(false)
			}
		}
	}
	const handleBackStep = () => {
		if (step > 1) {
			setStep(step - 1)
		} else if (isEdit && step === 0) {
			router.push('/')
		} else if (isEdit) {
			setStep(0)
		} else {
			router.push('/')
		}
	}

	useEffect(() => {
		ThemeApi.getList({ fields: ['$all'] }).then((v) =>
			dispatch(updateInformationTheme([...v?.results?.objects.rows])),
		)

		return () => {
			dispatch(resetInformationShop({}))
		}
	}, [])

	const handleValidNextButton = () => {
		let disabled = undefined
		switch (step) {
			case 1:
				disabled = shop?.images.length === 0

				break
			case 2:
				disabled = ['title', 'description', 'contact_phone', 'address'].some(
					(v) => !shop[v],
				)
				break
			case 3:
				disabled = [
					'opening_hours',
					'category_id',
					'tag_ids',
					'subway_location',
					'subway_line',
					'subway_station',
					'shop_district',
					'shop_province',
				].some((v) => !shop[`${v}`])
				break
			case 4:
				disabled = false
				break
			case 5:
				disabled = false

			default:
				break
		}
		return {
			disabled,
		}
	}

	useEffect(() => {
		const step1 = ['images']
		const step2 = ['title', 'description', 'contact_phone', 'address']
		const step3 = [
			'opening_hours',
			'tag_ids',
			'category_id',
			'category',
			'subway_location',
			'subway_line',
			'subway_station',
			'shop_province',
			'shop_district',
			'latitude',
			'longitude',
		]
		const step4 = ['courses']
		const step5 = ['mentors']

		const properties = [...step1, ...step2, ...step3, ...step4, ...step5]

		if (shopActive) {
			setLoadingFirst(true)
			ShopApi.getDetail(shopActive.id)
				.then(async (res) => {
					const shop = res.results.object.shop
					const result = shop
					const DATA = pick(result, [...properties])
					DATA.id = shop.id
					DATA.old_shop = shop.old_shop ?? shop

					dispatch(
						updateInformationShop({
							...DATA,
						}),
					)
				})
				.finally(() => setLoadingFirst(false))
		}
	}, [shopActive])

	const handleOnchangeShop = (v: ShopI) => {
		setShopActive(v)
	}

	const handleRedirectRegisterShop = () => {
		const { post_limit, current_pending_post, current_active_post } = userData
		const limit = post_limit > current_pending_post + current_active_post
		if (limit) {
			setStep(1)
			router.push('/store/create')
		} else {
			setOpenPermission(true)
		}
	}

	useEffect(() => {
		if (step === 0) {
			setShopActive(undefined)
			dispatch(resetInformationShop({}))
		}
	}, [step])

	return (
		<div className='px-4 min-h-screen pb-20 pt-14 relative'>
			<div
				className='py-2.5 absolute top-0 left-0 w-full px-4 flex justify-between
        border-b'
			>
				<div className='flex justify-start gap-3'>
					<button onClick={handleBackStep}>
						<Image src='/icons/arrow-left.svg' alt='' width={24} height={24} />
					</button>
					{step === 0 && <p className='font-bold text-xl'>운영중인 매장</p>}
				</div>
				{step === 0 && (
					<button
						className='bg-[#39B5FE] text-white flex justify-center items-center rounded w-[84px] h-[32px] group relative '
						onClick={() => {
							handleRedirectRegisterShop()
						}}
					>
						<Motion>+매장등록</Motion>

						<div className='absolute inset-0 h-full w-full  scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-[#E4E4E7]/30'></div>
					</button>
				)}
				<PopupPermissionRegisterStore
					open={openPermission}
					onClose={() => setOpenPermission(false)}
				/>
			</div>
			{step !== 0 && <Step currentStep={step} step={5} title='매장정보 작성' />}
			{step !== 0 && (
				<div className='fixed bottom-0 left-0 w-full z-10'>
					<div className='w-full flex gap-3 p-4 bg-white  max-w-[502px] mx-auto'>
						<div className='w-full'>
							<MaskedHoverEffect>
								<button
									className='grow rounded-xl border py-3.5 w-full'
									onClick={() => setOpenReview(true)}
								>
									미리보기
								</button>
							</MaskedHoverEffect>
						</div>
						<div className='w-full'>
							<MaskedHoverEffect>
								<button
									{...handleValidNextButton()}
									className='grow rounded-xl py-3.5 enabled:bg-[linear-gradient(148deg,#5099FF_16.53%,#005BDB_84.41%)]
          text-white font-medium flex justify-center items-center disabled:opacity-75 disabled:bg-gray-300 w-full'
									onClick={handleNextStep}
								>
									{loadingFirst && <IconLoading />}

									<span>
										{step === 1 && shop?.images?.filter((v: any) => !!v).length
											? `계속하기 (${
													shop.images.filter(
														(v: any) => !!v && typeof v === 'string',
													).length
											  }/9)`
											: '다음'}
									</span>
									<Image
										src='/icons/arrow-right.svg'
										alt=''
										width={24}
										height={24}
									/>
								</button>
							</MaskedHoverEffect>
						</div>
					</div>
				</div>
			)}

			<div className='pt-2'>
				{step === 0 ? (
					<ShopActiveStep setStep={setStep} onChangeShop={handleOnchangeShop} />
				) : null}
				{step === 1 ? <ImageStep loading={loadingFirst} /> : null}
				{step === 2 ? <InfoStep /> : null}
				{step === 3 ? <ConfigStep /> : null}
				{step === 4 ? <PriceStep /> : null}
				{step === 5 ? <StoreStaffStep /> : null}
			</div>
			<PopupReviewShop open={openReview} onClose={() => setOpenReview(false)} />
			<Loading loading={loading} />
		</div>
	)
}
