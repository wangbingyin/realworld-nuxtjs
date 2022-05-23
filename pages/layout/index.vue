<template>
    <div>
        <!-- 顶部导航栏 -->
        <nav class="navbar navbar-light">
            <div class="container">
                <nuxt-link  class="navbar-brand" to="/">Home</nuxt-link>

                <ul class="nav navbar-nav pull-xs-right" style="display: inherit;">
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to="/" exact >Home</nuxt-link>
                    </li>

                    <template v-if="user">
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/editor">
                                <i class="ion-compose"></i>&nbsp;New Article
                            </nuxt-link>
                        </li> 

                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/settings">
                                <i class="ion-gear-a"></i>&nbsp;Settings
                            </nuxt-link>
                        </li>

                        <li class="nav-item">
                            <!-- <nuxt-link class="nav-link " :to="'/profile/' + user.username"> -->
                            <nuxt-link class="nav-link " :to="{ name: 'profile',params: { username: user.username } }">
                                <img class="user-pic" :src="user.image">
                                {{ user.username }}
                            </nuxt-link>
                        </li>

                        <li class="nav-item">
                            <div class="nav-link " @click="onSignOut">sign out</div>
                        </li>
                    </template>
                    
                    <template v-else>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
                        </li>

                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
                        </li>
                    </template>
                </ul>
            </div>
        </nav>

        <nuxt-child />

        <!-- 底部 -->
        <footer>
            <div class="container">
                <a class="logo-font ng-binding" ui-sref="app.home" ng-bind="::$ctrl.appName | lowercase" href="#/">conduit</a>
                <span class="attribution ng-binding">
                © 2022.
                An interactive learning project from <a href="https://thinkster.io">Thinkster</a>.
                Code licensed under MIT.
                </span>
            </div>
        </footer>   
    </div>
</template>

<script>
import { mapState } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    name: 'layoutIndex',
    computed: {
        ...mapState(['user'])
    },
    methods: {
        onSignOut() {
            this.$router.push('/')
            this.$store.commit('setUser', null)
            Cookie.remove('user')
        }
    }
}
</script>
