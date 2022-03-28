<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 17:13:40
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/condition/condition.vue
-->
<template>
  <div class="condition">
    <editor-table :listData="listData" v-bind="contentTableConfig">
      <template #otherHandler>
        <el-button type="primary" size="mini" @click="newData">新增</el-button>
      </template>
      <template #handler="{ row }">
        <el-button
          type="danger"
          size="mini"
          @click="deleteTableData(row.editId)"
          >删除</el-button
        >
      </template>
    </editor-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import editorTable from '@/base-ui/table'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useEditTableData } from '@/hooks/use-page-table-edit'
import { uid } from 'uid'

export default defineComponent({
  name: 'feedback',
  components: {
    editorTable
  },
  setup() {
    const [listData, newTableData, deleteTableData] = useEditTableData()
    const newData = () => {
      newTableData({
        editId: uid(8),
        title: '',
        subTitle: '',
        url: [],
        img: ''
      })
    }
    watch(listData.value, () => {
      listData.value = listData.value.map((item: any) => {
        return {
          ...item,
          img: item.url && item.url.length > 0 ? item.url[0].url : ''
        }
      })
    })
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
      listData,
      newData,
      deleteTableData,
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
