<template>
    <div>
        <h1>登录页</h1>
        <form action="/login" method="post" v-on:submit.prevent="loginAction" class="login-frame">
            <div class="login-item">
                <label>用户名：</label>
                <input name="username" type="text" v-model="user.username" />
            </div>
            <div class="login-item">
                <label>密码：</label>
                <input name="passwd" type="password" v-model="user.password"/>
            </div>
            <input type="submit" value="登录" class="login"/>
        </form>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data(){
        return {
            user: {
                username: '',
                password: ''
            }
        }
    }
}
</script>

