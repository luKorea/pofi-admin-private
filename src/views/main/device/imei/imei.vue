<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-22 12:37:17
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/imei.vue
-->
<template>
  <div class="imei">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="imei"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #otherHandler>
        <el-button size="mini">导出Excel</el-button>
        <el-button size="mini">批量解冻</el-button>
        <el-button size="mini">批量冻结</el-button>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="imei"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { usePageList } from './hooks/use-page-list'

export default defineComponent({
  name: 'deviceImei',
  setup() {
    const storeTypeInfo = ref({
      actionName: 'userImeiModule/getPageListAction',
      actionListName: 'userImeiModule/pageListData',
      actionCountName: 'userImeiModule/pageListCount',
      deleteAction: 'userImeiModule/deletePageDataAction'
    })
    const operationName = ref({
      editName: 'userImeiModule/editPageDataAction',
      createName: 'userImeiModule/createPageDataAction'
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
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editData)
    return {
      searchFormConfig,
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
