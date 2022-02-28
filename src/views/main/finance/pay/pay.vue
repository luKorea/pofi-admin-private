<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 16:59:19
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/pay.vue
-->
<template>
  <div class="tradeRecord">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryBtnClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="pay"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @operationBtnClick="handleOperationClick"
    >
      <template #otherHandler>
        <el-button size="mini" @click="exportData">导出Excel</el-button>
      </template>
      <template #payState="scope">
        <span>{{ useComputedPayType(scope.row.state) }}</span>
      </template>
      <template #payWay="scope">
        <span>{{ useComputedPayWay(scope.row.way) }}</span>
      </template>
      <template #payMoney="scope">
        <span>{{ scope.row.cost ? scope.row.cost / 100 : 0 }}P币</span>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="pay"
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
import { computed, defineComponent, ref } from 'vue'
// import { Money } from '@element-plus/icons-vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { operationTableConfig } from './config/operation.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  useOperationData,
  useStoreName,
  useComputedPayType,
  useComputedPayWay
} from './hooks/use-page-list'
import { ExcelService } from '@/utils/exportExcel'
import { getItemData } from '@/service/main/finance/pay'

import HyTable from '@/base-ui/table'

export default defineComponent({
  name: 'pay',
  components: {
    // Money
    HyTable
  },
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const handleQueryBtnClick = (data: any) => {
      const beginDate = data.dateTime[0] ?? undefined
      const endDate = data.dateTime[1] ?? undefined
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
          支付状态: useComputedPayType(data.state),
          充值方式: useComputedPayWay(data.way),
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
      getItemData(item).then((res: any) => {
        if (res.result === 0) {
          otherInfo.value = {
            id: res.data.id,
            nickId: res.data.nickId
          }
        }
      })
    }
    const edit = (item: any) => {
      getItem({
        nickId: item.nickId,
        onId: item.onId
      })
      item.wayCopy = useComputedPayWay(item.way)
      item.costCopy = `${item.cost ? item.cost / 100 : 0}P币`
      item.create = item.createTime
    }

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, edit)

    const modalConfigRef = computed(() => {
      modalConfig.formItems.map((item: any) => {
        item.otherOptions = {}
        item.otherOptions['disabled'] = false
        if (item.field === 'remark' || item.field === 'state') {
          item.otherOptions['disabled'] = false
        } else item.otherOptions['disabled'] = true
      })
      return modalConfig
    })
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
      searchFormConfig,
      handleResetClick,
      handleQueryBtnClick,
      storeTypeInfo,
      useComputedPayType,
      useComputedPayWay,
      contentTableConfig,
      pageContentRef,
      modalConfigRef,
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
