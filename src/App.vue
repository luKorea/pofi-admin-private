<!--
 * @Author: korealu
 * @Date: 2022-02-09 09:56:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-25 11:29:31
 * @Description: file content
 * @FilePath: /pofi-admin/src/App.vue
-->
<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  props: {
    name: {
      type: String
    }
  },
  setup() {
    const router = useRouter()
    watchEffect(() => {
      router.beforeEach((to, from, next) => {
        // 开启进度条
        NProgress.start()
        next()
      })
      router.afterEach(() => {
        // 关闭进度条
        NProgress.done()
      })
    })
    return {
      zhCn
    }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
<style>
#nprogress .bar {
  background: linear-gradient(90deg, #abdcff, #0396ff) !important;
}
</style>
