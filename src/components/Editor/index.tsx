import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import FileApi from '@/src/services/File'

interface EditorProps {
	data?: string
	onChange?: (value: string) => void
}

export default function Editor({ data, onChange }: EditorProps) {
	function uploadAdapter(loader: any) {
		return {
			upload: () => {
				return new Promise((resolve, reject) => {
					const body = new FormData()
					loader.file.then(async (file: any) => {
						try {
							const result = await FileApi.uploadMultipleImages([file])
							const images = result.results.object
							resolve({ default: images.high_quality_images[0].url })
						} catch (err) {
							reject(err)
						}
					})
				})
			},
		}
	}

	function uploadPlugin(editor: any) {
		editor.plugins.get('FileRepository').createUploadAdapter = (
			loader: any,
		) => {
			return uploadAdapter(loader)
		}
	}

	return (
		<CKEditor
			editor={ClassicEditor}
			config={{
				extraPlugins: [uploadPlugin],
			}}
			data={data}
			onChange={(event, editor) => {
				const data = editor.getData()
				if (onChange) {
					onChange(data)
				}
			}}
		/>
	)
}
