<!-- /cms/mold/get -->
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
                <el-dropdown-item
                  @click="
                    handleChangeNewData({
                      title: '人偶库',
                      value: item.value
                    })
                  "
                  >{{ item.title }}</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button
          type="danger"
          plain
          size="mini"
          @click="handleChangeNewData({ title: 'Pose库', value: 7 })"
          >新增Pose库</el-button
        >
        <el-button
          type="primary"
          plain
          size="mini"
          style="margin-right: 10px"
          @click="handleChangeNewData({ title: '动画库', value: 8 })"
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
      <template #otherTableHandler="{ row }">
        <el-dropdown trigger="click">
          <el-button size="mini" plain class="hg-flex hg-items-center">
            编辑<i class="el-icon-arrow-down hg-ml-1"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <template v-for="item in modalType" :key="item.type">
                <el-dropdown-item
                  @click="handleChangeEditData(row, item.type)"
                  >{{ item.title }}</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </page-content>
    <!-- 流程图组件 -->
    <process-component ref="processRef"></process-component>
    <!-- 当前模态框只展示类型属性，其他编辑在其他展示 -->
    <!-- 属性组件 -->
    <property-component
      ref="propertyRef"
      @getData="handleQueryClick"
      @changePage="changePage"
      :edit-type="editType"
      :other-info="otherInfo"
    ></property-component>
    <!-- U3D组件 -->
    <u3d-component
      ref="u3dRef"
      @changePage="changePage"
      :edit-type="editType"
      @getData="handleQueryClick"
    ></u3d-component>
    <!-- 资源资料 -->
    <resource-component
      ref="resourceRef"
      :edit-type="editType"
      :item-data="itemData"
      @changePage="changePage"
      @getData="handleQueryClick"
    ></resource-component>
    <!-- 相关关联 -->
    <relevance-component
      ref="relevanceRef"
      :edit-type="editType"
      @changePage="changePage"
      @getData="handleQueryClick"
    ></relevance-component>
    <!-- 时间状态组件 -->
    <timer-component
      ref="timerRef"
      :edit-type="editType"
      @changePage="changePage"
      :all-data="allData"
      @getData="handleQueryClick"
      :resource-state-list="resourceValueList"
    ></timer-component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import {
  useStoreName,
  usePageFunction,
  useMapFormConfigData,
  useMapDifferentModal,
  useMapPropertyData,
  useCountrySelect,
  usePageList
} from './hooks/use-page-list'
import { infoTipBox, warnTip, successTip, errorTip } from '@/utils/tip-info'
import { selectImeiOperation } from '@/service/main/device/imei'

import processComponent from './components/process.vue'
import propertyComponent from './components/property.vue'
import timerComponent from './components/timer.vue'
import u3dComponent from './components/u3d.vue'
import resourceComponent from './components/resource.vue'
import relevanceComponent from './components/relevance.vue'
import { resourceFileOperation } from '@/service/main/resource/center'
import { getItemData } from '@/service/common-api'

export default defineComponent({
  name: 'resourceCenter',
  components: {
    processComponent,
    propertyComponent,
    timerComponent,
    u3dComponent,
    resourceComponent,
    relevanceComponent
  },
  setup() {
    // 控制步骤
    const dataStep = ref<number>(0)
    const { goodsList } = usePageList()
    const editType = ref<any>('add')
    // 编辑模态框
    const [modalType] = useMapDifferentModal()
    const [processRef, openProcessDialog, mapTitle] = usePageFunction()
    const [
      searchFormConfigData,
      resourceTypeList,
      resourceConditionList,
      resourceValueList,
      unityModalFilterList,
      unityModalList
    ] = useMapFormConfigData()
    const [otherInfo, areaIds, handleChangeCountry] = useCountrySelect()
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
    watchEffect(() => {
      if (otherInfo.value) {
        otherInfo.value = {
          ...otherInfo.value,
          vipList: otherInfo.value.vipList.toString(),
          spList: otherInfo.value.spList.toString()
        }
      }
    })
    // 模态框
    const propertyRef = ref<any>() // 类型属性
    const timerRef = ref<any>() // 时间状态框
    const u3dRef = ref<any>() // u3d
    const resourceRef = ref<any>() // 资源资料
    const itemData = ref<any>()
    const relevanceRef = ref<any>() // 相关关联
    // 新增模态框
    const handleChangeNewData = (item: any) => {
      editType.value = 'add'
      if (propertyRef.value) {
        propertyRef.value.handleNewData(item, true)
      }
    }
    const allData = ref<any>()
    const changePage = (item: any, data: any) => {
      allData.value = {
        ...allData.value,
        ...data
      }
      switch (item) {
        case 'property':
          propertyRef.value && propertyRef.value.handleNewData()
          break
        case 'timer':
          timerRef.value && timerRef.value.handleNewData()
          break
        case 'u3d':
          u3dRef.value && u3dRef.value.handleNewData()
          break
        case 'resource':
          resourceRef.value && resourceRef.value.handleNewData()
          break
        case 'relevance':
          relevanceRef.value && relevanceRef.value.handleNewData()
          break
      }
    }
    const handleChangeEditData = (row: any, item: any) => {
      // 这里需要做函数抽离，明天完成
      editType.value = 'edit'
      switch (item) {
        case 'property':
          getItemData('resourceCenterItem', {
            moId: row.moId
          }).then((res: any) => {
            if (res.result === 0) {
              otherInfo.value = {
                ...otherInfo.value,
                snId: row.snId,
                open: row.open,
                areaIds: res.data.areaIds.toString()
              }
              areaIds.value = res.data.areaIds
              propertyRef.value.handleEditData(res.data)
            } else errorTip(res.msg)
          })
          break
        case 'timer':
          timerRef.value && timerRef.value.handleEditData(row)
          break
        case 'u3d':
          u3dRef.value && u3dRef.value.handleEditData(row)
          break
        case 'resource':
          resourceFileOperation(
            {
              moId: row.moId
            },
            'get'
          ).then((res: any) => {
            if (res.result === 0) {
              itemData.value = res.data.moldList
              resourceRef.value && resourceRef.value.handleEditData(row)
            } else errorTip(res.msg)
          })
          break
        case 'relevance':
          relevanceRef.value && relevanceRef.value.handleEditData(row)
          break
      }
    }
    const {
      propertyModalConfig,
      resourceFeature,
      functionExclusiveUseConditionsList,
      countryList
    } = useMapPropertyData()
    // 控制使用条件
    const handleChangeSelect = (item: any) => {
      if (item.field === 'open') {
        otherInfo.value = {
          ...otherInfo.value,
          open: +item.value
        }
      }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      dataStep,
      allData,
      goodsList,
      editType,
      // 编辑模态框
      modalType,
      changePage,
      // 新增模态框
      handleChangeNewData,
      handleChangeEditData,
      // 模态框表单数据
      propertyModalConfig,
      resourceFeature,
      functionExclusiveUseConditionsList,
      countryList,
      otherInfo,
      itemData,
      // 国家下拉
      areaIds,
      handleChangeCountry,
      handleChangeSelect,
      searchFormConfigData,
      resourceTypeList,
      resourceConditionList,
      resourceValueList,
      unityModalFilterList,
      unityModalList,
      mapTitle,
      // 流程图
      processRef,
      propertyRef,
      timerRef,
      u3dRef,
      resourceRef,
      relevanceRef,
      openProcessDialog,
      handleResetClick,
      handleQueryClick,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
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
