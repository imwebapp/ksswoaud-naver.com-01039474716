import React, { useState } from 'react'

interface TabItem {
	key: string
	label: string
	children: React.ReactNode
}

interface TabsProps {
	items: TabItem[]
	defaultActiveKey: string
	onChange: (key: string) => void
}

const Tabs: React.FC<TabsProps> = ({ items, defaultActiveKey, onChange }) => {
	const [activeKey, setActiveKey] = useState(defaultActiveKey)

	const handleChange = (key: string) => {
		setActiveKey(key)
		onChange(key)
	}

	const renderTabs = () => {
		return (
			<ul className='tabs flex justify-start items-center '>
				{items.map((item, index) => (
					<li
						key={item.key}
						onClick={() => handleChange(item.key)}
						className={`w-[168px] cursor-pointer border-b-2 border-transparent py-2 px-12 ${
							activeKey === item.key ? 'bg-[#36393E] rounded-xl text-white ' : ''
						}`}
					>
						{item.label}
					</li>
				))}
			</ul>
		)
	}

	const renderTabPanes = () => {
		return (
			<div className='tab-content'>
				{items.map((item, index) => (
					<div
						key={item.key}
						className={`tab-pane ${
							activeKey === item.key ? 'block' : 'hidden'
						}`}
						data-key={item.key}
					>
						{item.children}
					</div>
				))}
			</div>
		)
	}

	return (
		<div className='tabs-container '>
			{renderTabs()}
			{renderTabPanes()}
		</div>
	)
}

export default Tabs
