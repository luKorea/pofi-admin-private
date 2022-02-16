<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 17:15:55
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
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'deviceCondition',
  setup() {
    const storeTypeInfo = ref({
      actionName: 'deviceCondition/getPageListAction',
      actionListName: 'deviceCondition/pageListData',
      actionCountName: 'deviceCondition/pageListCount'
    })
    const [pageContentRef] = usePageSearch()
    // pageModal相关的hook逻辑
    const modalConfigRef = computed(() => {
      return modalConfig
    })
    // 1.处理密码的逻辑
    const newCallback = () => {
      console.log(1)
    }
    const editCallback = () => {
      console.log(3)
    }

    // 3.调用hook获取公共变量和函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)
    return {
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfigRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
