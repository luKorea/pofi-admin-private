<!--
 * @Author: your name
 * @Date: 2022-04-11 17:42:08
 * @LastEditTime: 2022-04-11 17:52:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin-private/src/views/main/resource/center/copmonents/timer copy.vue
-->
<!--
 * @Author: your name
 * @Date: 2022-04-11 17:21:57
 * @LastEditTime: 2022-04-11 17:40:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin-private/src/views/main/resource/center/copmonents/timer.vue
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
