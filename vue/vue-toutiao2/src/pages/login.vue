<template>
    <div>
        <h2>这是登录页</h2>
        <button @click="login">
            登录
        </button>
    </div>
</template>
<script>
export default {
    methods: {
        login(){
            document.cookie = 'uid=123456';
            this.$router.back()
            console.log('document.cookie', document.cookie)
        }
    }
}
</script>
