import data from "@/assets/data/videos";

export const state = () => ({
	isAuthenticated: true,
	videos: data,
	snackBar: false,
	alert: false,
	alertType: "",
	alertIcon: "",
	alertText: "",
	origin: process.env.baseUrl,
})

export const mutations = {
	handleSignInOut: state => state.isAuthenticated = !state.isAuthenticated,
	showSnackBar: state => state.snackBar = !state.snackBar,
	toggleAlert: state => state.alert = false,
	showAlert: (state, payload) => {
		state.alertType = payload.alertType;
		state.alertIcon = payload.alertIcon;
		state.alertText = payload.alertText;
		state.alert = true;
	},
}

export const getters = {
	getVideoById: state => id => state.videos.find((video) => video.id == id)
}
