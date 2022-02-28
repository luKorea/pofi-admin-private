<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 11:08:54
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/tradeRecord.vue
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
      pageName="tradeRecord"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @selectAllBtnClick="handleSelectData"
    >
      <template #otherHandler>
        <el-button size="mini" @click="exportData">导出Excel</el-button>
      </template>
      <template #payMoney="scope">
        <span class="hg-text-red-400 hg-ml-1">-{{ scope.row.cost }}P币</span>
        <!-- <div class="hg-flex hg-items-center">
          <el-icon><Money class="hg-text-red-400" /></el-icon>
          <span class="hg-text-red-400 hg-ml-1">-{{ scope.row.cost }}P币</span>
        </div> -->
      </template>
      <template #costType="scope">
        <span>{{ scope.row.costType === 'COST_PB' ? 'P币支付' : '' }}</span>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="tradeRecord"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { Money } from '@element-plus/icons-vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStoreName } from './hooks/use-page-list'
import { ExcelService } from '@/utils/exportExcel'

export default defineComponent({
  name: 'tradeRecord',
  components: {
    // Money
  },
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const handleQueryBtnClick = (data: any) => {
      const begin = data.dateTime[0] ?? ''
      const end = data.dateTime[1] ?? ''
      handleQueryClick({
        ...data,
        begin,
        end
      })
    }
    const exportData = () => {
      const result = ref<any>([])
      const dataList = pageContentRef.value?.dataList
      dataList.forEach((data: any) => {
        result.value.push({
          内购ID: data.id,
          pofiID: data.nickId,
          昵称: data.nickName,
          支付方式: data.costType === 'COST_PB' ? 'P币支付' : '',
          支出金额: data.cost,
          目标商品: data.pname,
          来源平台: data.uid,
          备注: data.remark,
          操作时间: data.time
        })
      })
      const ExportExcel = new ExcelService()
      ExportExcel.exportAsExcelFile(result.value, '内购记录')
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      searchFormConfig,
      handleResetClick,
      handleQueryBtnClick,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfig,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      operationName,
      exportData
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
