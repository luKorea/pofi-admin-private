<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-24 11:41:48
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/tradeRecord.vue
-->
<template>
  <div class="recharges">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="recharges"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @selectAllBtnClick="handleSelectData"
    >
      <template #otherHandler>
        <el-button size="mini" @click="exportData">导出Excel</el-button>
      </template>
      <template #isID="{ row }">
        <span>PB{{ row.id }}</span>
      </template>
      <template #isState="{ row }">
        <span>{{ row.show == 1 ? '已上架' : '已下架' }}</span>
      </template>
      <template #isDeveloped="{ row }">
        <span>
          {{ formatDeveloped(row.developed) }}
        </span>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="recharges"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStoreName } from './hooks/use-page-list'
import { ExcelService } from '@/utils/exportExcel'

export default defineComponent({
  name: 'goodsRecharge',
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const exportData = () => {
      const result = ref<any>([])
      const dataList = pageContentRef.value?.dataList
      dataList.forEach((data: any) => {
        result.value.push({
          商品编号: 'PB' + data.id,
          商品标注: data.label,
          套餐名称: data.name,
          销售价: data.sale,
          原价: data.original,
          定价等级: formatDeveloped(data.developed),
          实际到账P币: data.rcg,
          说明文字: data.labelShow,
          排序: data.rank,
          是否上架: data.show === 1 ? '上架' : '已下架'
        })
      })
      const ExportExcel = new ExcelService()
      ExportExcel.exportAsExcelFile(result.value, '充值套餐')
    }
    // 编辑新增操作
    const otherInfo = ref<any>()
    const editData = (item: any) => {
      item.PBId = 'PB' + item.id
      otherInfo.value = {
        id: item.id,
        snId: item.snId
      }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editData)
    const formatDeveloped = (type: number | string) => {
      switch (+type) {
        case 1:
          return '低价区'
        case 2:
          return '中价区'
        case 3:
          return '高价区'
        default:
          return '未知'
      }
    }
    const modalConfigRef = computed(() => modalConfig)
    return {
      searchFormConfig,
      handleResetClick,
      handleQueryClick,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfigRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      operationName,
      exportData,
      formatDeveloped,
      otherInfo
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
