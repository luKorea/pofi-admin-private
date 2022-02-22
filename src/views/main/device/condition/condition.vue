<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-22 15:54:51
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/condition/condition.vue
-->
<template>
  <div class="condition">
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
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { usePageList } from './hooks/use-page-list'
import { useStore } from '@/store'

export default defineComponent({
  name: 'deviceCondition',
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
    const [countryList] = usePageList()
    // pageModal相关的hook逻辑
    const modalConfigRef = computed(() => {
      const countryItem = modalConfig.formItems.find(
        (item: any) => item.field === 'region'
      )
      countryItem!.options = countryList.value.map((item: any) => ({
        title: item.name,
        value: item.id
      }))
      return modalConfig
    })
    const otherInfo = ref()
    const editData = (item: any) => {
      otherInfo.value = {
        id: item.id
      }
      item.region =
        item.region && item.region.split(',').map((item: any) => +item)
      console.log(item, '111')
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editData)
    return {
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfigRef,
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
