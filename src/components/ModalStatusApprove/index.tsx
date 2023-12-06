import React, { ReactNode } from 'react'

interface ModalStatusApproveProps {
	isModalOpen?: boolean
	setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
	children?: ReactNode
}

const ModalStatusApprove: React.FC<ModalStatusApproveProps> = ({
	isModalOpen,
	setIsModalOpen,
	children,
}) => {
	return (
		<div>
			{isModalOpen && (
				<div className='fixed inset-0 flex items-center justify-center z-50'>
					<div className='modal-overlay fixed inset-0 bg-white opacity-100'></div>
					<div className='modal-container  z-50'>
						<div className='modal-content p-4'>{children}</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ModalStatusApprove
