<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-29 15:30:09
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/tradeRecord.vue
-->
<template>
  <div class="goodsFunction" v-if="1">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="functions"
      @newBtnClick="handleNewData"
      @editBtnClick="editData"
    >
      <template #otherHandler>
        <el-button size="mini" @click="exportData">导出Excel</el-button>
      </template>
      <template #isID="{ row }">
        <span>PN{{ row.id }}</span>
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
      pageName="functions"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
      @changeSelect="handleChangeSelect"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStoreName } from './hooks/use-page-list'
import { ExcelService } from '@/utils/exportExcel'
import { unityModalList } from '@/utils/select-list/map-resource-list'
import { mapResourceInfo } from '../../../../service/main/goods/function'
import { errorTip } from '@/utils/tip-info'

export default defineComponent({
  name: 'goodsFunction',
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const exportData = () => {
      const result = ref<any>([])
      const dataList = pageContentRef.value?.dataList
      dataList.forEach((data: any) => {
        result.value.push({
          商品编号: 'PN' + data.id,
          商品标注: data.label,
          套餐名称: data.name,
          销售价: data.sale,
          原价: data.original,
          实际到账P币: data.rcg,
          说明文字: data.labelShow,
          排序: data.rank,
          是否上架: data.show === 1 ? '上架' : '已下架'
        })
      })
      const ExportExcel = new ExcelService()
      ExportExcel.exportAsExcelFile(result.value, '功能套餐')
    }
    // 编辑新增操作
    const otherInfo = ref<any>()
    const editData = (item: any) => {
      mapResourceName(+item.type)
      setTimeout(() => {
        let moId = null
        if (item.moId && item.moId !== undefined) {
          moId = item.moId.split(',')
        } else moId = []
        item.PNId = 'PN' + item.id
        item.modeType = item.type
        otherInfo.value = {
          id: item.id
        }
        handleEditData({
          ...item,
          moId
        })
      }, 500)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    const formatDeveloped = (type: number | string) => {
      switch (+type) {
        case 1:
          return '发达国家'
        case 2:
          return '发展中国家'
        default:
          return '未知'
      }
    }
    const modalConfigRef = computed(() => {
      modalConfig.formItems.map((i: any) => {
        if (i.field === 'modeType')
          i!.options = unityModalList.filter(
            (item: any) => item.value !== undefined
          )
      })
      return modalConfig
    })
    const mapResourceName = (unityType: any) => {
      mapResourceInfo(unityType).then((res) => {
        if (res.result === 0) {
          modalConfigRef.value.formItems.map((i: any) => {
            if (i.field === 'moId')
              i!.options = res.data.map((item: any) => {
                return {
                  title: item.pname,
                  value: item.moId
                }
              })
          })
        } else errorTip(res.msg)
      })
    }
    const handleChangeSelect = (item: any) => {
      if (item.field === 'modeType') {
        modalConfig.formItems.map((i: any) => {
          if (i.field === 'moId') i!.options = []
        })
        mapResourceName(item.value)
      }
    }
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
      otherInfo,
      handleChangeSelect,
      editData
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
