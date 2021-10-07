import data from "@/assets/data/videos";

export const state = () => ({
	isAuthenticated: true,
	videos: data,
	snackBar: false,
	alert: true,
	alertType: "primary",
	alertIcon: "success",
	alertText: "This is the alert"
})

export const mutations = {
	handleSignInOut: state => state.isAuthenticated = !state.isAuthenticated,
	showSnackBar: state => state.snackBar = !state.snackBar,
	showAlert: state => state.alert = !state.alert,
}

export const getters = {
	getVideoById: state => id => state.videos.find((video) => video.id == id)
}
