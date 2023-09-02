<template>
    <!--<div>
        <div>
            <button v-on:click="addLike">Like</button> Вешаем обработчик событий, есть два вида, они указаны-->
            <!--<button @click="addDislike">Dislike</button> Указываем назавание функции в обработчике-->
        <!--</div>

        <div>Кол-во лайков: <strong>{{ likes }}</strong></div> Связываем показатель с параметром из объекта-->
        <!--<div>Кол-во дизлайков: <strong>{{ dislikes }}</strong></div>
    </div>-->
    <!--Создаем форму для создания статей по шаблону-->
    <form class="app">
        <h4>Создание поста</h4><!--Баиндим, то есть связывем будущие значения наших инпутов с шаблоном тайтла и боди, для создания шаблонов-->
        <input
         v-bind:value="title"
         @input="InputTitle" 
         class="input" type="text" 
         placeholder="Название"
         > <!--@input нужен для того, чтобы введенная инфа в инпуут отображалась уже в консоли, байин связал консоль и инпут, изменения могли вноситься без ипута только со стороны консоли-->
        <input 
        v-bind:value="body" 
        class="input" 
        type="text" 
        placeholder="Описание"
        >
        <button class="btn" @click="CreatePost">Создать</button>
    </form>
    <div>
        <div class="post" v-for="post in posts"><!--Работа с массивом внутри шаблона-->
            <div><strong>Название:</strong> {{ post.title }}</div><!--Создали шаблон для отображения массива-->
            <div><strong>Описание:</strong> {{ post.body }}</div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            posts: [
                {id: 1, title: 'Java Script', body: 'Описание поста'},
                {id: 1, title: 'Java Script 2 часть', body: 'Описание поста номер 2'},
                {id: 1, title: 'Java Script 3 часть', body: 'Описание поста номер 3'}
            ],
            title: '',
            body: '',
        }
    },
    methods: {
        createPost() {

        },
        InputTitle(event) {//Указываем параметр
            this.title = event.target.value;//Мы модель синхронизируем с инпутом,чтобы данные из инпута отображались в консоли
        }//Один из вариантов синхронизации , если в инпуте для создания текста указатьдоп параметр  @input="InputTitle" 
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
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

.post {
    margin-bottom: 10px;
    padding: 15px;
    border: 2px solid teal;
}

.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin: 10px 0 10px 0;
}

.btn {
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
    border-radius: 8%;
}
</style>