<template>
    <div class="main">
        <div>
            <router-link :to="{ name: 'Login' }" class="user-name"
                >登录</router-link
            >
            <router-link :to="{ name: 'Register' }" class="collection"
                >注册</router-link
            >
        </div>
        <div>二手书交易系统主页</div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {},
};
</script>

<style>
</style>