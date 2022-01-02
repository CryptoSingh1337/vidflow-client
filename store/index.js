export const state = () => ({
	alert: false,
	alertType: "",
	alertIcon: "",
	alertText: "",
	uploadVideo: null,
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
	setUploadVideo: (state, payload) => {
		state.uploadVideo = payload;
	},
}