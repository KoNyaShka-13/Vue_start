<template>
    <div class="dialog" v-if="show === true" @click.stop="hideDialog">
        <div @click.stop class="dialog__content"><!--@click.stop нужен для того, чтобы окно не звкрывалось просто так-->
            <slot >

            </slot>  <!--Слот нужен для того, чтобы модальное окно было динамически изменяемым-->
        </div>
    </div>
</template>

<script>
export default{
    name: 'my-dialog',
    props: {//Будет иметь булиновое значение, если будет тру, то будет показываться
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialog() {
            this.$emit('update:show',)
        }
    }
}
    
</script>

<style scoped>
    .dialog {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        display: flex;
    }

    .dialog__content {
        margin: auto;
        background: wheat;
        border-radius: 12px;
        min-height: 50px;
        min-width: 300px;
        padding: 10px;
    }
</style>