<!--
 * @Author: your name
 * @Date: 2022-04-11 17:42:43
 * @LastEditTime: 2022-04-12 15:12:42
 * @LastEditors: Please set LastEditors
 * @Description: /cms/mold/getPrep
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
    :modalConfig="relevanceModalConfig"
    :showConfigBtn="false"
  >
    <template #titleWrapper>
      <step-component :active="3"></step-component>
    </template>
    <template #otherModalHandler="{ row }">
      <el-button plain size="mini" v-if="editType === 'add'" @click="nextStep"
        >上一步</el-button
      >
      <el-button size="mini" type="primary" @click="sendTimer(row)">{{
        editType === 'edit' ? '确定' : '下一步'
      }}</el-button>
    </template>
  </page-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { relevanceModalConfig } from './config/relevance.modal'
import { usePageModal } from '@/hooks/use-page-modal'
import stepComponent from './step.vue'
export default defineComponent({
  components: {
    stepComponent
  },
  props: {
    editType: {
      type: String,
      default: 'edit'
    }
  },
  emits: ['getData', 'changePage'],
  setup(props, { emit }) {
    const nextStep = () => {
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = false
      }
    }
    const sendTimer = (item: any) => {
      console.log(item)
      emit('changePage', 'timer')
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      relevanceModalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      sendTimer,
      nextStep
    }
  }
})
</script>

<style scoped></style>
