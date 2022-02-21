<!--
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-21 17:43:16
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/user/user.vue
-->
<template>
  <div class="user">
    <!-- 测试 style module的使用 -->
    <!-- <span :class="$style.red">测试style样式</span> -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      :storeTypeInfo="storeTypeInfo"
    >
      <template #createTime="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #lineTime="scope">
        <span>{{ $filters.formatTime(scope.row.onlineTime) }}</span>
      </template>
      <template #state="scope">
        <el-button
          @click="handleChangeValid(scope.row.id, scope.row.valid)"
          size="mini"
          :type="scope.row.valid ? 'success' : 'danger'"
          >{{ scope.row.valid ? '有效' : '无效' }}</el-button
        >
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfig"
      :operationName="operationName"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { useStoreName } from './hook/user-page-list'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { updateUserValid } from '@/service/main/user'
import { errorTip, infoTipBox, successTip } from '@/utils/tip-info'

export default defineComponent({
  name: 'users',
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    // 修改用户状态
    const handleChangeValid = (id: any, valid: any) => {
      infoTipBox({
        title: '设置用户账号状态',
        message: `确定将该用户状态设置成${valid ? '无效' : '有效'}吗？`
      }).then(() => {
        updateUserValid({
          id: id,
          valid: valid ? 0 : 1
        }).then((res: any) => {
          if (res.result === 0) {
            successTip(res.msg)
            handleResetClick()
          } else errorTip(res.msg)
        })
      })
    }
    return {
      storeTypeInfo,
      operationName,
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfig,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      handleChangeValid
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
