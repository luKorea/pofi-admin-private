<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:30:45
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-12 13:51:42
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
          <el-dropdown-item
            icon="el-icon-lock"
            @click="showPasswordDialog(true)"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item
            icon="el-icon-circle-close"
            divided
            @click="handleExitClick"
            >退出登录</el-dropdown-item
          >
          <!-- <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item> -->
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <page-dialog ref="passwordRef" title="修改密码" showWidth="20%">
      <el-input
        v-model.trim="pwd"
        placeholder="请输入新的密码"
        show-password
        type="password"
        clearable
      ></el-input>
      <div class="hg-flex hg-mt-3 hg-justify-end">
        <el-button size="mini" @click="showPasswordDialog(false)"
          >取消</el-button
        >
        <el-button type="primary" size="mini" @click="resetPassword"
          >确认</el-button
        >
      </div>
    </page-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeUnmount } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'
import { timeNow } from '@/utils'
import { infoTipBox, errorTip, successTip } from '@/utils/tip-info'
import { editPassword } from '@/service/login/login'

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
      infoTipBox({
        title: '退出登录',
        message: '您确定退出登录吗'
      }).then(() => resetInfo())
    }
    const resetInfo = () => {
      // 移除本地缓存
      localCache.deleteCache('token')
      localCache.deleteCache('userInfo')
      localCache.deleteCache('userMenus')
      localCache.deleteCache('routerList')
      localCache.deleteCache('isAdmin')
      router.push('/login')
      location.reload()
    }
    // 修改密码
    const pwd = ref<any>()
    const passwordRef = ref<any>()
    const showPasswordDialog = (flag: boolean) => {
      if (passwordRef.value) {
        passwordRef.value.dialogVisible = flag
      }
    }
    const resetPassword = () => {
      if (!pwd.value) {
        errorTip('请输入新的密码')
        return
      } else {
        editPassword(pwd.value).then((res) => {
          if (res.result === 0) {
            successTip('修改密码成功')
            // localCache.deleteCache('pwd')
            // resetInfo()
            showPasswordDialog(false)
            pwd.value = ''
          } else errorTip(res.msg)
        })
      }
    }

    return {
      name,
      localTime,
      handleExitClick,
      pwd,
      passwordRef,
      showPasswordDialog,
      resetPassword
    }
  }
})
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.user-info {
  display: flex;
  align-items: center;
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #ecf5ff;
  color: #79bbff;
}
</style>
