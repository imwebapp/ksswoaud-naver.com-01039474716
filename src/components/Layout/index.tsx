'user client'
import React from 'react'

type LayoutProps = {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className='bg-white container mx-auto max-w-[502px]'>{children}</div>
	)
}

export default Layout
