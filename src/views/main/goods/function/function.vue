<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-29 16:43:17
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
      <el-row>
        <el-col :span="24">
          <div class="item-flex">
            <span class="item-title">资源名称</span>
            <el-select
              placeholder="请输入资源名称"
              style="width: 100%"
              filterable
              remote
              reserve-keyword
              clearable
              multiple
              :remote-method="getResourceList"
              :loading="loading"
              v-model="otherInfo.moId"
            >
              <el-option
                v-for="option in resourceList"
                :key="option.moId"
                :value="option.moId"
                :label="option.pname"
                >{{ option.pname }}</el-option
              >
            </el-select>
          </div>
        </el-col>
      </el-row>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick, watchEffect } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStoreName } from './hooks/use-page-list'
import { ExcelService } from '@/utils/exportExcel'
import { unityModalList } from '@/utils/select-list/map-resource-list'
import { mapResourceInfo } from '@/service/main/goods/function'
import { errorTip } from '@/utils/tip-info'
import { getCommonSelectList1 } from '@/service/common'
import { _debounce } from '@/utils'

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

    const loading = ref<boolean>(false)
    const resourceList = ref<any>([])
    const getResourceList = _debounce(
      (resource: string) => {
        loading.value = true
        getCommonSelectList1(resource, false)
          .then((res) => {
            if (res.result == 0) {
              resourceList.value = res.data
            } else errorTip(res.msg)
          })
          .finally(() => (loading.value = false))
      },
      300,
      true
    )
    // 编辑新增操作
    const otherInfo = ref<any>({
      moId: []
    })
    const newData = () => {
      otherInfo.value = {
        moId: []
      }
    }
    const editData = (item: any) => {
      // mapResourceName(+item.type)
      if (item.moId && item.moId !== undefined) {
        otherInfo.value = {
          moId: item.moId.split(',')
        }
        for (let i = 0; i < item.moId.split(',').length; i++) {
          getCommonSelectList1(item.moId.split(',')[i], false).then((res) => {
            if (res.result == 0) {
              resourceList.value = res.data
            } else errorTip(res.msg)
          })
        }
      } else {
        otherInfo.value = {
          moId: []
        }
      }
      item.PNId = 'PN' + item.id
      item.modeType = item.type
      otherInfo.value = {
        ...otherInfo.value,
        id: item.id
      }
      handleEditData({
        ...item
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
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
      editData,
      getResourceList,
      resourceList
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
