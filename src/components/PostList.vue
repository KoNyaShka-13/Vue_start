<template>
    <div>
        <h3>Список пользователей</h3>
        <post-item 
        v-for="post in posts" 
        :post="post"
        />


    </div>
    
</template>

<script>//Пропсы в дочернем компоненте изменять нельзя, данные должны изменяться как-то в родителе, а дочерний компонент должен получать их в измененном виде, дочерний элемент на прямую пропсы не изменяет
    import PostItem from '@/components/PostItem';
    export default {
        components: {PostItem},
        props: {
            posts: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped> /** Для того, чтобы параметры использовались только для конкретного компонента*/
    
</style>