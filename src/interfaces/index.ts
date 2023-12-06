export enum UserType {
	FREE_USER = 'FREE_USER',
	BIZ_USER = 'BIZ_USER',
}
export type MetadataProps = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}