<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:30:36
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-23 11:22:31
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/login/login.vue
-->
<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/login-panel.vue'

export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.png') no-repeat;
  // background-position: center;
}
</style>
