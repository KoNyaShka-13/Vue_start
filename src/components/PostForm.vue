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
    <form @submit.prevent><!--Один из способов отменить обычные действия браузера-->
        <h4>Создание поста</h4><!--Биндим, то есть связывем будущие значения наших инпутов с шаблоном тайтла и боди, для создания шаблонов-->
        <my-input
        v-focus
        v-model="post.title"
        type="text" 
        placeholder="Название"
        /> <!--@input нужен для того, чтобы введенная инфа в инпуут отображалась уже в консоли, байин связал консоль и инпут, изменения могли вноситься без ипута только со стороны консоли-->
        <my-input 
        v-model="post.body"
        type="text" 
        placeholder="Описание"
        />
        <my-button 
        style="align-self: flex-end;"
        @click="createPost"
        >
        Создать
        </my-button>
    </form>
</template>

<script>  
export default {
    data() {//Тут будут изменяться дочерние элементы, чтобы не изменять в пропсах
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        createPost() {  
            this.post.id = Date.now();
            this.$emit('create', this.post)
            this.post = {
                title:  '',//Очищаем данные после залива
                body:  ''
            }
            
        }
    },
   
    }
//}
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
    } 
    .btn {
        margin-top: 15px;
    }
</style>