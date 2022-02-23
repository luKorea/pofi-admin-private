<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:30:55
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-23 11:09:27
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/login/cpns/login-panel.vue
-->
<template>
  <!-- <h1 class="title">后台管理系统</h1> -->
  <login-account ref="accountRef" />
  <!-- <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs> -->
  <!-- <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link> -->
  <!-- </div> -->

  <!-- <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    > -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
// import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount
    // LoginPhone
  },
  setup() {
    // 1.定义属性
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    // const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')

    // 2.定义方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('phoneRef调用loginAction')
      }
    }

    return {
      isKeepPassword,
      accountRef,
      // phoneRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
// .login-panel {
//   position: fixed;
//   right: 0;
//   top: 0;
//   width: 50%;
//   height: 100%;
//   // background-color: #fff;
//   border-radius: 4px;
//   // background-color: antiquewhite;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
// }
</style>
