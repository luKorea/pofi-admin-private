<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:30:55
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-05 14:10:20
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/login/cpns/login-account.vue
-->
<template>
  <div class="login-panel">
    <el-card class="login-account" shadow="always">
      <template #header>
        <div class="hg-text-blue-500">
          <span>POFI 后台管理系统</span>
        </div>
      </template>
      <template v-if="!codeLogin">
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
      </template>
      <!-- 填验证码 -->
      <template v-else>
        <el-form
          :rules="codeRules"
          status-icon
          :model="codeAccount"
          ref="formCodeRef"
        >
          <el-form-item>
            <el-input
              clearable
              prefix-icon="el-icon-user"
              placeholder="用户手机号"
              disabled
              v-model="codeAccount.phone"
            />
          </el-form-item>
          <el-form-item prop="code">
            <el-row :gutter="12">
              <el-col :span="16">
                <el-input
                  clearable
                  prefix-icon="el-icon-lock"
                  placeholder="请输入验证码"
                  v-model="codeAccount.code"
                  style="width: 100%"
              /></el-col>
              <el-col :span="8">
                <el-button
                  type="primary"
                  :disabled="!showCode"
                  @click="sendCode"
                  style="width: 100%"
                >
                  <span v-if="showCode">发送验证码</span>
                  <span v-else>{{ count }}s后重新获取</span>
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="login-btn" @click="handleLoginCode"
          >验证码登录</el-button
        >
      </template>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'

import { rules, codeRules } from '../config/account-config'
import { useRouter } from 'vue-router'
import { errorTip } from '@/utils/tip-info'
import { getCode, accountCodeLogin } from '@/service/login/login'

export default defineComponent({
  setup() {
    // 是否需要验证码登录
    const codeLogin = ref<boolean>(false)
    // 发送验证码
    const showCode = ref<boolean>(true)
    const count = ref<number>(0)
    const timer = ref<any>(null)
    // 1.定义属性
    const isKeepPassword = ref(true)
    const store = useStore()

    const account = reactive({
      email: localCache.getCache('email') ?? '',
      pwd: localCache.getCache('pwd') ?? ''
    })
    const codeAccount = ref<any>({
      phone: '',
      code: ''
    })
    const router = useRouter()

    const formRef = ref<InstanceType<typeof ElForm>>()
    const formCodeRef = ref<InstanceType<typeof ElForm>>()
    // 登录
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
          store
            .dispatch('login/accountLoginAction', { ...account })
            .then((res) => {
              console.log(res, '数据怒')
              if (res.env !== 2) {
                if (res.token === 'null') {
                  codeLogin.value = true
                  codeAccount.value.phone = res.result
                  sendCode()
                } else {
                  router.push('/main')
                }
              } else {
                router.push('/main')
              }
            })
            .catch((err) => errorTip(err))
        }
      })
    }
    const handleLoginClick = () => {
      loginAction(isKeepPassword.value)
    }
    // 验证码登录
    const sendCode = () => {
      getCode(codeAccount.value.phone)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.log(err))
      // 验证码倒计时
      if (!timer.value) {
        count.value = 60
        showCode.value = false
        timer.value = setInterval(() => {
          if (count.value > 0 && count.value <= 60) {
            count.value--
          } else {
            showCode.value = true
            clearInterval(timer.value)
            timer.value = null
          }
        }, 1000)
      }
    }
    const handleLoginCode = () => {
      formCodeRef.value?.validate((valid) => {
        if (valid) {
          accountCodeLogin(codeAccount.value).then((res) => {
            if (res.result === 0) {
              router.push('/main')
            } else errorTip(res.msg)
          })
        }
      })
    }
    return {
      isKeepPassword,
      handleLoginClick,
      account,
      rules,
      formRef,
      codeLogin,
      formCodeRef,
      loginAction,
      codeAccount,
      codeRules,
      handleLoginCode,
      showCode,
      count,
      sendCode
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
  width: 500px;
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
