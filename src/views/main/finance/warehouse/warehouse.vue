<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-10 18:01:08
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
      <template #isHave="{ row }">
        {{ row.num > 0 ? '已拥有' : '未拥有' }}
      </template>
      <template #isState="{ row }">
        {{ row.state ? '上架' : '下架' }}
      </template>
      <template #isGetter="{ row }">
        {{ $filters.formatSelectTitle(row.way, resourceGetWayList) }}
      </template>
      <!-- <template #otherHandler="{ row }">
        <el-button size="mini" type="primary" @click="handleAllEditData(row)"
          >批量编辑</el-button
        >
        <el-button size="mini" @click="exportData">导出Excel</el-button>
      </template> -->
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="wareHouses"
      :modalConfig="modalConfig"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <el-row :gutter="12">
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>POFI ID
            </span>
            <el-select
              placeholder="请输入POFI ID"
              style="width: 100%"
              filterable
              remote
              reserve-keyword
              clearable
              :remote-method="getUserList"
              :loading="loading"
              v-model="otherInfo.nickId"
              @change="changeUserInfo"
            >
              <el-option
                v-for="option in userList"
                :key="option.nickId"
                :value="option.nickId"
                :label="option.nickId"
                >{{ option.nickName }}</el-option
              >
            </el-select>
          </div>
        </el-col>
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title"> 用户昵称 </span>
            <el-input
              v-model="otherInfo.nickName"
              placeholder="系统生成"
              disabled
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>资源编号
            </span>
            <el-select
              placeholder="请输入资源编号"
              style="width: 100%"
              filterable
              remote
              reserve-keyword
              clearable
              :remote-method="getResourceList"
              :loading="loading"
              v-model="otherInfo.moId"
              @change="changeResourceInfo"
            >
              <el-option
                v-for="option in resourceList"
                :key="option.moId"
                :value="option.moId"
                :label="option.moId"
                >{{ option.pname }}</el-option
              >
            </el-select>
          </div>
        </el-col>
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title"> 资源名称 </span>
            <el-input
              v-model="otherInfo.pname"
              placeholder="系统生成"
              disabled
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title"> 标注ID </span>
            <el-input
              v-model="otherInfo.labelId"
              placeholder="系统生成"
              disabled
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row :gutter="12" v-if="operationType === 'all'">
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title"> 选中人数 </span>
            <el-input
              v-model="otherInfo.pofiId"
              placeholder="系统生成"
              disabled
            ></el-input>
          </div>
        </el-col>
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title"> 选中资源数目 </span>
            <el-input
              v-model="otherInfo.pofiId"
              placeholder="系统生成"
              disabled
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>是否拥有
            </span>
            <el-select
              v-model="otherInfo.isHave"
              placeholder="请选择是否拥有"
              style="width: 100%"
            >
              <el-option label="已拥有" :value="true">已拥有</el-option>
              <el-option label="未拥有" :value="false">未拥有</el-option>
            </el-select>
          </div>
        </el-col>
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>修改原因
            </span>
            <el-input
              v-model="otherInfo.remark"
              type="textarea"
              :rows="3"
              placeholder="请输入修改原因"
            ></el-input>
          </div>
        </el-col>
      </el-row>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStoreName, useMapSearch } from './hooks/use-page-list'
import { ExcelService } from '@/utils/exportExcel'
import { mapTimeToSearch } from '@/utils'
import { warnTip, errorTip } from '@/utils/tip-info'
import { getCommonSelectList, getCommonSelectList1 } from '@/service/common'
import { resourceGetWayList } from '@/utils/select-list/map-resource-list'

export default defineComponent({
  name: 'financeWarehouse',
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
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
    // const mapField = (type: any) => {
    //   if (type === 'all') {
    //     modalConfig.title = '用户资源仓库 (多数据编辑)'
    //     modalConfig.formItems.map((item: any) => {
    //       if (item.field === 'selectNumber') item!.isHidden = false
    //       if (item.field === 'selectResource') item!.isHidden = false
    //       if (item.field === 'nickId') item!.isHidden = true
    //       if (item.field === 'nickName') item!.isHidden = true
    //       if (item.field === 'snId') item!.isHidden = true
    //       if (item.field === 'resourceName') item!.isHidden = true
    //       if (item.field === 'id') item!.isHidden = true
    //     })
    //   } else {
    //     modalConfig.title = '用户资源仓库 (单数据编辑)'
    //     modalConfig.formItems.map((item: any) => {
    //       if (item.field === 'selectNumber') item!.isHidden = true
    //       if (item.field === 'selectResource') item!.isHidden = true
    //       if (item.field === 'nickId') item!.isHidden = false
    //       if (item.field === 'nickName') item!.isHidden = false
    //       if (item.field === 'snId') item!.isHidden = false
    //       if (item.field === 'resourceName') item!.isHidden = false
    //       if (item.field === 'id') item!.isHidden = false
    //     })
    //   }
    // }
    // 批量处理数据
    const selectList = ref<any>([])
    const handleSelectData = (item: any) => {
      selectList.value = item
    }
    const handleAllEditData = () => {
      operationType.value = 'all'
      // mapField('all')
      if (selectList?.value?.length === 0) {
        warnTip('至少选中一个')
        return
      } else {
        handleEditData({
          selectNumber: selectList.value.length + '人'
        })
      }
    }
    // 表单操作
    const operationType = ref<string>('add')
    const otherInfo = ref<any>({})
    const userList = ref<any>([])
    const resourceList = ref<any>([])
    const loading = ref<boolean>(false)
    const getUserList = (author: string) => {
      loading.value = true
      getCommonSelectList('authorType', { author: author }, false)
        .then((res) => {
          if (res.result === 0) {
            userList.value = res.data
          } else errorTip(res.msg)
        })
        .finally(() => (loading.value = false))
    }
    const changeUserInfo = (item: any) => {
      const selectItem = userList.value.find((i: any) => i.nickId === item)
      otherInfo.value = {
        ...otherInfo.value,
        nickName: selectItem ? selectItem.nickName : '',
        uid: selectItem ? selectItem.uid : ''
      }
    }
    const getResourceList = (keyword: string) => {
      loading.value = true
      getCommonSelectList1(keyword, false)
        .then((res) => {
          if (res.result === 0) {
            resourceList.value = res.data
          } else errorTip(res.msg)
        })
        .finally(() => (loading.value = false))
    }
    const changeResourceInfo = (item: any) => {
      const selectItem = resourceList.value.find((i: any) => i.moId === item)
      otherInfo.value = {
        ...otherInfo.value,
        pname: selectItem ? selectItem.pname : '',
        labelId: selectItem ? selectItem.nickId : ''
      }
    }
    const newData = () => {
      operationType.value = 'add'
      otherInfo.value = {}
    }
    const editData = (item: any) => {
      operationType.value = 'edit'
      // mapField('edit')
      otherInfo.value = {
        id: item.id,
        uid: item.uid,
        nickId: item.nickId,
        nickName: item.nickName,
        pname: item.pname,
        labelId: item.labelId,
        moId: item.moid,
        isHave: item.num > 0 ? true : false
      }
      handleEditData(item)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    const { searchFormConfigRef, searchFormConfig } = useMapSearch()
    return {
      resourceGetWayList,
      operationType,
      otherInfo,
      loading,
      userList,
      resourceList,
      getUserList,
      changeUserInfo,
      getResourceList,
      changeResourceInfo,
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
