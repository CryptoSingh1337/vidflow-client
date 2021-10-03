import data from "@/assets/data/videos";

export const state = () => ({
    loggedIn: false,
    videos: data,
})

export const mutations = {
    handleSignInOut(state) {
        state.loggedIn = !state.loggedIn;
    }
}

export const getters = {
    getVideoById: (state) => (id) => {
        return state.videos.find((video) => video.id == id);
    }
}
