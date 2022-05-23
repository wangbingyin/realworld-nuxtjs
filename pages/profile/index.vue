<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn action" 
              v-if="profile.username !== user.username" 
              :class="{ active: profile.following}"
              @click="followUser"
              :disabled="profile.followDisabled"
            >
              <i v-if="!profile.following" class="ion-plus-round"></i>
              <i v-else class="ion-minus-round"></i>
              &nbsp;
              {{ !profile.following ? 'Follow' : 'Unfollow' }}  {{ profile.username }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <div class="nav-link" :class="{ active: tab === 'my_articles' }" @click="tab = 'my_articles'">My Articles</div>
              </li>
              <li class="nav-item">
                <div class="nav-link" :class="{ active: tab === 'favorited_articles' }" @click="tab = 'favorited_articles'">Favorited Articles</div>
              </li>
            </ul>
          </div>

          <div v-if="tab === 'my_articles'" class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <img :src="article.author.image" />
              <div class="info">
                <div  class="author">{{ article.author.username }}</div>
                <!-- <a href="" class="author">Eric Simons</a> -->
                <span class="date">{{ article.updatedAt | date('MMM DD, YYYY')  }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" 
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link class="preview-link" :to="{ name: 'article', params: {  slug: article.slug } }">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <div v-if="tab === 'favorited_articles' && article.favorited" class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <img :src="article.author.image" />
              <div class="info">
                <div  class="author">{{ article.author.username }}</div>
                <span class="date">{{ article.updatedAt | date('MMM DD, YYYY')  }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" 
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link class="preview-link" :to="{ name: 'article', params: {  slug: article.slug } }">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getProfile, followUser, unfollowUser } from '@/api/profile'
import { getArticles, addFavorite, deleteFavorite } from '@/api/article'
import { mapState } from 'vuex'

export default {
    middleware: 'authenticated',
    name: 'UserProfile',
    data() {
      return {
        tab: 'my_articles'
      }
    },
    computed: {
      ...mapState(['user']),
    },
    async asyncData({ params }) {
      const { username } = params

      const [ profileRes, articleRes ] = await Promise.all([
        getProfile(username),
        getArticles({
          author: username
        })
      ])

      const { profile } = profileRes.data
      const { articles } = articleRes.data
      
      profile.followDisabled = false
      articles.forEach(article => article.favoriteDisabled = false)

      return {
        profile,
        articles
      }
    },
    methods: {
      async onFavorite (article) {
        article.favoriteDisabled = true
        if (article.favorited) {
          // 取消点赞
          await deleteFavorite(article.slug)
          article.favorited = false
          article.favoritesCount += -1
        } else {
          // 添加点赞
          await addFavorite(article.slug)
          article.favorited = true
          article.favoritesCount += 1
        }
        article.favoriteDisabled = false
      },
      async followUser() {
        this.profile.followDisabled = true
        if(!this.profile.following) {
          // 关注
          await followUser(this.profile.username)
          this.profile.following = true
        } else {
          // 取消关注
          await unfollowUser(this.profile.username)
          this.profile.following = false
        }
        this.profile.followDisabled = false
      }
    }
}
</script>

<style>

</style>
