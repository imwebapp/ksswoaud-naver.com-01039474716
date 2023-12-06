const LoadingOverlay = () => {
	return (
		<div className='flex items-center justify-center min-h-full p-5 bg-gray-100 w-screen fixed h-screen top-0 left-0 overflow-hidden'>
			<div className='flex space-x-2 animate-pulse'>
				<div className='w-3 h-3 bg-gray-500 rounded-full'></div>
				<div className='w-3 h-3 bg-gray-500 rounded-full'></div>
				<div className='w-3 h-3 bg-gray-500 rounded-full'></div>
			</div>
		</div>
	)
}
export default LoadingOverlay
