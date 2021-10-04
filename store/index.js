import data from "@/assets/data/videos";

export const state = () => ({
	isAuthenticated: false,
	videos: data,
})

export const mutations = {
	handleSignInOut: state => state.isAuthenticated = !state.isAuthenticated
}

export const getters = {
	getVideoById: state => id => state.videos.find((video) => video.id == id)
}
