import { all } from 'redux-saga/effects'

import authSaga from './auth/authSaga'
import settingAdminSaga from './settingAdmin/settingAdminSaga'
import globalSaga from './global/globalSaga'
import userSaga from './user/userSaga'
import listShopSaga from './listShop/listShopSaga'
import postSaga from './post/postSage'
import eventSaga from './event/eventSaga'
import contentSaga from './content/contentSaga'
import settingSaga from './setting/settingSaga'
import recentShopSage from './recentShop/recentShopSaga'
import favoriteShopSaga from './favoriteShop/favoriteShopSaga'
import blogSaga from './blog/blogSaga'
import searchSaga from './search/searchSaga'
import searchPostSaga from './searchPost/searchPostSaga'
import searchBlogSaga from './searchBlog/searchBlogSaga'
import searchEventSaga from './searchEvent/searchEventSaga'

export default function* rootSaga() {
	yield all([
		authSaga(),
		settingAdminSaga(),
		globalSaga(),
		userSaga(),
		listShopSaga(),
		postSaga(),
		eventSaga(),
		contentSaga(),
		settingSaga(),
		recentShopSage(),
		favoriteShopSaga(),
		blogSaga(),
		searchSaga(),
		searchPostSaga(),
		searchBlogSaga(),
		searchEventSaga(),
	])
}
