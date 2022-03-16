<!--
 * @Author: your name
 * @Date: 2022-03-16 09:36:40
 * @LastEditTime: 2022-03-16 14:45:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin/src/views/main/finance/purse/components/vip.vue
-->
<template>
  <div>
    <page-dialog ref="pageVipRef" title="VIP操作">
      <div class="hg-flex hg-items-center" style="margin-bottom: 10px">
        <el-button type="danger" size="mini" @click="handleNewData"
          >新增VIP</el-button
        >
      </div>
      <hy-table
        :listData="dataList"
        :listCount="dataCount"
        v-bind="operationTableConfig"
        v-model:page="pageInfo"
        ref="tableRef"
        :showHeader="false"
      >
        <template #isBeginTime="{ row }">
          <span>{{ $filters.formatTime(row.beginTime) }}</span>
        </template>
        <template #isEndTime="{ row }">
          <span>{{ $filters.formatTime(row.endTime) }}</span>
        </template>
        <template #isEffective="{ row }">
          <span>{{ row.effective == true ? '生效' : '失效' }}</span>
        </template>
        <template #handler="scope">
          <el-button type="text" size="mini" @click="handleEditData(scope.row)"
            >编辑</el-button
          >
        </template>
      </hy-table>
    </page-dialog>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="vips"
      :modalConfig="modalConfig"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import HyTable from '@/base-ui/table'
import { defineComponent, ref } from 'vue'

import { modalConfig } from './config/vipModal.config'
import { useStoreName } from '../hooks/use-page-list'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  components: {
    HyTable
  },
  props: {
    nickId: {
      type: Number,
      default: 0
    },
    uid: {
      type: String,
      default: ''
    },
    dataList: {
      type: Array,
      default: () => []
    },
    dataCount: {
      type: Number,
      default: 0
    },
    operationTableConfig: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const [, operationName] = useStoreName()
    const otherInfo = ref<any>({})
    const newData = () => {
      modalConfig.formItems.map((item: any) => {
        if (item.field === 'type') {
          item.otherOptions.disabled = false
        }
      })
      otherInfo.value = {
        uid: props.uid
      }
    }
    const editData = (item: any) => {
      item.type = item.vipType
      otherInfo.value = {
        uid: props.uid
      }
      modalConfig.formItems.map((item: any) => {
        if (item.field === 'type') {
          item.otherOptions.disabled = true
        }
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData, editData)
    const pageVipRef = ref<any>()
    return {
      pageModalRef,
      defaultInfo,
      operationName,
      modalConfig,
      otherInfo,
      handleNewData,
      handleEditData,
      pageVipRef
    }
  }
})
</script>

<style scoped></style>
