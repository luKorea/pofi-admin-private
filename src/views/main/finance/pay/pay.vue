<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 16:44:16
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/pay.vue
-->
<template>
  <div class="tradeRecord">
    <page-search
      :searchFormConfig="searchFormConfigRef"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryBtnClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="pays"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @operationBtnClick="handleOperationClick"
    >
      <template #otherHandler>
        <el-button size="mini" @click="exportData">导出Excel</el-button>
      </template>
      <template #payState="scope">
        <span>{{ mapOrderState(scope.row.state) }}</span>
      </template>
      <template #payWay="scope">
        <span>{{ mapPay(scope.row.way) }}</span>
      </template>
      <template #payMoney="scope">
        <span>{{ $filters.formatMoney(scope.row.cost) }}</span>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="pays"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
    </page-modal>

    <page-dialog ref="pageDialogRef" :title="`操作日志 (Pofi ID: ${POFIID})`">
      <div class="hg-flex hg-items-center" style="margin-bottom: 10px">
        <template v-if="selectList && selectList.length > 0">
          <span class="item-title" style="margin-right: 10px">操作人</span>
          <el-select v-model="optType" placeholder="">
            <el-option
              v-for="(item, index) in selectList"
              :key="index"
              :value="item.value"
              :label="item.label"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </template>
      </div>
      <hy-table
        :listData="dataList"
        :listCount="dataCount"
        v-bind="operationTableConfig"
        v-model:page="pageInfo"
        ref="tableRef"
        :showHeader="false"
      ></hy-table>
    </page-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { contentTableConfig } from './config/content.config'
import { operationTableConfig } from './config/operation.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  useOperationData,
  useStoreName,
  useMapFormConfigData
} from './hooks/use-page-list'
import { ExcelService } from '@/utils/exportExcel'
import { getItemData } from '@/service/common-api'

import HyTable from '@/base-ui/table'
import { mapTimeToSearch } from '@/utils'
import { errorTip } from '@/utils/tip-info'

export default defineComponent({
  name: 'financePay',
  components: {
    // Money
    HyTable
  },
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const {
      searchFormConfigRef,
      modalConfigRef,
      modalConfig,
      mapOrderState,
      mapPay
    } = useMapFormConfigData()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const handleQueryBtnClick = (data: any) => {
      const beginDate = mapTimeToSearch(data.dateTime).start
      const endDate = mapTimeToSearch(data.dateTime).end
      handleQueryClick({
        ...data,
        beginDate,
        endDate
      })
    }
    const exportData = () => {
      const result = ref<any>([])
      const dataList = pageContentRef.value?.dataList
      dataList.forEach((data: any) => {
        result.value.push({
          订单号: data.onId,
          商品ID: data.code,
          pofiID: data.nickId,
          用户昵称: data.nickName,
          支付状态: mapOrderState(data.state),
          充值方式: mapPay(data.way),
          金额: `${data.cost ? data.cost / 100 : 0}P币`,
          附件: data.attachment,
          创建时间: data.createTime
        })
      })
      const ExportExcel = new ExcelService()
      ExportExcel.exportAsExcelFile(result.value, '用户钱包数据导出')
    }
    const otherInfo = ref<any>({})
    const getItem = (item: any) => {
      getItemData('payItem', item).then((res: any) => {
        if (res.result === 0) {
          otherInfo.value = {
            id: res.data.id,
            nickId: res.data.nickId
          }
        } else errorTip(res.msg)
      })
    }
    const edit = (item: any) => {
      getItem({
        nickId: item.nickId,
        onId: item.onId
      })
      item.wayCopy = mapPay(item.way)
      item.costCopy = `${item.cost ? item.cost / 100 : 0}P币`
      item.create = item.createTime
    }

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, edit)

    // 模态框区域
    const [
      pageDialogRef,
      pageOperationRef,
      handleOperationClick,
      selectList,
      optType,
      POFIID,
      pageInfo,
      dataList,
      dataCount
    ] = useOperationData()
    return {
      searchFormConfigRef,
      modalConfigRef,
      modalConfig,
      mapOrderState,
      mapPay,
      handleResetClick,
      handleQueryBtnClick,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      otherInfo,
      operationName,
      exportData,
      handleOperationClick,
      pageDialogRef,
      pageOperationRef,
      operationTableConfig,
      selectList,
      optType,
      POFIID,
      pageInfo,
      dataList,
      dataCount
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
