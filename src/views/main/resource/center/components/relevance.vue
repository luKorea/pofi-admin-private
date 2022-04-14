<!--
 * @Author: your name
 * @Date: 2022-04-11 17:42:43
 * @LastEditTime: 2022-04-14 16:50:51
 * @LastEditors: Please set LastEditors
 * @Description: /cms/mold/getPrep
 * @FilePath: /pofi-admin-private/src/views/main/resource/center/copmonents/timer copy.vue
-->
<template>
  <page-modal
    :defaultInfo="defaultInfo"
    ref="pageModalRef"
    pageName="centers"
    :modalConfig="modalConfigRef"
    :showConfigBtn="false"
    :showCancelBtn="false"
    @changeSelect="handleChangeSelect"
  >
    <template #titleWrapper="{ row }">
      <step-component
        :active="3"
        @openStep="openStep($event, row)"
      ></step-component>
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
import { defineComponent, computed, ref } from 'vue'
import { relevanceModalConfig } from './config/relevance.modal'
import { usePageModal } from '@/hooks/use-page-modal'
import stepComponent from './step.vue'
import { infoTipBox } from '@/utils/tip-info'
import { otherList, classifyList, prpeList } from '../hooks/use-page-list'
import { relevanceOperation } from '@/service/main/resource/center'
import { successTip, errorTip } from '@/utils/tip-info'
export default defineComponent({
  components: {
    stepComponent
  },
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
  emits: ['getData', 'changePage', 'openStep'],
  setup(props, { emit }) {
    const modalConfigRef = computed(() => {
      relevanceModalConfig.formItems.map((i: any) => {
        if (i.field === 'cidList') i!.options = classifyList?.value
        if (i.field === 'face')
          i!.options = otherList?.value?.faceList.map((c: any) => ({
            title: c.name,
            value: c.id
          }))
        if (i.field === 'style')
          i!.options = otherList?.value?.styleList.map((c: any) => ({
            title: c.name,
            value: c.id
          }))
        if (i.field === 'scene')
          i!.options = otherList?.value?.sceneList.map((c: any) => ({
            title: c.name,
            value: c.id
          }))
        if (i.field === 'other')
          i!.options = otherList?.value?.otherList.map((c: any) => ({
            title: c.name,
            value: c.id
          }))
        if (i.field === 'hide')
          i!.options = otherList?.value?.hideList?.map((c: any) => ({
            title: c.name,
            value: c.id
          }))
        if (i.field === 'prep')
          i!.options = prpeList?.value?.map((c: any) => ({
            title: c.pname,
            value: c.moId
          }))
        if (i.field === 'subPrep')
          i!.options = prpeList?.value?.map((c: any) => ({
            title: c.pname,
            value: c.moId
          }))
      })
      return relevanceModalConfig
    })
    const nextStep = () => {
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = false
      }
    }
    let prpeEditList: any[] = []
    const handleChangeSelect = (item: any) => {
      if (item.value === 2 && item.field === 'isPrep') {
        modalConfigRef.value.formItems.map((i: any) => {
          if (i.field === 'rel') i!.isHidden = false
          if (i.field === 'prep') i!.isHidden = false
          if (i.field === 'subPrep') i!.isHidden = false
        })
      }
      if (item.value === 1 && item.field === 'isPrep') {
        modalConfigRef.value.formItems.map((i: any) => {
          if (i.field === 'rel') i!.isHidden = true
          if (i.field === 'prep') i!.isHidden = true
          if (i.field === 'subPrep') i!.isHidden = true
        })
      }
      // TODO 后续完善
      // if (item.field === 'prep') {
      //   if (item.value.length > 0) {
      //     item.value.map((i: any) => {
      //       prpeList.value.map((p: any) => {
      //         if (i === p.moId) {
      //           prpeEditList.push(p)
      //         }
      //       })
      //     })
      //   } else prpeEditList = []
      //   console.log(prpeEditList, 'prpeEditList')
      // }
    }
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
        .catch(() => {
          if (pageModalRef.value) {
            pageModalRef.value.dialogVisible = false
          }
        })
    }
    const addData = (item: any) => {
      relevanceOperation({
        ...item.data,
        moId: props.params.moId,
        cidList: item.data.cidList.flat()
      }).then((res) => {
        if (res.result === 0) {
          successTip(res.msg)
          if (pageModalRef.value) pageModalRef.value.dialogVisible = false
          emit('changePage', 'timer', { moId: props.params.moId })
        } else errorTip(res.msg)
      })
    }
    const editData = (item: any) => {
      relevanceOperation({
        ...item.data,
        moId: props.params.moId,
        cidList: item.data.cidList.flat()
      }).then((res) => {
        if (res.result === 0) {
          successTip(res.msg)
          if (pageModalRef.value) {
            pageModalRef.value.dialogVisible = false
            emit('getData')
          }
        } else errorTip(res.msg)
      })
    }
    const sendTimer = (item: any, type = 'config') => {
      const formRef = item.ref.formRef
      formRef?.validate((valid: any) => {
        if (valid) {
          if (props.editType === 'add') {
            if (pageModalRef.value) {
              if (type === 'cancel') {
                pageModalRef.value.dialogVisible = false
              } else {
                addData(item)
              }
            }
          } else {
            editData(item)
          }
        }
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    const openStep = (step: any, item: any) => {
      if (step.save) {
        const formRef = item.ref.formRef
        formRef?.validate((valid: any) => {
          if (valid) {
            if (props.editType === 'add') {
              relevanceOperation({
                ...item.data,
                moId: props.params.moId,
                cidList: item.data.cidList.flat()
              }).then((res) => {
                if (res.result === 0) {
                  successTip(res.msg)
                  if (pageModalRef.value)
                    pageModalRef.value.dialogVisible = false
                  emit('openStep', step.step, props.params)
                } else errorTip(res.msg)
              })
            } else {
              relevanceOperation({
                ...item.data,
                moId: props.params.moId,
                cidList: item.data.cidList.flat()
              }).then((res) => {
                if (res.result === 0) {
                  successTip(res.msg)
                  if (pageModalRef.value) {
                    pageModalRef.value.dialogVisible = false
                    emit('openStep', step.step, props.params)
                  }
                } else errorTip(res.msg)
              })
            }
          }
        })
      } else emit('openStep', step.step, props.params)
    }
    return {
      handleChangeSelect,
      openStep,
      cancelData,
      relevanceModalConfig,
      modalConfigRef,
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
