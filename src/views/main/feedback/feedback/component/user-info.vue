<template>
  <el-descriptions
    title="用户基本信息"
    direction="vertical"
    :column="5"
    border
    size="small"
  >
    <el-descriptions-item label="用户名">{{
      userInfo.nickName
    }}</el-descriptions-item>
    <el-descriptions-item label="用户头像">
      <page-image :img-src="userInfo.head"></page-image>
    </el-descriptions-item>
    <el-descriptions-item label="手机号">{{
      userInfo.phone
    }}</el-descriptions-item>
    <el-descriptions-item label="年龄">{{ userInfo.age }}</el-descriptions-item>
    <el-descriptions-item label="性别">{{
      userInfo.gender === 2 ? '女' : userInfo.gender === 1 ? '男' : '其他'
    }}</el-descriptions-item>
    <el-descriptions-item label="用户UID">{{
      userInfo.uid
    }}</el-descriptions-item>
    <el-descriptions-item label="设备串号">{{
      userInfo.imei
    }}</el-descriptions-item>
    <el-descriptions-item label="最近登录设备">{{
      !userInfo.osType ? '/' : userInfo.osType == 0 ? 'Android' : 'IOS'
    }}</el-descriptions-item>
    <el-descriptions-item label="LOGIN KEY">{{
      userInfo.loginKey
    }}</el-descriptions-item>
    <el-descriptions-item label="VIP到期时间">{{
      userInfo.vipEndDate
    }}</el-descriptions-item>
    <el-descriptions-item label="注册时间">{{
      userInfo.regTime
    }}</el-descriptions-item>
    <el-descriptions-item label="注册设备">{{
      !userInfo.osType ? '/' : userInfo.osType == 0 ? 'Android' : 'IOS'
    }}</el-descriptions-item>
    <el-descriptions-item label="注册渠道">{{
      userInfo.channel === '' ? '/' : userInfo.channel
    }}</el-descriptions-item>
    <el-descriptions-item label="最近登录时间">{{
      userInfo.onlineTime
    }}</el-descriptions-item>
    <el-descriptions-item label="当前版本号">{{
      userInfo.version === '' ? '/' : userInfo.version
    }}</el-descriptions-item>
  </el-descriptions>
  <el-descriptions
    title="统计"
    direction="vertical"
    :column="3"
    border
    size="small"
    class="hg-mt-5"
  >
    <el-descriptions-item label="充值次数">{{
      userInfo.rechargeNum ?? 0
    }}</el-descriptions-item>
    <el-descriptions-item label="收藏数">{{
      userInfo.collect ?? 0
    }}</el-descriptions-item>
    <el-descriptions-item label="评论数">{{
      userInfo.commentNum ?? 0
    }}</el-descriptions-item>
    <el-descriptions-item label="被举报数">{{
      userInfo.beReported ?? 0
    }}</el-descriptions-item>
    <el-descriptions-item label="封号数">{{
      userInfo.banNum ?? 0
    }}</el-descriptions-item>
    <el-descriptions-item label="口头警告数">{{
      userInfo.warningGagNum ?? 0
    }}</el-descriptions-item>
    <el-descriptions-item label="禁言数">{{
      userInfo.banTaklGagNum ?? 0
    }}</el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'feedbackUserInfo',
  props: {
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
