<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <transition-group name="post-list">
            <post-item 
                v-for="post in posts" 
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post)"
            />
        </transition-group>
        
    </div>
    <h2 v-else style="color: blueviolet">
        Cписок пуст
    </h2>
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
    .post-list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .post-list-enter-active,
    .post-list-leave-active {
        transition: all 0.5s ease;
    }
    .post-list-enter-form,
    .post-list-leave-to {
        opacity: 0;
        transform: translateX(130px);
    }
    .post-list-move {
        transition: transform 0.4s ease;
    }
</style>