<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-04-20 09:33:38
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-13 09:41:48
 * @FilePath: /pofi-admin-private/src/components/nav-menu/src/nav-menu-item.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 递归实现无限子菜单 -->
  <template v-for="item in menuList" :key="item.id">
    <!-- 因为有子集和无子集渲染html标签不一样，所以要分为两种情况
           情况一：有子集的情况：                         -->
    <template v-if="item.children.length > 0">
      <el-submenu
        :index="item.id + ''"
        :style="{ backgroundColor: currentEnv === 4 ? '#88001F' : '#001529' }"
      >
        <template #title>
          <i v-if="item.icon" :class="item.icon" style="color： #fff"></i>
          <span>{{ item.title }}</span>
        </template>
        <nav-menu-item :menuList="item.children"></nav-menu-item>
      </el-submenu>
    </template>
    <!-- 情况二：没子集的情况 -->
    <el-menu-item
      v-else
      :index="item.id + ''"
      @click="handleMenuItem(item)"
      :class="item.id == selectIndex && currentEnv === 4 && 'select'"
      :style="{ backgroundColor: currentEnv === 4 ? '#A40026' : '#0c2135' }"
    >
      <i v-if="item.icon" :class="item.icon"></i>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useExpirationTime } from '@/hooks/use-expiration-time'
import { useStore } from '@/store'
export default defineComponent({
  name: 'navMenuItem',
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    defaultValue: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const currentEnv = computed(() => store.state.login.userInfo.env)
    const selectIndex = ref<any>()
    watchEffect(() => {
      if (props.defaultValue) {
        selectIndex.value = props.defaultValue
      }
    })
    const handleMenuItem = (item: any) => {
      selectIndex.value = item.id
      useExpirationTime(router)
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return {
      handleMenuItem,
      currentEnv,
      selectIndex
    }
  }
})
</script>

<style lang="less">
.el-menu {
  border-right: none;
}

// 目录
.el-submenu {
  // background-color: #001529 !important;
  // 二级菜单 ( 默认背景 )
  .el-menu-item {
    padding-left: 50px !important;
    // background-color: #0c2135 !important;
  }
}

::v-deep .el-submenu__title {
  // background-color: #001529 !important;
}

// hover 高亮
.el-menu-item:hover {
  color: #fff !important; // 菜单
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}
.el-menu-item.is-select {
  background-color: #0a60bd !important;
}
.el-menu-item.select {
  background-color: #c5002e !important;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  //height: calc(100% - 48px);
}
.el-submenu [class^='el-icon-'] {
  color: #fff !important;
}
</style>
