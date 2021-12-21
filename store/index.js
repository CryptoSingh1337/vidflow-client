import data from "@/assets/data/videos";

export const state = () => ({
	videos: data,
	alert: false,
	alertType: "",
	alertIcon: "",
	alertText: "",
	origin: process.env.baseUrl,
})

export const mutations = {
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
