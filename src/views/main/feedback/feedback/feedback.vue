<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 17:13:40
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/condition/condition.vue
-->
<template>
  <div class="condition" v-if="0">
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="limit"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="limit"
      :modalConfig="modalConfig"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'feedback',
  setup() {
    const storeTypeInfo = ref({
      actionName: 'conditionModule/getPageListAction',
      actionListName: 'conditionModule/pageListData',
      actionCountName: 'conditionModule/pageListCount',
      deleteAction: 'conditionModule/deletePageDataAction'
    })
    const operationName = ref({
      editName: 'conditionModule/editPageDataAction',
      createName: 'conditionModule/createPageDataAction'
    })
    const [pageContentRef] = usePageSearch()
    const otherInfo = ref<any>({})
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfig,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      operationName,
      otherInfo
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
