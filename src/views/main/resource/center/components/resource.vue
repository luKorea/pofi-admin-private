<!--
 * @Author: your name
 * @Date: 2022-04-11 17:42:08
 * @LastEditTime: 2022-04-12 09:33:51
 * @LastEditors: Please set LastEditors
 * @Description: /cms/mold/getPic
 * @FilePath: /pofi-admin-private/src/views/main/resource/center/copmonents/timer copy.vue
-->
<template>
  <page-modal
    :defaultInfo="defaultInfo"
    ref="pageModalRef"
    pageName="centers"
    :modalConfig="resourceModalConfig"
    :showConfigBtn="false"
  >
    <template #otherModalHandler="{ row }">
      <el-button size="mini" type="primary" @click="sendTimer(row)"
        >确定</el-button
      >
    </template>
  </page-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { resourceModalConfig } from './config/resource.modal'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  setup() {
    const sendTimer = (item: any) => {
      console.log(item)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      resourceModalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      sendTimer
    }
  }
})
</script>

<style scoped></style>
