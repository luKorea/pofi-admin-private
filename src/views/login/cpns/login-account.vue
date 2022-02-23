<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:30:55
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-23 11:30:43
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/login/cpns/login-account.vue
-->
<template>
  <div class="login-panel">
    <el-card class="login-account">
      <template #header>
        <div class="hg-text-blue-500">
          <span>POFI 后台管理系统</span>
        </div>
      </template>
      <el-form :rules="rules" status-icon :model="account" ref="formRef">
        <el-form-item prop="email">
          <el-input
            clearable
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            v-model="account.email"
          />
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            clearable
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="account.pwd"
            show-password
          />
        </el-form-item>
      </el-form>
      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      </div>

      <el-button type="primary" class="login-btn" @click="handleLoginClick"
        >立即登录</el-button
      >
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'

import { rules } from '../config/account-config'

export default defineComponent({
  setup() {
    // 1.定义属性
    const isKeepPassword = ref(true)
    const store = useStore()

    const account = reactive({
      email: localCache.getCache('email') ?? '',
      pwd: localCache.getCache('pwd') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('email', account.email)
            localCache.setCache('pwd', account.pwd)
          } else {
            localCache.deleteCache('email')
            localCache.deleteCache('pwd')
          }

          // 2.开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
    const handleLoginClick = () => {
      loginAction(isKeepPassword.value)
    }

    return {
      isKeepPassword,
      handleLoginClick,
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style>
.el-input__suffix {
  color: #409eff;
}
</style>
<style scoped lang="less">
.login-panel {
  width: 30%;
  // height: 100%;
  // background-color: #fff;
  border-radius: 4px;
  // background-color: antiquewhite;
  display: flex;
  flex-direction: column;
}
.login-account {
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-direction: column;
  // // justify-content: center;
  // align-items: center;
}
.login-title {
  width: 100%;
  text-align: center;
  line-height: 40px;
}
.account-control {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}
.login-btn {
  width: 100%;
}
</style>
