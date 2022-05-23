<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">
                    {{ isLogin ? 'Sign in' : 'Sign up' }}
                </h1>
                <p class="text-xs-center">
                    <nuxt-link v-if="isLogin" to="/register" >Have an account?</nuxt-link>
                    <nuxt-link v-else to="/login" >Need an account?</nuxt-link>
                </p>

                <ul class="error-messages">
                    <template v-for="(messages, field) in errors">
                        <li v-for="(message, index) in messages" :key="index">
                            {{ field }} {{ message }}
                        </li>
                    </template>
                </ul>

                <form @submit.prevent="onSubmit">
                    <fieldset class="form-group" v-if="!isLogin">
                        <input class="form-control form-control-lg" type="text" placeholder="Username" v-model="user.username" required>
                    </fieldset>

                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email" required>
                    </fieldset>

                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" required minlength="6">
                    </fieldset>

                    <button class="btn btn-lg btn-primary pull-xs-right ">
                        {{ isLogin ? 'Sign in' : 'Sign up' }}
                    </button>
                </form>
            </div>

            </div>
        </div>
    </div>
</template>

<script>
import { login, register} from '@/api/user'
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    middleware: 'notAuthenticated',
    name: 'loginIndex',
    computed: {
        isLogin () {
            return this.$route.name === 'login'
        },
    },
    data () {
        return {
            user: {
                username: '',
                email: '',
                password: ''
            },
            errors: {},
        }
    },
    methods: {
        async onSubmit() {
            try {
                const { data } = this.isLogin 
                ? await login({
                    user: this.user
                })
                : await register({
                    user: this.user
                })

                // 保存用户的登录状态
                this.$store.commit('setUser', data.user)
                // 把用户登录状态存储到cookie，在页面刷新之后可以通过cookie初始化仓库中的user

                Cookie.set('user', JSON.stringify(data.user))

                this.$router.push('/')
            } catch (error) {
                this.errors = error.response.data.errors
            }
        }
    }
}
</script>
