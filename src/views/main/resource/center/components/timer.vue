<!--
 * @Author: your name
 * @Date: 2022-04-11 17:21:57
 * @LastEditTime: 2022-04-20 14:33:51
 * @LastEditors: Please set LastEditors
 * @Description: /cms/mold/update/state
 * @FilePath: /pofi-admin-private/src/views/main/resource/center/copmonents/timer.vue
-->
<template>
  <page-modal
    :defaultInfo="defaultInfo"
    ref="pageModalRef"
    pageName="centers"
    :modalConfig="timerModalConfigRef"
    :showConfigBtn="false"
    :showCancelBtn="false"
  >
    <template #titleWrapper="{ row }">
      <step-component
        :active="4"
        @openStep="openStep($event, row)"
        :params="params"
      ></step-component>
    </template>
    <template #otherModalHandler="{ row }">
      <!-- <el-button plain size="mini" v-if="editType === 'add'" @click="nextStep"
        >上一步</el-button
      >
      <el-button size="mini" type="primary" @click="sendTimer(row)"
        >确定</el-button
      > -->
      <el-button size="mini" @click="cancelData(row)">取消</el-button>
      <el-button size="mini" type="primary" @click="sendTimer(row)"
        >保存</el-button
      >
    </template>
  </page-modal>
</template>

<script lang="ts">
import { defineComponent, computed, nextTick } from 'vue'
import { timerModalConfig } from './config/timer.modal'
import { usePageModal } from '@/hooks/use-page-modal'
import { infoTipBox, successTip } from '@/utils/tip-info'
import { updateCenterTimer } from '@/service/main/resource/center'
import { errorTip } from '@/utils/tip-info'
import stepComponent from './step.vue'

export default defineComponent({
  components: {
    stepComponent
  },
  props: {
    resourceStateList: {
      type: Array,
      default: () => []
    },
    editType: {
      type: String,
      default: 'edit'
    },
    allData: {
      type: Object,
      default: () => ({})
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['getData', 'openStep', 'changePage'],
  setup(props, { emit }) {
    const timerModalConfigRef = computed(() => {
      timerModalConfig.formItems.map((item: any) => {
        if (item.field === 'state') item!.options = props.resourceStateList
      })
      return timerModalConfig
    })
    const cancelData = (item: any) => {
      infoTipBox({
        title: '提示',
        message: '是否保存当前编辑内容？',
        cancelButtonText: '丢弃',
        confirmButtonText: '保存'
      })
        .then(() => {
          sendTimer(item, 'cancel')
        })
        .catch((action: any) => {
          if (action === 'cancel') {
            if (pageModalRef.value) {
              pageModalRef.value.dialogVisible = false
              emit('getData')
            }
          }
        })
    }
    const sendTimer = (item: any, type = 'config') => {
      const formRef = item.ref.formRef
      const data = item.data
      formRef?.validate((valid: any) => {
        if (valid) {
          if (props.editType === 'add' && type === 'cancel') {
            if (pageModalRef.value) {
              pageModalRef.value.dialogVisible = false
              emit('getData')
            }
          }
          if (props.editType === 'add') {
            updateCenterTimer({
              moId: props.params.moId,
              state: data.state,
              onlineTime: data.onlineTime
            }).then((res) => {
              if (res.result === 0) {
                if (pageModalRef.value) {
                  successTip('保存成功')
                  // pageModalRef.value.dialogVisible = false
                  emit('getData')
                }
              } else errorTip(res.msg)
            })
          } else {
            infoTipBox({
              title: '更新时间状态',
              message: `你确定更新时间状态吗`
            }).then(() => {
              updateCenterTimer({
                moId: props.params.moId,
                state: data.state,
                onlineTime: data.onlineTime
              }).then((res) => {
                if (res.result === 0) {
                  // emit('getData')
                  successTip(res.msg)
                  if (pageModalRef.value) {
                    // pageModalRef.value.dialogVisible = false
                    emit('getData')
                  }
                } else errorTip(res.msg)
              })
            })
          }
        }
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    const nextStep = () => {
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = false
      }
    }
    const openStep = async (item: any, res: any) => {
      if (item.save) {
        const formRef = res.ref.formRef
        const data = res.data
        formRef?.validate((valid: any) => {
          if (valid) {
            if (props.editType === 'add') {
              updateCenterTimer({
                moId: props.params.moId,
                state: data.state,
                onlineTime: data.onlineTime
              }).then((res) => {
                if (res.result === 0) {
                  successTip(res.msg)
                  emit('openStep', item.step, props.params)
                } else errorTip(res.msg)
              })
            } else {
              infoTipBox({
                title: '更新时间状态',
                message: `你确定更新时间状态吗`
              }).then(() => {
                updateCenterTimer({
                  moId: props.params.moId,
                  state: data.state,
                  onlineTime: data.onlineTime
                }).then((res) => {
                  if (res.result === 0) {
                    successTip(res.msg)
                    emit('openStep', item.step, props.params)
                  } else errorTip(res.msg)
                })
              })
            }
          }
        })
      } else {
        emit('openStep', item.step, props.params)
      }
    }
    return {
      cancelData,
      openStep,
      timerModalConfigRef,
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
