import Image from 'next/image'
import PrefixIcon from '../../PrefixIcon'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDetectClick } from './useDetectClick'
import styles from './Dropdown.module.css'
import useClickOutside from '@/src/hooks/useClickOutside'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createQueryParams, mergeQueryParams } from '@/src/utils/common'
import { find, get } from 'lodash'
interface DropdownFlagProps {
	register: any
	onChange: Function
}

const DropdownFlag: React.FC<DropdownFlagProps> = ({ register, onChange }) => {
	const data = [
		{
			key: 'kr',
			icon: <Image src={'/icons/kr.svg'} width={32} height={24} alt='' />,
			code: '+82',
		},
		{
			key: 'vn',
			icon: <Image src={'/icons/vn-flag.svg'} width={32} height={24} alt='' />,
			code: '+84',
		},
	]
	const dropdownRef = useRef(null)
	const [openItem, setOpenItem] = useDetectClick(dropdownRef, false)
	const [value, setValue] = useState(data[0])
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)
	const onClose = () => {
		setOpenItem(false)
	}
	useClickOutside(dropdownRef, onClose)

	useEffect(() => {
		onChange('countryCode', value.code)
		const queryParams = createQueryParams({ code: value.code }, params)
		router.push(mergeQueryParams(pathname, queryParams))
	}, [value])

	useEffect(() => {
		const flag = searchParams.get('code')
		if (flag) {
			const country = find(data, ['code', flag])
			country && setValue(country)
		}
	}, [])

	return (
		<div>
			<input
				className='hidden'
				name='countryCode'
				{...register('countryCode')}
			/>
			<div onClick={() => setOpenItem(!openItem)}>
				<PrefixIcon
					icon={
						<div className='flex justify-center items-center gap-2 px-2'>
							{value.icon}
							<p className='text-sm'>{value.code}</p>
						</div>
					}
				/>
			</div>
			<ul
				ref={dropdownRef}
				className={
					`${styles.items} ${openItem ? styles.active : ''}` +
					' absolute z-10 mt-1 w-max bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm w-28 flex flex-col gap-2 py-5'
				}
			>
				{data.map((v, i) => {
					return (
						<li
							key={v.key}
							onClick={() => {
								setValue(v)
								setOpenItem(false)
							}}
						>
							<div className='flex justify-center items-center gap-2 px-2'>
								{v.icon}
								<p className='text-sm'>{v.code}</p>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default DropdownFlag
