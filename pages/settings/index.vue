<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
                </fieldset>
                 <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image">
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from '@/api/user'
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    middleware: 'authenticated',
    name: 'SettingsIndex',
    data() {
      return {
        user: {
          email: '',
          image: '',
          bio: '',
          username: ''
        }
      }
    },
    methods: {
      async onSubmit() {
        try {
          const { data } = await updateUser({
            user: this.user
          })
          // 保存用户的登录状态
          this.$store.commit('setUser', data.user)
          // 把用户登录状态存储到cookie，在页面刷新之后可以通过cookie初始化仓库中的user
          Cookie.set('user', JSON.stringify(data.user))
          this.$router.push('/')
        } catch (error) {
          alert(error.response.data)
        }
      }
    }
}
</script>

<style>

</style>
