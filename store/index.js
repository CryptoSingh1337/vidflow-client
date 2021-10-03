export const state = () => ({
    loggedIn: false,
    drawer: true,
})

export const mutations = {
    handleSignInOut(state) {
        state.loggedIn = !state.loggedIn;
    },
    handleDrawer(state) {
        state.drawer = !state.drawer;
    }
}
