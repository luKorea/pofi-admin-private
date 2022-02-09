<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:30:55
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-09 10:34:12
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/login/cpns/login-account.vue
-->
<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="email">
        <el-input v-model="account.email" />
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="account.pwd" show-password />
      </el-form-item>
    </el-form>
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

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
