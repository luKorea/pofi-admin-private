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
    <!-- 当前模态框只展示类型属性，其他编辑在其他展示 -->
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="centers"
      :modalConfig="propertyModalConfig"
      :operationName="operationName"
      :otherInfo="otherInfo"
      @changeSelect="handleChangeSelect"
    >
      <!-- 使用条件 -->
      <el-row :gutter="12">
        <el-col
          v-bind="propertyModalConfig.colLayout"
          v-if="otherInfo.open === 2 || editType === 'edit'"
        >
          <div class="item-flex">
            <span class="item-title">商品编号</span>
            <el-select
              v-model="otherInfo.snId"
              placeholder="商品编号"
              style="width: 100%"
              :disabled="
                otherInfo.open === 2 && editType === 'add' ? true : false
              "
            >
              <el-option
                v-for="item in goodsList"
                :key="item.value"
                :label="item.title"
                :value="item.value"
                >{{ item.title }}</el-option
              >
            </el-select>
          </div>
        </el-col>
        <el-col
          v-bind="propertyModalConfig.colLayout"
          v-if="otherInfo.open === 2"
        >
          <div class="item-flex">
            <span class="item-title">销售价</span>
            <el-input-number
              min="0"
              v-model="otherInfo.sale"
              placeholder="请输入销售价"
              style="width: 100%"
            ></el-input-number>
          </div>
        </el-col>
        <el-col
          v-bind="propertyModalConfig.colLayout"
          v-if="otherInfo.open === 4"
        >
          <div class="item-flex">
            <span class="item-title">功能分类</span>
            <el-checkbox-group v-model="otherInfo.vipList">
              <el-checkbox
                v-for="item in functionExclusiveUseConditionsList"
                :key="item.value"
                :label="item.value"
                >{{ item.title }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>
      <!-- 国家地区 -->
      <el-row :gutter="12">
        <el-col v-bind="propertyModalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">地区</span>
            <el-select
              placeholder="请选择国家地区，不选默认全部"
              style="width: 100%"
              clearable
              v-model="areaIds"
              multiple
              collapse-tags
              @change="handleChangeCountry($event)"
            >
              <el-option
                v-for="option in countryList"
                :key="option.id"
                :value="option.value"
                :label="option.title"
                >{{ option.title }}</el-option
              >
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!-- 资源特色 -->
      <el-tooltip content="最多只能选择三个" placement="top">
        <el-divider>资源特色 </el-divider></el-tooltip
      >
      <el-checkbox-group v-model="otherInfo.spList" :max="3">
        <el-row>
          <div class="hg-flex hg-mb-3">
            <span class="tip-title">重点功能：</span>
            <template v-for="item in resourceFeature" :key="item.value">
              <el-checkbox v-if="item.type === 1" :label="item.value">{{
                item.title
              }}</el-checkbox>
            </template>
          </div>
        </el-row>
        <el-row>
          <div class="hg-flex hg-mb-3">
            <span class="tip-title">模型精度：</span>
            <template v-for="item in resourceFeature" :key="item.value">
              <el-checkbox v-if="item.type === 2" :label="item.value">{{
                item.title
              }}</el-checkbox>
            </template>
          </div>
        </el-row>
        <el-row>
          <div class="hg-flex hg-mb-3 hg-flex-wrap">
            <span class="tip-title">POFI 系列：</span>
            <template v-for="item in resourceFeature" :key="item.value">
              <el-checkbox v-if="item.type === 3" :label="item.value">{{
                item.title
              }}</el-checkbox>
            </template>
          </div>
        </el-row>
        <el-row>
          <div class="hg-flex hg-mb-3 hg-flex-wrap">
            <span class="tip-title">合作品牌IP：</span>
            <template v-for="item in resourceFeature" :key="item.value">
              <el-checkbox v-if="item.type === 4" :label="item.value">{{
                item.title
              }}</el-checkbox>
            </template>
          </div>
        </el-row>
      </el-checkbox-group>
    </page-modal>

    <!-- 流程图组件 -->
    <process-component ref="processRef"></process-component>
    <!-- 时间状态组件 -->
    <timer-component
      ref="timerRef"
      @getData="handleQueryClick"
    ></timer-component>
    <!-- U3D组件 -->
    <u3d-component ref="u3dRef" @getData="handleQueryClick"></u3d-component>
    <!-- 资源资料 -->
    <resource-component
      ref="resourceRef"
      @getData="handleQueryClick"
    ></resource-component>
    <!-- 相关关联 -->
    <relevance-component
      ref="relevanceRef"
      @getData="handleQueryClick"
    ></relevance-component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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
import timerComponent from './components/timer.vue'
import u3dComponent from './components/u3d.vue'
import resourceComponent from './components/resource.vue'
import relevanceComponent from './components/relevance.vue'

export default defineComponent({
  name: 'resourceCenter',
  components: {
    processComponent,
    timerComponent,
    u3dComponent,
    resourceComponent,
    relevanceComponent
  },
  setup() {
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
    // 新增模态框
    const handleChangeNewData = (item: any) => {
      item.libraryName = item.title
      item.u3dType = +item.value
      otherInfo.value = {
        ...otherInfo.value,
        snId: undefined,
        open: undefined
      }
      editType.value = 'add'
      // item.funcList = []
      handleNewData(item, true)
    }
    // 编辑模态框
    const timerRef = ref<any>() // 时间状态框
    const u3dRef = ref<any>() // u3d
    const resourceRef = ref<any>() // 资源资料
    const relevanceRef = ref<any>() // 相关关联
    const handleChangeEditData = (row: any, item: any) => {
      // 这里需要做函数抽离，明天完成
      console.log(row)
      switch (item) {
        case 'property':
          editType.value = 'edit'
          otherInfo.value = {
            ...otherInfo.value,
            snId: row.snId,
            open: row.open
          }
          handleEditData(row)
          break
        case 'timer':
          timerRef.value && timerRef.value.handleEditData(row)
          break
        case 'u3d':
          u3dRef.value && u3dRef.value.handleEditData(row)
          break
        case 'resource':
          resourceRef.value && resourceRef.value.handleEditData(row)
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
      goodsList,
      editType,
      // 编辑模态框
      modalType,
      // 新增模态框
      handleChangeNewData,
      handleChangeEditData,
      // 模态框表单数据
      propertyModalConfig,
      resourceFeature,
      functionExclusiveUseConditionsList,
      countryList,
      otherInfo,
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
