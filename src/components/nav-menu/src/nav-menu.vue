<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-04-20 09:33:38
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-13 09:42:34
 * @FilePath: /pofi-admin-private/src/components/nav-menu/src/nav-menu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="nav-menu"
    :style="{ backgroundColor: currentEnv === 4 ? '#88001F' : '#001529' }"
  >
    <el-menu
      :default-active="currentEnv !== 4 && defaultValue"
      class="el-menu-vertical"
      :collapse="collapse"
      :background-color="currentEnv === 4 ? '#A40026' : '#0c2135'"
      text-color="#fff"
      :active-text-color="currentEnv === 4 ? '#C5002E' : '#0a60bd'"
    >
      <nav-menu-item
        :menuList="userMenus"
        :defaultValue="defaultValue"
      ></nav-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

import { pathMapToMenu } from '@/utils/map-menus'
import navMenuItem from './nav-menu-item.vue'

export default defineComponent({
  components: {
    navMenuItem
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // store
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)
    const currentEnv = computed(() => store.state.login.userInfo.env)
    // route
    const route = useRoute()
    const currentPath = route.path

    // data
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu.id + '')
    return {
      userMenus,
      defaultValue,
      currentEnv
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
}
</style>
