'use client'
import MenuPageForUser from '@/src/containers/MenuPageForUser'
import { dataUserFromCookies } from '@/src/utils/common'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Motion } from '../Motion'

const MenuSetting = () => {
	const [openMenu, setOpenMenu] = useState(false)
	const { isLoginExpired } = dataUserFromCookies()
	const router = useRouter()
	const handleOpenMenu = () => {
		!isLoginExpired ? setOpenMenu(true) : router.push('/login')
	}

	return (
		<>
			<Motion>
				<button onClick={handleOpenMenu}>
					<Image src='/icons/menu.svg' alt='Menu Icon' width={24} height={24} />
				</button>
			</Motion>
			<MenuPageForUser open={openMenu} onClose={() => setOpenMenu(false)} />
		</>
	)
}

export default MenuSetting
