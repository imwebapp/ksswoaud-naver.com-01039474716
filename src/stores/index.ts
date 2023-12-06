import {
	configureStore,
	combineReducers,
	ThunkAction,
	Action,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './rootSaga'
import authReducer from './auth/authSlice'
import settingAdminReducer from './settingAdmin/settingAdminSlice'
import globalReducer from './global/globalSlice'
import userReducer from './user/userSlice'
import listShopReducer from './listShop/listShopSlice'
import postReducer from './post/postSlice'
import shopReducer from './shop/shopSlice'
import eventReducer from './event/eventSlice'
import contenReducer from './content/contentSlice'
import settingReducer from './setting/settingSlice'
import recentShopReducer from './recentShop/recentShopSlice'
import favoriteShopReducer from './favoriteShop/favoriteShopSlice'
import blogReducer from './blog/blogSlice'
import searchReducer from './search/searchSlice'
import searchPostReducer from './searchPost/searchPostSlice'
import searchBlogReducer from './searchBlog/searchBlogSlice'
import searchEventReducer from './searchEvent/searchEventSlice'

const reducer = combineReducers({
	auth: authReducer,
	settingAdmin: settingAdminReducer,
	global: globalReducer,
	user: userReducer,
	listShop: listShopReducer,
	post: postReducer,
	shop: shopReducer,
	event: eventReducer,
	content: contenReducer,
	setting: settingReducer,
	recentShop: recentShopReducer,
	favoriteShop: favoriteShopReducer,
	blog: blogReducer,
	search: searchReducer,
	searchPost: searchPostReducer,
	searchBlog: searchBlogReducer,
	searchEvent: searchEventReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
