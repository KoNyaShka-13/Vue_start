<template>
    <div class="btn">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'my-button'
    }
</script>

<style scoped>
    .btn {
        padding: 10px 15px;
        background: none;
        color: teal;
        border: 1px solid teal;
        border-radius: 8%;
    }
</style>