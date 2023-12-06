import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
	store: {
		images: [],
	},
	course: { prices: [] },
	memtor: {},
	themes: [],
}

const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {
		updateInformationShop: (state, action) => {
			state.store = { ...state.store, ...action.payload }
		},
		updateInformationCourse: (state, action) => {
			state.course = { ...state.course, ...action.payload }
		},
		updateInformationMemtor: (state, action) => {
			state.memtor = { ...state.memtor, ...action.payload }
		},
		updateInformationTheme: (state, action) => {
			state.themes = [...state.themes, ...action.payload]
		},
		resetInformationShop: (state, action) => {
			state.store = initialState.store
			state.course = initialState.course
			state.memtor = initialState.memtor
			state.themes = initialState.themes
		},
		resetInformationCourse: (state) => {
			state.course = { prices: [] }
		},
		resetInformationMentor: (state) => {
			state.memtor = {}
		},
	},
})

export const shopActions = shopSlice.actions

const shopReducer = shopSlice.reducer
export default shopReducer
