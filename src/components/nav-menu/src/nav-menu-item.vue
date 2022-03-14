<template>
  <!-- 递归实现无限子菜单 -->
  <template v-for="item in menuList" :key="item.id">
    <!-- 因为有子集和无子集渲染html标签不一样，所以要分为两种情况
           情况一：有子集的情况：                         -->
    <template v-if="item.children.length > 0">
      <el-submenu :index="item.id + ''">
        <template #title>
          <i v-if="item.icon" :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <nav-menu-item :menuList="item.children"></nav-menu-item>
      </el-submenu>
    </template>
    <!-- 情况二：没子集的情况 -->
    <el-menu-item v-else :index="item.id + ''" @click="handleMenuItem(item)">
      <i v-if="item.icon" :class="item.icon"></i>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useExpirationTime } from '@/hooks/use-expiration-time'
export default defineComponent({
  name: 'navMenuItem',
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const router = useRouter()
    const handleMenuItem = (item: any) => {
      useExpirationTime(router)
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return {
      handleMenuItem
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
  background-color: #001529 !important;
  // 二级菜单 ( 默认背景 )
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135 !important;
  }
}

::v-deep .el-submenu__title {
  background-color: #001529 !important;
}

// hover 高亮
.el-menu-item:hover {
  color: #fff !important; // 菜单
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  //height: calc(100% - 48px);
}
</style>
