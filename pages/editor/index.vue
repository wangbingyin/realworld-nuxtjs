<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form >
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title">
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description">
              </fieldset>
              <fieldset class="form-group">
                  <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control tag-list" placeholder="Enter tags" v-model="article.tagStr">
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="onSubmit">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from '@/api/article'

export default {
    // 在路由匹配组件渲染之前会先执行中间件处理
    middleware: 'authenticated',
    name: 'EditorIndex',
    data() {
      return {
        article: {
          title: "",
          description: "",
          body: "",
          tagStr: "",
          tagList: []
        }
      }
    },
    computed: {
      getTagList() {
        return this.article.tagStr.split(',')
      }
    },
    methods: {
      async onSubmit() {
        this.article.tagList = this.getTagList
        const { data } = await createArticle({
          article: this.article
        })
        this.$router.push('/')
      }
    }
}
</script>

<style>

</style>
