'use client'

import { motion } from 'framer-motion'

export const Motion = ({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) => (
	<motion.div
		className={className}
		whileHover={{
			scale: 1.2,
			transition: { duration: 0.5 },
			zIndex: 1,
		}}
		whileTap={{ scale: 0.9 }}
	>
		{children}
	</motion.div>
)
