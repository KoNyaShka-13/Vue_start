<template> 
    <div>
        <h1>Страница с постами</h1>
        <my-input
            v-model="searchQuery"
            placeholder="Поиск......."
        />
        <div class="app__btns">
            <my-button 
                @click="showDialog"  
            >
                Создать пост
            </my-button>
            <my-select
                v-model="selectedSort"
                :options="sortOptions"
            />    
        </div>   
        <my-dialog v-model:show="dialogVisible">
            <post-form
                @create="createPost"
            /><!--Вставляем сюда инпуты-->
        </my-dialog>
        <post-list 
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка...</div>
        <!--Определяем, долистал ли пользователь до конца страницы-->
        <div v-intersection="{name: 'Оно работает!'}" class="observer"></div><!--Получаем доступ на прямую к ДОМ элементу, чтобы потом можно было показать observer за чем нужно следить, чтобы сработало автоматическое  добавление постов-->
<!--        <div class="page__wrapper">
            <div v-for="pageNumber in totalPages" 
            :key="pageNumber"
            class="page"
            :class="{
                'current-page': page === pageNumber
            }"
            @click="changePage(pageNumber)"
            >
            {{ pageNumber }}
        </div>--><!--В качестве ключа используется номер страницы-->
<!--        </div>-->
    </div>
</template>

<script>
//Импортируем остальные части кода
import PostForm from "@/components/PostForm";//@ - это элиас, он сразу ссылается на папку src, это удобно при большом количестве папок и пложенности
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog.vue";
import axios from 'axios';

export default {
    components: {
    PostList, PostForm,
    MyDialog
},
    data() {
        return {
            posts: [],
            dialogVisible: false,
            //modificatorValue: ''//Зачем-то он тут стоял
            isPostsLoading: false,// Нужен для отслеживания загрузки постов
            selectedSort: '',
            searchQuery: '',
            page: 1,//Начальное количество страниц
            limit: 10,//Лимит постов на одной странице
            totalPages: 0,//Общее количество страниц, которое будет вычисляться ниже
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
            ]
        }
    },
    methods: {
        createPost(post) {//Функция для нового поста
           this.posts.push(post);//Мы получили даные от дочернего элемента и отослали в массив
            this.dialogVisible = false;//После создания поста, окно закроется
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)//Перезаписываем, тем самым удаляем пост
        },
        showDialog() {
            this.dialogVisible = true; 
        },
//        changePage(pageNumber) {
//            this.page = pageNumber;//какая страница, такой и номер страницы
//        //    this.fetchPosts();//В зависимости от номера страницы, будут подгружаться посты
//        //Убрали строчку выше, так как посты будут подгружаться при помощи обработчика watch, что находится ниже
//        },
        async fetchPosts() {//Оборачиваем в try/catch код для отлавливания ошибок
            try {
                this.isPostsLoading = true//Если тру, то загрузка начнется
                
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = response.data;//Получаем посты за место того, чтобы их создавать
            
            } catch (e) {
                alert('ошибка')
            } finally {
                this.isPostsLoading = false;//Данное условие нужно для тогго, чтобы слова 'Идет загрузка' исчезли, мы передаем параметр в пост-лист
            }
        },

        async loadMorePosts() {//Новая функция для подгрузки дополнительных постов на одной странице, когда закончилась определенная часть постов
            try {
                this.page +=1;
//                this.isPostsLoading = true//Если тру, то загрузка начнется
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    //Мы не перезаписываем посты, а добавляем еще данной функцией
                    this.posts = [...this.posts, ...response.data];            
            } catch (e) {
                alert('ошибка')
           } //finally {
//                this.isPostsLoading = false;//Данное условие нужно для тогго, чтобы слова 'Идет загрузка' исчезли, мы передаем параметр в пост-лист
//            }
        }
//        InputTitle(event) {//Указываем параметр
//            this.title = event.target.value;//Мы модель синхронизируем с инпутом,чтобы данные из инпута отображались в консоли
//        }//Один из вариантов синхронизации , если в инпуте для создания текста указатьдоп параметр  @input="InputTitle" 
    }, 
    mounted() {
        this.fetchPosts();//Добавляем их, чтобы посты подгрузились сразу с обновление страницы
        console.log(this.$refs.observer);//Чтобы получить на прямую ДОМ-элемент
    },

    computed: {//Здесь мы разворачиваем новый массив, который будет изменяться, то есть нужный массив без изменений остается
        sortedPosts() {
            return [...this.posts].sort((post1, post2) =>  post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
                
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))//Приводим поиск к одному регистру при помощи toLowerCase()
        }
    },

    watch: {//В данном случае именно wath будет отрабатывать 
//        page() {
//            this.fetchPosts()
//        }
    }
    //watch: {//Сравнивание, она мутирует всеь массив
//        post: {
//            handler(newVal) {
//                console.log(newVal)
//            },
//            deep: true//Глубокое отслеживание, то есть любое изменение будет сразу отображаться, даже в массиве
             //selectedSort(newValue) {
             //   this.posts.sort((post1, post2) => {
             //       return post1[newValue]?.localeCompare(post2[newValue])//Просто сравнивает две строки
             //   })
             //},
            //}
//    data() {
//        return {
//            likes: 0,
//            dislikes: 0,
//        }
//    },
//    methods: {
//        addLike() {
//            this.likes +=1;//this нужен для указания параметра
//        },
//        addDislike() {
//            this.dislikes +=1;
//        }
//    }
}
</script>

<style>
.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}
.page__wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border: 1px solid black;
    padding: 10px;
}
.current-page {
    border: 2px solid teal;
}


</style>