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
    <template v-if="showEditTable">
      <el-divider
        >主副资源表格管理（选择对应资源后请填写对应的字段）</el-divider
      >
      <el-row>
        <!-- 主关联可编辑表格 -->
        <el-col :span="24">
          <div class="item-flex">
            <span class="item-title">主关联资源表格</span>
            <editor-table
              :listData="prepEditList"
              v-bind="prepModalConfig"
              :showHeader="false"
              style="width: 100%"
            ></editor-table>
          </div>
        </el-col>
      </el-row>
      <!-- 副关联可编辑表格 -->
      <el-row>
        <el-col :span="24">
          <div class="item-flex">
            <span class="item-title">副关联表格</span>
            <editor-table
              :listData="subPrepEditList"
              v-bind="prepModalConfig"
              :showHeader="false"
              style="width: 100%"
            ></editor-table>
          </div>
        </el-col>
      </el-row>
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
import editorTable from '@/base-ui/table'
import { prepModalConfig } from './config/relevance-prep-edit-modal'
import { mapSelectListTitle } from '@/utils'
import { resourceConditionList } from '@/utils/select-list/map-resource-list'
export default defineComponent({
  components: {
    stepComponent,
    editorTable
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
    const prepEditList = ref<any>([]) // 主关联资源
    const subPrepEditList = ref<any>([]) // 副关联资源
    const showEditTable = ref<boolean>(false) // 是否展示可编辑表格
    const handleChangeSelect = (item: any) => {
      const { field, value } = item
      if (value === 2 && field === 'isPrep') {
        showEditTable.value = true
        modalConfigRef.value.formItems.map((i: any) => {
          if (i.field === 'rel') i!.isHidden = false
          if (i.field === 'prep') i!.isHidden = false
          if (i.field === 'subPrep') i!.isHidden = false
        })
      }
      if (value === 1 && field === 'isPrep') {
        showEditTable.value = false
        modalConfigRef.value.formItems.map((i: any) => {
          if (i.field === 'rel') i!.isHidden = true
          if (i.field === 'prep') i!.isHidden = true
          if (i.field === 'subPrep') i!.isHidden = true
        })
      }
      // TODO 后续完善
      if (field === 'prep') {
        if (value.length > 0) {
          let prpObj: any = {}
          let prepEditObj: any = {}
          let prepEditList2: any = []
          prpeList.value.map((v: any) => {
            prpObj[v.moId] = v
          })
          prepEditList.value.map((v: any) => {
            prepEditObj[v.moId] = v
          })
          value.map((v: any) => {
            if (prepEditObj[v]) {
              prepEditList2.push(prepEditObj[v])
            } else if (prpObj[v]) {
              let d = prpObj[v]
              prepEditList2.push({
                ...d,
                openType: mapSelectListTitle(d.open, resourceConditionList),
                snId: '',
                endTime: ''
              })
            }
            prepEditObj[v] = v
          })
          prepEditList.value = prepEditList2
        } else prepEditList.value = []
      }
      if (field === 'subPrep') {
        if (value.length > 0) {
          let prpObj: any = {}
          let prepEditObj: any = {}
          let prepEditList2: any = []
          prpeList.value.map((v: any) => {
            prpObj[v.moId] = v
          })
          subPrepEditList.value.map((v: any) => {
            prepEditObj[v.moId] = v
          })
          value.map((v: any) => {
            if (prepEditObj[v]) {
              prepEditList2.push(prepEditObj[v])
            } else if (prpObj[v]) {
              let d = prpObj[v]
              prepEditList2.push({
                ...d,
                openType: mapSelectListTitle(d.open, resourceConditionList),
                snId: '',
                endTime: ''
              })
            }
            prepEditObj[v] = v
          })
          subPrepEditList.value = prepEditList2
        } else subPrepEditList.value = []
      }
    }
    // 表单操作
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
    const addData = (item: any) => {
      relevanceOperation({
        ...item.data,
        moId: props.params.moId,
        cidList: item.data.cidList.flat(),
        chiefJson: JSON.stringify(prepEditList.value),
        noChiefJson: JSON.stringify(subPrepEditList.value)
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
        cidList: item.data.cidList.flat(),
        chiefJson: JSON.stringify(prepEditList.value),
        noChiefJson: JSON.stringify(subPrepEditList.value)
      }).then((res) => {
        if (res.result === 0) {
          successTip(res.msg)
          if (pageModalRef.value) {
            successTip(res.msg)
            // pageModalRef.value.dialogVisible = false
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
                cidList: item.data.cidList.flat(),
                chiefJson: JSON.stringify(prepEditList.value),
                noChiefJson: JSON.stringify(subPrepEditList.value)
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
                cidList: item.data.cidList.flat(),
                chiefJson: JSON.stringify(prepEditList.value),
                noChiefJson: JSON.stringify(subPrepEditList.value)
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
      nextStep,
      // 可编辑表格
      prepEditList,
      prepModalConfig,
      subPrepEditList,
      showEditTable
    }
  }
})
</script>

<style scoped></style>
