<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-24 10:02:28
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/imei.vue
-->
<template>
  <div class="imei">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="imei"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @selectAllBtnClick="handleSelectData"
    >
      <template #otherHandler>
        <el-button size="mini" @click="exportData">导出Excel</el-button>
        <el-button size="mini" type="primary" @click="handleCloseOrOpen(0)"
          >批量解冻</el-button
        >
        <el-button size="mini" type="info" @click="handleCloseOrOpen(1)"
          >批量冻结</el-button
        >
      </template>
      <template #isType="scope">
        <span>{{ scope.row.osType ? 'iOS' : 'Android' }}</span>
      </template>
      <template #loginAt="scope">
        <span>{{ $filters.formatTime(scope.row.loginTime) }}</span>
      </template>
      <template #isState="scope">
        <el-button
          size="mini"
          :type="scope.row.state ? 'info' : 'primary'"
          @click="changeState(scope.row)"
          >{{ scope.row.state ? '冻结' : '正常' }}</el-button
        >
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="imei"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStoreName } from './hooks/use-page-list'
import { infoTipBox, warnTip, successTip, errorTip } from '@/utils/tip-info'
import { useStore } from '@/store'
import { selectImeiOperation } from '@/service/device/imei'
import { ExcelService } from '@/utils/exportExcel'

export default defineComponent({
  name: 'deviceImei',
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    const exportData = () => {
      const result = ref<any>([])
      const dataList = pageContentRef.value?.dataList
      dataList.forEach((data: any) => {
        result.value.push({
          id: data.id,
          设备ID: data.imei,
          设备类型: data.osType ? 'iOS' : 'Android',
          设备品牌: data.mobileBrand,
          设备版本: data.mobileVersion,
          APP版本: data.version,
          用户ID: data.uid,
          客户端IP: data.ip,
          // 最近登录: data.createTime,
          // 首次登录: data.loginTime,
          状态: data.state ? '冻结' : '正常'
        })
      })
      const ExportExcel = new ExcelService()
      ExportExcel.exportAsExcelFile(result.value, '用户设备清单')
    }
    const selectList = ref<any>([])
    const handleSelectData = (item: any) => {
      selectList.value = item
    }

    const mapSelectData = (selectList: any, state: number) => {
      const uids = selectList.value.map((item: any) => item.uid)
      const imeis = selectList.value.map((item: any) => item.imei)
      const ids = selectList.value.map((item: any) => item.id)
      return {
        uids: uids.toString(),
        imeis: imeis.toString(),
        ids: ids.toString(),
        state
      }
    }
    const handleCloseOrOpen = (state: number) => {
      // 将state全部修改为0
      if (selectList.value.length === 0) {
        warnTip('至少选中一条数据')
        return
      }
      const data = mapSelectData(selectList, state)
      infoTipBox({
        title: `批量${state ? '冻结' : '解冻'}设备状态`,
        message: `您确定批量${state ? '冻结' : '解冻'}选中的设备状态吗`
      }).then(() => {
        selectImeiOperation(data).then((res) => {
          if (res.result === 0) {
            handleResetClick()
            successTip(res.msg)
          } else errorTip(res.msg)
        })
      })
    }
    const store = useStore()
    const changeState = (item: any) => {
      infoTipBox({
        title: '修改设备状态',
        message: `您确定将当前用户ID为${item.uid}的设备状态修改为:${
          item.state ? '正常' : '冻结'
        }吗`
      }).then(() => {
        store
          .dispatch('userImeiModule/editPageDataAction', {
            pageName: 'imei',
            editData: {
              id: item.id,
              uid: item.uid,
              imei: item.imei,
              state: item.state ? 0 : 1
            }
          })
          .then((res) => {
            handleResetClick()
            successTip(res)
          })
          .catch((err) => {
            errorTip(err)
          })
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      searchFormConfig,
      handleResetClick,
      handleQueryClick,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfig,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      operationName,
      handleSelectData,
      selectList,
      handleCloseOrOpen,
      changeState,
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
