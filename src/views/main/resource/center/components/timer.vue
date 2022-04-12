<!--
 * @Author: your name
 * @Date: 2022-04-11 17:21:57
 * @LastEditTime: 2022-04-12 10:05:54
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
  >
    <template #otherModalHandler="{ row }">
      <el-button size="mini" type="primary" @click="sendTimer(row)"
        >确定</el-button
      >
    </template>
  </page-modal>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { timerModalConfig } from './config/timer.modal'
import { usePageModal } from '@/hooks/use-page-modal'
import { infoTipBox, successTip } from '@/utils/tip-info'
import { updateCenterTimer } from '@/service/main/resource/center'
import { errorTip } from '@/utils/tip-info'
export default defineComponent({
  props: {
    resourceStateList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['getData'],
  setup(props, { emit }) {
    const timerModalConfigRef = computed(() => {
      timerModalConfig.formItems.map((item: any) => {
        if (item.field === 'state') item!.options = props.resourceStateList
      })
      return timerModalConfig
    })
    const sendTimer = (item: any) => {
      const formRef = item.ref.formRef
      const data = item.data
      formRef?.validate((valid: any) => {
        if (valid) {
          infoTipBox({
            title: '更新时间状态',
            message: `你确定更新模型 ${data.pname} 的时间状态吗`
          }).then(() => {
            updateCenterTimer({
              moId: data.moId,
              state: data.state,
              onlineTime: data.onlineTime
            }).then((res) => {
              if (res.result === 0) {
                successTip(res.msg)
                if (pageModalRef.value) {
                  pageModalRef.value.dialogVisible = false
                  emit('getData')
                }
              } else errorTip(res.msg)
            })
          })
        }
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      timerModalConfigRef,
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
