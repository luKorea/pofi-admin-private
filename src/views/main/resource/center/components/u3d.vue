<!--
 * @Author: your name
 * @Date: 2022-04-11 17:42:28
 * @LastEditTime: 2022-04-12 19:39:26
 * @LastEditors: Please set LastEditors
 * @Description: /cms/mold/getSource /cms/mold/update/source /cms/mold/getSourceList
 * @FilePath: /pofi-admin-private/src/views/main/resource/center/copmonents/resource copy.vue
-->
<template>
  <page-modal
    :defaultInfo="defaultInfo"
    ref="pageModalRef"
    pageName="centers"
    :modalConfig="u3dModalConfig"
    :showConfigBtn="false"
    :showCancelBtn="false"
  >
    <template #titleWrapper>
      <step-component :active="2" @openStep="openStep"></step-component>
    </template>
    <template #otherModalHandler="{ row }">
      <!-- <el-button plain size="mini" v-if="editType === 'add'" @click="nextStep"
        >上一步</el-button
      >
      <el-button size="mini" type="primary" @click="sendTimer(row)">{{
        editType === 'edit' ? '确定' : '下一步'
      }}</el-button> -->
      <el-button size="mini" @click="cancelData(row)">取消</el-button>
      <el-button size="mini" type="primary" @click="sendTimer(row)"
        >保存</el-button
      >
    </template>
  </page-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { u3dModalConfig } from './config/u3d.modal'
import { usePageModal } from '@/hooks/use-page-modal'
import stepComponent from './step.vue'
import { infoTipBox } from '@/utils/tip-info'

export default defineComponent({
  props: {
    editType: {
      type: String,
      default: 'edit'
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    stepComponent
  },
  emits: ['getData', 'changePage', 'openStep'],
  setup(props, { emit }) {
    const nextStep = () => {
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = false
      }
    }
    const cancelData = (item: any) => {
      infoTipBox({
        title: '提示',
        message: '是否保存当前编辑内容？'
      })
        .then(() => {
          sendTimer(item, 'cancel')
        })
        .catch(() => {
          if (pageModalRef.value) {
            pageModalRef.value.dialogVisible = false
          }
        })
    }
    const sendTimer = (item: any, type = 'config') => {
      if (props.editType === 'add') {
        if (pageModalRef.value) {
          if (type === 'cancel') {
            pageModalRef.value.dialogVisible = false
          } else {
            pageModalRef.value.dialogVisible = false
            emit('changePage', 'relevance', { ...item })
          }
        }
      } else {
        console.log(item)
      }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    const openStep = (step: any) => {
      emit('openStep', step, props.params)
    }
    return {
      cancelData,
      openStep,
      u3dModalConfig,
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
