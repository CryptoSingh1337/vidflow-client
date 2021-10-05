import data from "@/assets/data/videos";

export const state = () => ({
	isAuthenticated: false,
	videos: data,
	snackBar: false,
})

export const mutations = {
	handleSignInOut: state => state.isAuthenticated = !state.isAuthenticated,
	showSnackBar: state => state.snackBar = !state.snackBar,
}

export const getters = {
	getVideoById: state => id => state.videos.find((video) => video.id == id)
}
