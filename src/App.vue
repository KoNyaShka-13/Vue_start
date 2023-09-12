<template> 
    <div class="app">
        <h1>Страница с постами</h1>
        <input type="text" v-model.trim="modificatorValue"><!--trim нужен для того, чтобы в модель не уходили пробелы-->
        <my-button 
            @click="showDialog"
            style="margin: 15px 0"
        >
            Создать пост
        </my-button>
        <my-dialog v-model:show="dialogVisible">
        <post-form
        @create="createPost"
        /><!--Вставляем сюда инпуты-->
        </my-dialog>
        <post-list 
        :posts="posts"
        @remove="removePost"
        />
    </div>
</template>


<script>
//Импортируем остальные чаасти кода
import PostForm from "@/components/PostForm";//@ - это элиас, он сразу ссылается на папку src, это удобно при большом количестве папок и пложенности
import PostList from "@/components/PostList";
import MyDialog from "./components/UI/MyDialog.vue";

export default {
    components: {
    PostList, PostForm,
    MyDialog
},
    data() {
        return {
            posts: [
                {id: 1, title: 'Java Script', body: 'Описание поста'},
                {id: 2, title: 'Java Script 2 часть', body: 'Описание поста номер 2'},
                {id: 3, title: 'Java Script 3 часть', body: 'Описание поста номер 3'},
            ],
            dialogVisible: false,
            modificatorValue: ''
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
    
        }
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