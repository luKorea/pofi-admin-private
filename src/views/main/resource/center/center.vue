<template>
  <div class="resource-center" v-if="1">
    <page-search
      :searchFormConfig="searchFormConfigData"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="centers"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @selectAllBtnClick="handleSelectData"
    >
      <template #isU3D="{ row }">
        <span>{{ mapTitle(row.unityType, unityModalList) }}</span>
      </template>
      <template #isOpen="{ row }">
        <span>{{ mapTitle(row.open, resourceConditionList) }}</span>
      </template>
      <template #isState="{ row }">
        <span>{{ mapTitle(row.state, resourceValueList) }}</span>
      </template>
      <template #isVersion="{ row }">
        <div class="hg-flex hg-flex-col hg-justify-start hg-items-start">
          <span>ios：{{ row.iosVersion }}</span>
          <span>Android：{{ row.androidVersion }}</span>
        </div>
      </template>
      <template #otherHandler>
        <!-- 流程图 -->
        <el-tooltip content="上传流程图" placement="top">
          <el-button
            size="mini"
            type="text"
            @click="openProcessDialog"
            style="font-size: 20px; color: #ccc; margin-right: 10px"
            icon="el-icon-info"
          >
          </el-button>
        </el-tooltip>
        <!-- 新增操作 -->
        <el-dropdown trigger="click" style="margin-right: 10px">
          <el-button
            size="mini"
            type="success"
            plain
            class="hg-flex hg-items-center"
          >
            新增资源<i class="el-icon-arrow-down hg-ml-1"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <template v-for="item in unityModalFilterList" :key="item.value">
                <el-dropdown-item @click="handleChangeState(item.value)">{{
                  item.title
                }}</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button type="danger" plain size="mini">新增Pose库</el-button>
        <el-button type="primary" plain size="mini" style="margin-right: 10px"
          >新增动画库</el-button
        >
        <!-- 批量操作 -->
        <el-dropdown trigger="click" style="margin-right: 4px">
          <el-button
            size="mini"
            plain
            type="danger"
            class="hg-flex hg-items-center"
          >
            批量操作<i class="el-icon-arrow-down hg-ml-1"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <template v-for="item in resourceValueList" :key="item.value">
                <el-dropdown-item @click="handleChangeState(item.value)">{{
                  item.title
                }}</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <!-- 表格操作 -->
      <template #otherTableHandler>
        <el-dropdown trigger="click">
          <el-button size="mini" plain class="hg-flex hg-items-center">
            编辑<i class="el-icon-arrow-down hg-ml-1"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>类型属性</el-dropdown-item>
              <el-dropdown-item>资源资料</el-dropdown-item>
              <el-dropdown-item>U3D文件</el-dropdown-item>
              <el-dropdown-item>相关关联</el-dropdown-item>
              <el-dropdown-item>时间状态</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="centers"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
    >
    </page-modal>

    <!-- 流程图组件 -->
    <process-component ref="processRef"></process-component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import {
  useStoreName,
  usePageFunction,
  useMapFormConfigData
} from './hooks/use-page-list'
import { infoTipBox, warnTip, successTip, errorTip } from '@/utils/tip-info'
import { selectImeiOperation } from '@/service/main/device/imei'

import processComponent from './copmonents/process.vue'

export default defineComponent({
  name: 'resourceCenter',
  components: {
    processComponent
  },
  setup() {
    const [processRef, openProcessDialog, mapTitle] = usePageFunction()
    const [
      searchFormConfigData,
      resourceTypeList,
      resourceConditionList,
      resourceValueList,
      unityModalFilterList,
      unityModalList
    ] = useMapFormConfigData()
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    // 多选全选操作
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
    const handleChangeState = (state: number) => {
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
        selectImeiOperation(data).then((res: any) => {
          if (res.result === 0) {
            handleResetClick()
            successTip(res.msg)
          } else errorTip(res.msg)
        })
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      searchFormConfigData,
      resourceTypeList,
      resourceConditionList,
      resourceValueList,
      unityModalFilterList,
      unityModalList,
      mapTitle,
      // 流程图
      processRef,
      openProcessDialog,
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
      handleChangeState
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
