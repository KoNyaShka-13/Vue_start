<template> 
    <div class="app">
        <post-form
        @create="createPost"
        /><!--Вставляем сюда инпуты-->
        <post-list 
        :posts="posts"
        
        />
    </div>
</template>


<script>
//Импортируем остальные чаасти кода
import PostForm from "@/components/PostForm";//@ - это элиас, он сразу ссылается на папку src, это удобно при большом количестве папок и пложенности
import PostList from "@/components/PostList";

export default {
    components: {//Регистрируем компоненты для работы кода
        PostList, PostForm
    },
    data() {
        return {
            posts: [
                {id: 1, title: 'Java Script', body: 'Описание поста'},
                {id: 1, title: 'Java Script 2 часть', body: 'Описание поста номер 2'},
                {id: 1, title: 'Java Script 3 часть', body: 'Описание поста номер 3'}
            ],
        }
    },
    methods: {
        createPost(post) {//Функция для нового поста
           this.posts.push(post);//Мы получили даные от дочернего элемента и отослали в массив
        },
//        InputTitle(event) {//Указываем параметр
//            this.title = event.target.value;//Мы модель синхронизируем с инпутом,чтобы данные из инпута отображались в консоли
//        }//Один из вариантов синхронизации , если в инпуте для создания текста указатьдоп параметр  @input="InputTitle" 
    }
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
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}
</style>