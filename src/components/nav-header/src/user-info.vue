<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:30:45
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-23 09:52:01
 * @Description: file content
 * @FilePath: /pofi-admin/src/components/nav-header/src/user-info.vue
-->
<template>
  <div class="user-info">
    <span v-if="localTime" class="hg-text-sm hg-mr-10"
      >当前系统时间：{{ localTime }}</span
    >
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span style="margin-left: 8px; color: #fff">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-circle-close" @click="handleExitClick"
            >退出登录</el-dropdown-item
          >
          <!-- <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item> -->
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeUnmount } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'
import { timeNow } from '@/utils'

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.user.nickname)
    // 设置动态系统时间
    const localTime = ref()
    const instanceInterval = ref()
    instanceInterval.value = setInterval(() => {
      localTime.value = timeNow()
    }, 1000)
    onBeforeUnmount(() => {
      clearInterval(instanceInterval.value)
    })
    const router = useRouter()
    const handleExitClick = () => {
      // 移除本地缓存
      localCache.deleteCache('token')
      localCache.deleteCache('userInfo')
      localCache.deleteCache('userMenus')
      router.push('/login')
    }

    return {
      name,
      localTime,
      handleExitClick
    }
  }
})
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.user-info {
  display: flex;
  align-items: center;
}
</style>
