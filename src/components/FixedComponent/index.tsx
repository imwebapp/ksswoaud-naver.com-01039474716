import { classNames } from '@/src/utils/common'

export interface FixedComponentProps {
	children?: React.ReactNode
	position?: 'top' | 'bottom'
}

export default function FixedComponent(props: FixedComponentProps) {
	const { children, position = 'bottom' } = props

	return (
		<div
			className={classNames(
				'fixed max-w-[502px] w-full m-[0_auto] z-10 left-0 right-0',
				position === 'bottom' ? 'bottom-0' : 'top-0',
			)}
		>
			{props.children}
		</div>
	)
}
