import {createStore} from "vuex";

export default createStore({
    state: {
        likes: 3,
        isAuth: false, //Означает, пользователь авторизован или нет

    },
    getters: {
        doubleLikes(state) {
            return state.likes * 2
        }
    },
    mutations: {
        incrementLikes(state) {
            state.likes += 1
        },
        decrementLikes(state) {
            state.likes -= 1
        }
    },
    actions: {
        
    },
    modules: {

    }
})