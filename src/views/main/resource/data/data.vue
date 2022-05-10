<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-10 14:41:07
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/resource/data/data.vue
-->
<template>
  <!-- TODO 暂时隐藏 -->
  <div class="resourceData">
    <page-search
      :searchFormConfig="searchFormConfigData"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryBtnClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="resourceData"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @operationBtnClick="handleOperationClick"
    >
      <template #isDownload="scope">
        <div
          class="hg-flex hg-items-center hg-justify-center hg-cursor-pointer"
          @click="handleEditData(scope.row)"
        >
          <span style="margin-right: 4px">{{ scope.row.download }}</span>
          <i class="el-icon-edit"></i>
        </div>
      </template>
      <template #isMoType="{ row }">
        <span>{{ mapTitle(row.moType, resourceTypeList) }}</span>
      </template>
      <template #isOpen="{ row }">
        <span>{{ mapTitle(row.open, resourceConditionList) }}</span>
      </template>
      <template #isState="{ row }">
        <span>{{ mapTitle(row.state, resourceValueList) }}</span>
      </template>
      <template #payMoney="scope">
        <span>{{ scope.row.cost ? scope.row.cost / 100 : 0 }}P币</span>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="resourceData"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <div class="item-flex">
        <span class="item-title">编辑数据</span>
        <el-input
          v-model="otherInfo.num"
          placeholder="请输入值"
          type="number"
          @input="handleChangeNumber"
        >
          <template #prepend>{{ otherInfo.download }} +</template>
        </el-input>
      </div>
    </page-modal>

    <page-dialog ref="pageDialogRef" title="下载量日志">
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
import { contentTableConfig } from './config/content.config'
import { operationTableConfig } from './config/operation.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  useOperationData,
  useStoreName,
  useMapSearchFormConfigData
} from './hooks/use-page-list'
import HyTable from '@/base-ui/table'
import { mapTimeToSearch, mapSelectListTitle } from '@/utils'

export default defineComponent({
  name: 'resourceData',
  components: {
    // Money
    HyTable
  },
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [
      searchFormConfigData,
      resourceTypeList,
      resourceConditionList,
      resourceValueList
    ] = useMapSearchFormConfigData()
    const mapTitle = (value: number, list: any[]) => {
      return mapSelectListTitle(value, list)
    }
    const handleQueryBtnClick = (data: any) => {
      const begin = mapTimeToSearch(data.dateTime).start
      const end = mapTimeToSearch(data.dateTime).end
      const onlineTimeBegin = mapTimeToSearch(data.lineTime).start
      const onlineTimeEnd = mapTimeToSearch(data.lineTime).end
      handleQueryClick({
        ...data,
        begin,
        end,
        onlineTimeBegin,
        onlineTimeEnd
      })
    }
    const otherInfo = ref<any>()
    const editData = (item: any) => {
      otherInfo.value = {
        id: item.id,
        num: item.downloadShow,
        download: item.download,
        showNum: item.downloadShow
      }
      if (item.downloadShow) {
        if (item.downloadShow / 1000 < 1) {
          item.showNum1 = 0 + 'K'
        } else {
          let a = +item.downloadShow / 1000
          console.log(a, 'bum')
          item.showNum1 = Math.floor(a) + 'K'
        }
      }
    }
    const handleChangeNumber = () => {
      // if (isNaN(otherInfo.value.num)) {
      //   otherInfo.value.num = 0
      // }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editData)

    const modalConfigRef = computed(() => {
      return modalConfig
    })
    // 模态框区域
    const [
      pageDialogRef,
      pageOperationRef,
      handleOperationClick,
      pageInfo,
      dataList,
      dataCount
    ] = useOperationData()
    return {
      handleChangeNumber,
      searchFormConfigData,
      resourceTypeList,
      resourceConditionList,
      resourceValueList,
      mapTitle,
      handleResetClick,
      handleQueryBtnClick,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfigRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      otherInfo,
      operationName,
      handleOperationClick,
      pageDialogRef,
      pageOperationRef,
      operationTableConfig,
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
