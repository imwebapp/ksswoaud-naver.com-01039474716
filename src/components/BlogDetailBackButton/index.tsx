import FixedComponent from '../FixedComponent'

export default function BlogDetailBackButton() {
	return (
		<FixedComponent>
			<div className='p-4 bg-white'>
				<button className='w-full bg-black text-white py-2.5 rounded-[8px]'>
					닫기
				</button>
			</div>
		</FixedComponent>
	)
}
