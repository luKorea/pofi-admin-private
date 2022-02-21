<!--
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-21 13:42:28
 * @Description: 功能完成
 * @FilePath: /pofi-admin/src/views/main/oa/permission/permission.vue
-->
<template>
  <div class="oa-permission">
    <!-- <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    /> -->
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="permissions"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @selectAllBtnClick="test"
      :storeTypeInfo="storeTypeInfo"
    >
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="permissions"
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

export default defineComponent({
  name: 'permission',
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      storeTypeInfo,
      operationName,
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      modalConfig
    }
  }
})
</script>

<style scoped></style>
