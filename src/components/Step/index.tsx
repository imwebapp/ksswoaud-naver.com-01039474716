import { classNames } from '@/src/utils/common'

interface StepProps {
	title?: string
	currentStep: number
	step: number
}

export default function Step({ title, currentStep, step }: StepProps) {
	const width = `${(currentStep / step) * 100}%`

	return (
		<div className='w-full'>
			<div className='flex justify-between font-bold mb-3'>
				<p className='text-[#555770]'>{title}</p>
				<span>
					{currentStep}/{step}
				</span>
			</div>
			<div
				className='bg-[linear-gradient(148deg,rgba(80,153,255,0.12)_16.53%,rgba(0,91,219,0.12)_84.41%)]
        rounded-[100px] w-full h-2 relative'
			>
				<span
					className={classNames(
						'h-full absolute left-0 rounded-[100px] ',
						'bg-[linear-gradient(148deg,#5099FF_16.53%,#005BDB_84.41%)]',
					)}
					style={{ width }}
				/>
			</div>
		</div>
	)
}
