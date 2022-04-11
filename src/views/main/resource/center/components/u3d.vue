<!--
 * @Author: your name
 * @Date: 2022-04-11 17:42:28
 * @LastEditTime: 2022-04-11 17:52:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin-private/src/views/main/resource/center/copmonents/resource copy.vue
-->
<!--
 * @Author: your name
 * @Date: 2022-04-11 17:42:08
 * @LastEditTime: 2022-04-11 17:42:09
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
