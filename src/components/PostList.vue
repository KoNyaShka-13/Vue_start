<template>
    <div class="post" v-for="post in posts"><!--Работа с массивом внутри шаблона-->
        <div><strong>Название:</strong> {{ post.title }}</div><!--Создали шаблон для отображения массива-->
        <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
</template>

<script>//Пропсы в дочернем компоненте изменять нельзя, данные должны изменяться как-то в родителе, а дочерний компонент должен получать их в измененном виде, дочерний элемент на прямую пропсы не изменяет
    export default {
        props: {
            posts: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped> /** Для того, чтобы параметры использовались только для конкретного компонента*/
    .post {
        margin-bottom: 10px;
        padding: 15px;
        border: 2px solid teal;
    }
</style>