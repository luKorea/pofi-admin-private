<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 14:45:00
 * @Description: 完成
 * @FilePath: /pofi-admin/src/views/main/base/language/language.vue
-->
<template>
  <div class="base-languages">
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="languages"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #isState="{ row }">
        <span>{{ row.state ? '开启' : '禁用' }}</span>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="languages"
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
import { useStoreName } from './hooks/use-page-list'
export default defineComponent({
  name: 'baseLanguage',
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef] = usePageSearch()
    const otherInfo = ref<any>({})
    const newData = () => {
      otherInfo.value = {}
    }
    const editData = (item: any) => {
      otherInfo.value = {
        id: item.id
      }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData, editData)
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
