<template>
    <div class="login">
        <div>
            <el-input
                placeholder="请输入用户名"
                v-model="name"
                clearable
            ></el-input>
            <span v-if="error.name" class="err-msg">{{ error.name }}</span>
        </div>
        <div>
            <el-input
                placeholder="请输入密码"
                v-model="pwd"
                show-password
            ></el-input>
            <span v-if="error.pwd" class="err-msg">{{ error.pwd }}</span>
        </div>
        <div>
            <el-button type="primary" @click="register">注册</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            name: "",
            pwd: "",
            error: {
                name: "",
                pwd: "",
            },
        };
    },
    methods: {
        register() {
            const { name, pwd, $router } = this;
            this.$router.push({
                name: "Main",
                params: {
                    username: this.name,
                },
            });
        },
    },
};
</script>

<style>
</style>