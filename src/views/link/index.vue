<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-21 16:28:29
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-21 17:23:35
 * @FilePath: /pofi-admin-private/src/views/link/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="link-wrap" v-if="showPage">
    <div class="link-item">
      <template v-for="(item, index) in linkList" :key="index">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span style="color: #3c3c3c; font-weight: bold">{{
                item.title
              }}</span>
            </div>
          </template>
          <el-row :gutter="12">
            <template v-for="(i, child) in item.list" :key="child">
              <el-col v-bind="colLayout">
                <el-card shadow="hover" class="box-item" @click="goPage(i.url)">
                  <div :title="i.title">{{ i.title }}</div>
                </el-card>
              </el-col>
            </template>
          </el-row>
        </el-card>
      </template>
    </div>
  </div>

  <page-dialog
    :showClose="false"
    ref="passwordRef"
    title="访问密码"
    showWidth="40%"
  >
    <el-input
      v-model.trim="pwd"
      placeholder="请输入访问密码"
      show-password
      type="password"
      clearable
      @keydown.enter="resetPassword"
    ></el-input>
    <div class="hg-flex hg-mt-3 hg-justify-end">
      <el-button type="primary" size="mini" @click="resetPassword"
        >确认</el-button
      >
    </div>
  </page-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import { errorTip } from '@/utils/tip-info'
export default defineComponent({
  setup() {
    const colLayout = ref<any>({
      xl: 4, // >1920px 4个
      lg: 6,
      md: 12,
      sm: 24,
      xs: 24
    })
    const pwd = ref<any>('')
    const passwordRef = ref<any>(null)
    const showPage = ref<boolean>(false)
    const linkList = ref<any>([
      {
        title: 'Pofi Create',
        list: [
          { title: '正式服', url: 'https://prod-cmd.pofiart.com/' },
          { title: '预上线服', url: 'https://pe-cms.pofiart.com/' },
          { title: '审核服', url: 'https://pure-cms.pofiart.com/' },
          { title: '测试服', url: 'https://tcms.pofiart.com/' }
        ]
      },
      {
        title: 'Pofi 无限人偶 v4.0',
        list: [{ title: '测试服', url: 'http://tcms.pofiapp.com/' }]
      },
      {
        title: 'Pofi 无限人偶 v3.0',
        list: [
          { title: '正式服', url: 'http://pro-cms.pofiapp.com/admin/index/' },
          { title: '开发服', url: 'http://dev-cms.pofiapp.com/admin/index/' },
          { title: '预发布服', url: 'http://pre-cms.pofiapp.com/admin/index/' }
        ]
      },
      {
        title: 'Pofi 无限人偶 v2.0',
        list: [
          { title: '正式服', url: 'http://cms.pofiapp.com/' },
          { title: '开发服', url: 'http://internal.cms.pofiapp.com/' },
          { title: '测试服', url: 'http://beta.cms.pofiapp.com/' }
        ]
      },
      {
        title: 'Pofi 小工具',
        list: [
          {
            title: 'Pofi 工具合集',
            url: 'https://cxdosx.moe/pofi/pofi-tools/'
          }
        ]
      }
    ])

    const goPage = (url: string) => {
      window.open(url, '_blank')
    }
    const showPasswordDialog = (flag: boolean) => {
      if (passwordRef.value) {
        passwordRef.value.dialogVisible = flag
      }
    }
    nextTick(() => {
      showPasswordDialog(true)
    })
    const resetPassword = () => {
      if (pwd.value === 'pofievent') {
        showPasswordDialog(false)
        showPage.value = true
      } else {
        showPage.value = false
        errorTip('访问密码错误')
      }
    }
    return {
      showPage,
      colLayout,
      linkList,
      goPage,
      pwd,
      passwordRef,
      resetPassword
    }
  }
})
</script>

<style scoped lang="less">
.link-wrap {
  width: 100%;
  min-height: 100%;
  background-color: #f1f4f9;
  .link-item {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    .box-card {
      width: 90%;
      margin-bottom: 20px;
    }
    .box-item {
      cursor: pointer;
      margin-bottom: 10px;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
