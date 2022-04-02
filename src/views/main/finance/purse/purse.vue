<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-16 14:44:17
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
      pageName="purses"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEdit"
      @operationBtnClick="handleOperationClick"
    >
      <template #otherHandler>
        <el-button size="mini" @click="exportData">导出Excel</el-button>
      </template>
      <template #isPb="scope">
        <span>{{ $filters.formatMoney(scope.row.pb) }}</span>
      </template>
      <template #isLevel="scope"> {{ scope.row.lv }}级 </template>
      <template #otherTableHandler="scope">
        <el-button
          size="mini"
          type="text"
          style="color: rgba(248, 113, 113, 0.8)"
          @click="handleVIPClick(scope.row, pageVip)"
          >编辑VIP</el-button
        >
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="purses"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
    </page-modal>
    <!-- 操作日志 -->
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
    <!-- VIP 区域 -->
    <vip-component
      ref="pageVip"
      :dataCount="vipCount"
      :dataList="vipList"
      :nickId="nickId"
      :uid="vipUseId"
      :pageInfo="vipPageInfo"
      :operationTableConfig="vipTableConfig"
    ></vip-component>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { operationTableConfig } from './config/operation.config'
import { vipTableConfig } from './components/config/vip.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  useGetUserType,
  useOperationData,
  useStoreName,
  useVIPData,
  useMapSearchFormConfigData
} from './hooks/use-page-list'
import { ExcelService } from '@/utils/exportExcel'
import { getItemData } from '@/service/common-api'

import HyTable from '@/base-ui/table'
import VipComponent from './components/vip.vue'
import { mapTimeToSearch } from '@/utils'
import { useStore } from '@/store'
import { errorTip } from '@/utils/tip-info'

export default defineComponent({
  name: 'fiancePurse',
  components: {
    HyTable,
    VipComponent
  },
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const handleQueryBtnClick = (data: any) => {
      handleQueryClick({
        ...data
      })
    }
    const exportData = () => {
      const result = ref<any>([])
      const dataList = pageContentRef.value?.dataList
      dataList.forEach((data: any) => {
        result.value.push({
          pofiID: data.nickId,
          用户昵称: data.nickName,
          P币余额: `${data.pb ? data.pb / 100 : 0}P币`,
          等级: data.lv
        })
      })
      const ExportExcel = new ExcelService()
      ExportExcel.exportAsExcelFile(result.value, '用户钱包数据导出')
    }
    const otherInfo = ref<any>({})
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()

    const modalConfigRef = computed(() => {
      return modalConfig
    })
    const store = useStore()
    const isAdmin = computed(() => store.state.login.isAdmin)
    const [userTypeList] = useGetUserType()
    // 自定义编辑
    const handleEdit = (item: any) => {
      getItemData('purseItem', {
        nickId: item.nickId
      }).then((res: any) => {
        if (res.result === 0) {
          otherInfo.value = {
            id: res.data.id,
            nickId: res.data.nickId
          }
          handleEditData({
            ...res.data,
            pb: res.data.pb / 100
          })
        } else errorTip(res.msg)
      })
      modalConfigRef?.value.formItems.map((item: any) => {
        if (item.field === 'pb') {
          isAdmin.value
            ? (item.otherOptions['disabled'] = false)
            : (item.otherOptions['disabled'] = true)
        }
      })
      modalConfigRef?.value.formItems.map((item: any) => {
        if (item.field === 'markId') {
          item.options = userTypeList.value.map((item: any) => {
            return {
              title: item.dec,
              value: item.type
            }
          })
        }
      })
    }
    // 模态框区域
    const [
      pageDialogRef,
      ,
      handleOperationClick,
      selectList,
      optType,
      POFIID,
      pageInfo,
      dataList,
      dataCount
    ] = useOperationData()
    // VIP 区域
    const [handleVIPClick, vipPageInfo, vipList, vipCount, nickId, vipUseId] =
      useVIPData()
    const pageVip = ref<any>()
    return {
      ...useMapSearchFormConfigData(),
      searchFormConfig,
      handleResetClick,
      handleQueryBtnClick,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfigRef,
      handleNewData,
      handleEdit,
      handleEditData,
      pageModalRef,
      defaultInfo,
      otherInfo,
      operationName,
      exportData,
      handleOperationClick,
      pageDialogRef,
      operationTableConfig,
      selectList,
      optType,
      POFIID,
      pageInfo,
      dataList,
      dataCount,
      // VIP
      pageVip,
      vipTableConfig,
      handleVIPClick,
      vipPageInfo,
      vipList,
      vipCount,
      nickId,
      vipUseId
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
