import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По содержимому'},
        ]
    }),
    getters: {
        sortedPosts(state) {//В данном случае геттеры принимают состояние
            return [...state.posts].sort((post1, post2) =>  post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
                
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))//Приводим поиск к одному регистру при помощи toLowerCase()
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
    }, 
    actions: {
        async fetchPosts({state, commit}) {//Оборачиваем в try/catch код для отлавливания ошибок
            try {
                commit('setLoading', true)//Если тру, то загрузка начнется
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    });
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                    commit('setPosts', response.data)//Получаем посты за место того, чтобы их создавать
            } catch (e) {
                console.log(e)
            } finally {
                commit('setLoading', false);//Данное условие нужно для тогго, чтобы слова 'Идет загрузка' исчезли, мы передаем параметр в пост-лист
            }
        },

        async loadMorePosts({state, commit}) {//Новая функция для подгрузки дополнительных постов на одной странице, когда закончилась определенная часть постов
            try {
                commit('setPage', state.page + 1)
//                this.isPostsLoading = true//Если тру, то загрузка начнется
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    });
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                    //Мы не перезаписываем посты, а добавляем еще данной функцией
                    commit('setPosts', [...state.posts, ...response.data]);            
            } catch (e) {
                console.log(e)
           } //finally {
//                this.isPostsLoading = false;//Данное условие нужно для тогго, чтобы слова 'Идет загрузка' исчезли, мы передаем параметр в пост-лист
//            }
        }
    },
    namespaced: true
}