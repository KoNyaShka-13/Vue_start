<template>
    <div class="post"><!--Работа с массивом внутри шаблона-->
        <div>
<!--            <div>{{ post.id }}</div> 
-->    
            <div><strong>Название:</strong> {{ post.title }}</div><!--Создали шаблон для отображения массива-->
            <div><strong>Описание:</strong> {{ post.body }}</div>
        </div>
        <div class="post__btns">
            <my-button
            @click="$router.push(`/posts/${post.id}`)"
            ><!--Необходимо упомянуть, что путь нужно прописывать при помощи `` таких кавычек, а не обычных, иначе путь не будет работать-->
            Открыть
        </my-button>
            <my-button
            @click="$emit('remove', post)"
            >
            Удалить
        </my-button>
        </div>
    </div>
</template>

<script> 
    export default {
        props: {
            post: {
                type: Object,
                required: true,
                
            }
        }
    }
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post__btns {
  display: flex;
}
</style>