<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-09 11:32:30
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/warehouse/warehouse.vue
-->
<template>
  <div class="warehouse">
    <page-search
      :searchFormConfig="searchFormConfigRef"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryBtnClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="wareHouses"
      @newBtnClick="handleNewData"
      @editBtnClick="editData"
      @selectAllBtnClick="handleSelectData"
    >
      <template #otherHandler="{ row }">
        <el-button size="mini" type="primary" @click="handleAllEditData(row)"
          >批量编辑</el-button
        >
        <el-button size="mini" @click="exportData">导出Excel</el-button>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="wareHouses"
      :modalConfig="modalConfig"
      :operationName="operationName"
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

import { useStoreName, useMapSelectValue } from './hooks/use-page-list'
import { ExcelService } from '@/utils/exportExcel'
import { mapTimeToSearch } from '@/utils'
import {
  unityModalList,
  resourceGetWayList
} from '@/utils/select-list/map-resource-list'
import { warnTip } from '@/utils/tip-info'

export default defineComponent({
  name: 'financeWarehouse',
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const handleQueryBtnClick = (data: any) => {
      const begin = mapTimeToSearch(data.dateTime).start
      const end = mapTimeToSearch(data.dateTime).end
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
          POFIID: data.nickId,
          资源名字: data.nickName,
          资源编号: data.remark,
          标注ID: data.time,
          模型状态: data.nickId,
          是否拥有: data.nickName,
          拥有时间: data.remark,
          获取方式: data.time
        })
      })
      const ExportExcel = new ExcelService()
      ExportExcel.exportAsExcelFile(result.value, '用户资源仓库')
    }
    const mapField = (type: any) => {
      if (type === 'all') {
        modalConfig.title = '用户资源仓库 (多数据编辑)'
        modalConfig.formItems.map((item: any) => {
          if (item.field === 'selectNumber') item!.isHidden = false
          if (item.field === 'selectResource') item!.isHidden = false
          if (item.field === 'nickId') item!.isHidden = true
          if (item.field === 'nickName') item!.isHidden = true
          if (item.field === 'snId') item!.isHidden = true
          if (item.field === 'resourceName') item!.isHidden = true
          if (item.field === 'id') item!.isHidden = true
        })
      } else {
        modalConfig.title = '用户资源仓库 (单数据编辑)'
        modalConfig.formItems.map((item: any) => {
          if (item.field === 'selectNumber') item!.isHidden = true
          if (item.field === 'selectResource') item!.isHidden = true
          if (item.field === 'nickId') item!.isHidden = false
          if (item.field === 'nickName') item!.isHidden = false
          if (item.field === 'snId') item!.isHidden = false
          if (item.field === 'resourceName') item!.isHidden = false
          if (item.field === 'id') item!.isHidden = false
        })
      }
    }
    // 批量处理数据
    const selectList = ref<any>([])
    const handleSelectData = (item: any) => {
      selectList.value = item
    }
    const handleAllEditData = () => {
      mapField('all')
      if (selectList?.value?.length === 0) {
        warnTip('至少选中一个')
        return
      } else {
        handleEditData({
          selectNumber: selectList.value.length + '人'
        })
      }
    }
    const editData = (item: any) => {
      mapField('edit')
      handleEditData(item)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined)
    // 搜索映射
    const [regList, markList, countryList] = useMapSelectValue()
    const searchFormConfigRef = computed(() => {
      const markId = searchFormConfig.formItems.find(
        (item: any) => item.field === 'markId'
      )
      const snId = searchFormConfig.formItems.find(
        (item: any) => item.field === 'snId'
      )
      const srcType = searchFormConfig.formItems.find(
        (item: any) => item.field === 'srcType'
      )
      const areaId = searchFormConfig.formItems.find(
        (item: any) => item.field === 'areaId'
      )
      const have = searchFormConfig.formItems.find(
        (item: any) => item.field === 'have'
      )
      markId!.options = markList.value.map((item: any) => {
        return {
          title: item.dec,
          value: item.type
        }
      })
      snId!.options = unityModalList
      srcType!.options = regList.value.map((item: any) => {
        return {
          title: item.dec,
          value: item.type
        }
      })
      areaId!.options = countryList.value.map((i: any) => ({
        title: i.name,
        value: i.id
      }))
      have!.options = resourceGetWayList
      return searchFormConfig
    })
    return {
      searchFormConfigRef,
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
      exportData,
      handleSelectData,
      handleAllEditData,
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
