<!--
 * @Author: your name
 * @Date: 2022-04-11 17:42:28
 * @LastEditTime: 2022-04-12 09:35:36
 * @LastEditors: Please set LastEditors
 * @Description: /cms/mold/getSource
 * @FilePath: /pofi-admin-private/src/views/main/resource/center/copmonents/resource copy.vue
-->
<template>
  <page-modal
    :defaultInfo="defaultInfo"
    ref="pageModalRef"
    pageName="centers"
    :modalConfig="u3dModalConfig"
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
import { u3dModalConfig } from './config/u3d.modal'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  setup() {
    const sendTimer = (item: any) => {
      console.log(item)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      u3dModalConfig,
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
