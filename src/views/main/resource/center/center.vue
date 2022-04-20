<!-- /cms/mold/get -->
<template>
  <div class="resource-center" v-if="1">
    <page-search
      :searchFormConfig="searchFormConfigData"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryBtnClick"
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
                    handleChangeEditData(
                      'property',
                      {
                        title: '人偶库',
                        value: item.value
                      },
                      'add'
                    )
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
          @click="
            handleChangeEditData(
              'property',
              { title: 'Pose库', value: 7 },
              'add'
            )
          "
          >新增Pose库</el-button
        >
        <el-button
          type="primary"
          plain
          size="mini"
          style="margin-right: 10px"
          @click="
            handleChangeEditData(
              'property',
              { title: '动画库', value: 8 },
              'add'
            )
          "
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
                <el-dropdown-item
                  @click="handleChangeState(item.value, item.title)"
                  >{{ item.title }}</el-dropdown-item
                >
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
                  @click="handleChangeEditData(item.type, row)"
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
    <!-- 1. 属性组件 -->
    <property-component
      ref="propertyRef"
      :params="params"
      :edit-type="editType"
      :other-info="otherInfo"
      @openStep="openStep"
      @getData="getTableData"
      @changePage="changePage"
    ></property-component>
    <!-- 2. 资源资料 -->
    <resource-component
      ref="resourceRef"
      :params="params"
      :edit-type="editType"
      :item-data="itemData"
      :edit-data="editData"
      @changePage="changePage"
      @openStep="openStep"
      @getData="getTableData"
    ></resource-component>
    <!-- 3. U3D组件 -->
    <u3d-component
      ref="u3dRef"
      :params="params"
      :edit-data="editData"
      :edit-type="editType"
      @changePage="changePage"
      @openStep="openStep"
      @getData="getTableData"
    ></u3d-component>
    <!-- 4. 相关关联 -->
    <relevance-component
      ref="relevanceRef"
      :params="params"
      :edit-type="editType"
      :edit-data="editData"
      @openStep="openStep"
      @changePage="changePage"
      @getData="getTableData"
    ></relevance-component>
    <!-- 5. 时间状态组件 -->
    <timer-component
      ref="timerRef"
      :params="params"
      :edit-type="editType"
      :all-data="allData"
      :resource-state-list="resourceValueList"
      @changePage="changePage"
      @openStep="openStep"
      @getData="getTableData"
    ></timer-component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'

import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import {
  useStoreName,
  usePageFunction,
  useMapFormConfigData,
  useMapDifferentModal,
  useCountrySelect,
  useSetLanguage
} from './hooks/use-page-list'
import { infoTipBox, warnTip, successTip, errorTip } from '@/utils/tip-info'
import processComponent from './components/process.vue'
import propertyComponent from './components/property.vue'
import timerComponent from './components/timer.vue'
import u3dComponent from './components/u3d.vue'
import resourceComponent from './components/resource.vue'
import relevanceComponent from './components/relevance.vue'
import { resourceFileOperation } from '@/service/main/resource/center'
import { getItemData } from '@/service/common-api'
import { selectResourceTypeOperation } from '@/service/main/resource/center'
import { mapImageToObject } from '@/utils/index'
import { mapSelectListTitle } from '@/utils'
import { mapTimeToSearch } from '../../../../utils/index'
import { useStore } from '@/store'

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
    const editType = ref<any>('add')
    const { requiredField, mapIconState, languageId } = useSetLanguage()
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
    const [otherInfo] = useCountrySelect(editType.value)
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    // 查询操作
    const handleQueryBtnClick = (data: any) => {
      const begin = mapTimeToSearch(data.dateTime).start
      const end = mapTimeToSearch(data.dateTime).end
      const onlineBegin = mapTimeToSearch(data.onlineTime).start
      const onlineEnd = mapTimeToSearch(data.onlineTime).end
      handleQueryClick({
        ...data,
        onlineTime: undefined,
        dateTime: undefined,
        begin,
        end,
        onlineBegin,
        onlineEnd
      })
    }
    // 获取表格数据
    const store = useStore()
    const getTableData = () => {
      store.dispatch('resourceCenterModule/getPageListAction', {
        pageName: 'centers',
        queryInfo: store.state.resourceCenterModule.queryInfo
      })
    }
    // 多选全选操作
    const selectList = ref<any>([])
    const handleSelectData = (item: any) => {
      selectList.value = item
    }
    const mapSelectData = (selectList: any, state: number) => {
      const ids = selectList.value.map((item: any) => item.id)
      return {
        ids: ids.toString(),
        state
      }
    }
    const handleChangeState = (state: number, title: string) => {
      // 将state全部修改为0
      if (selectList.value.length === 0) {
        warnTip('至少选中一条数据')
        return
      }
      const data = mapSelectData(selectList, state)
      infoTipBox({
        title: `批量修改资源状态`,
        message: `确认将资源状态批量修改为: ${title}?`
      }).then(() => {
        selectResourceTypeOperation(data).then((res: any) => {
          if (res.result === 0) {
            handleResetClick()
            successTip(res.msg)
          } else errorTip(res.msg)
        })
      })
    }
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
      params.value = {}
      if (propertyRef.value) {
        propertyRef.value.handleNewData(item, true)
      }
    }
    // 参数说明
    // allData 用来存储用户新增时页面传递的数据

    const hiddenPage = () => {
      if (timerRef.value) {
        timerRef.value.pageModalRef.dialogVisible = false
      }
      if (u3dRef.value) {
        u3dRef.value.pageModalRef.dialogVisible = false
      }
      if (resourceRef.value) {
        resourceRef.value.pageModalRef.dialogVisible = false
      }
      if (resourceRef.value) {
        relevanceRef.value.pageModalRef.dialogVisible = false
      }
      if (propertyRef.value) {
        propertyRef.value.pageModalRef.dialogVisible = false
      }
    }
    const allData = ref<any>()
    /**
     * @param item 页面类型
     * @param data 用户传递的数据
     * @param params 第一次页面传递的参数，新增类型属性时会带有
     */
    const changePage = (item: any, params: any) => {
      switch (item) {
        case 'property':
          hiddenPage()
          handleChangeEditData(item, params, 'add')
          break
        case 'timer':
          hiddenPage()
          handleChangeEditData(item, params, 'add')
          break
        case 'u3d':
          hiddenPage()
          handleChangeEditData(item, params, 'add')
          break
        case 'resource':
          hiddenPage()
          handleChangeEditData(item, params, 'add')
          break
        case 'relevance':
          hiddenPage()
          handleChangeEditData(item, params, 'add')
          break
      }
    }
    const params = ref<any>()
    const editData = ref<any>()
    // 获取资源属性
    const getProperty = (row: any) => {
      getItemData('resourceCenterItem', {
        moId: row.moId
      }).then((res: any) => {
        if (res.result === 0) {
          propertyRef.value.otherInfo = {
            ...propertyRef.value.otherInfo,
            snId: row.snId,
            open: row.open,
            areaIds: res.data.areaIds.toString(),
            specialIcon: res.data.specialIcon
              ? res.data.specialIcon.split(',').map((i: any) => +i)
              : [],
            editType: 'edit',
            vipInt:
              res.data.vipList && res.data.vipList.length > 0
                ? res.data.vipList.map((i: any) => +i)
                : [],
            sale: res.data.sale
          }
          console.log(propertyRef.value.otherInfo, 'other')
          if (res.data.unityType == 7) res.data['libraryName'] = 'Pose库'
          else if (res.data.unityType == 8) res.data['libraryName'] = '动画库'
          else res.data['libraryName'] = '人偶库'
          res.data['keyFunc'] = res.data.keyFunc.split(',').map((i: any) => +i)
          console.log(res.data['keyFunc'])
          propertyRef.value.handleEditData(res.data)
        } else errorTip(res.msg)
      })
    }
    // 获取U3d资源
    const getU3d = (item: any) => {
      getItemData('u3dItem', {
        osType: item,
        moId: params.value.moId
      }).then((res: any) => {
        if (res.result === 0) {
          editData.value = res.data
          u3dRef.value &&
            u3dRef.value.handleEditData({
              ...res.data,
              ...params.value
            })
          const data = res.data
          const value = u3dRef.value.otherInfo
          if (data) {
            if (item === 1) {
              value.iosVersion = `版本号：${data.version} 名字: ${data.name} 文件大小: ${data.size} 更新时间：${data.createTime}`
            } else {
              value.androidVersion = `版本号：${data.version} 名字: ${data.name} 文件大小: ${data.size} 更新时间：${data.createTime}`
            }
          }
        } else errorTip(res.msg)
      })
    }
    // 获取相关关联
    const getRelevance = () => {
      getItemData('relevanceItem', {
        moId: params.value.moId
      }).then((res: any) => {
        if (res.result === 0) {
          editData.value = res.data
          if (+params.value.isPrep === 2) {
            relevanceRef.value.showEditTable = true
            relevanceRef.value.prepEditList = res.data.chief.map((i: any) => {
              return {
                ...i,
                openType: mapSelectListTitle(
                  i.open,
                  resourceConditionList as any
                )
              }
            })
            relevanceRef.value.subPrepEditList = res.data.noChief.map(
              (i: any) => {
                return {
                  ...i,
                  openType: mapSelectListTitle(
                    i.open,
                    resourceConditionList as any
                  )
                }
              }
            )
          } else {
            relevanceRef.value.showEditTable = false
            relevanceRef.value.prepEditList = []
            relevanceRef.value.subPrepEditList = []
          }
          relevanceRef.value &&
            relevanceRef.value.handleEditData({
              ...res.data,
              moId: params.value.moId,
              cidList: res.data.sortList,
              isPrep: params.value.isPrep,
              rel: params.value.rel
            })
        } else errorTip(res.msg)
      })
    }
    // 获取资源资料
    const getResource = (row: any) => {
      resourceFileOperation(
        {
          moId: params.value.moId
        },
        'get'
      ).then((res: any) => {
        if (res.result === 0) {
          if (res.data && res.data.moldList && res.data.moldList.length > 0) {
            let result: any[] = []
            result = res?.data?.moldList.map((item: any) => {
              let b0List = []
              let c0List = []
              let d0List = []
              b0List =
                item.b0 && item.b0.length > 0
                  ? item.b0.map((i: any) => {
                      return mapImageToObject(i)
                    })
                  : []
              c0List =
                item.c0 && item.c0.length > 0
                  ? item.c0.map((i: any) => {
                      return mapImageToObject(i)
                    })
                  : []
              d0List =
                item.d0 && item.d0.length > 0
                  ? item.d0.map((i: any) => {
                      return mapImageToObject(i)
                    })
                  : []
              console.log(b0List)
              return {
                ...item,
                coverList: item.cover ? [mapImageToObject(item.cover)] : [],
                giftList: item.gift ? [mapImageToObject(item.gift)] : [],
                b0List,
                c0List,
                d0List
              }
            })
            resourceRef.value.languageList = result
            languageId.value = result[0].lid
            resourceRef.value && resourceRef.value.handleEditData(result)
          } else {
            if (resourceRef.value) {
              resourceRef.value.resetLanguageList()
              resourceRef.value.handleEditData(row)
            }
          }
        } else errorTip(res.msg)
      })
    }
    const handleChangeEditData = (type: any, row: any, checkType = 'edit') => {
      // 这里需要做函数抽离，明天完成
      editType.value = checkType
      params.value = {
        ...row
      }
      switch (type) {
        case 'property':
          hiddenPage()
          if (editType.value === 'add') {
            console.log(row)
            row.libraryName = row.title
            row.unityType = +row.value
            propertyRef.value.otherInfo = {
              ...propertyRef.value.otherInfo,
              open: undefined,
              specialIcon: [],
              vipInt: []
            }
            propertyRef.value.handleEditData(row)
          } else {
            getProperty(row)
          }
          break
        case 'timer':
          hiddenPage()
          editData.value = row
          timerRef.value && timerRef.value.handleEditData(row)
          break
        case 'u3d':
          hiddenPage()
          if (editType.value === 'add') {
            u3dRef.value.otherInfo = {
              iosSourceUrl: '',
              iosList: [],
              androidSourceUrl: '',
              androidList: [],
              androidVersion: '',
              iosVersion: '',
              iosChose: {},
              androidChose: {},
              type: 'ios'
            }
            u3dRef.value.fileInfo = {}
            u3dRef.value && u3dRef.value.handleEditData(row)
          } else {
            u3dRef.value.otherInfo = {
              iosSourceUrl: '',
              iosList: [],
              androidSourceUrl: '',
              androidList: [],
              androidVersion: '',
              iosVersion: '',
              iosChose: {},
              androidChose: {},
              type: 'ios'
            }
            u3dRef.value.fileInfo = {}
            getU3d(1)
            getU3d(0)
          }
          break
        case 'resource':
          hiddenPage()
          if (editType.value === 'add') {
            resourceRef.value && resourceRef.value.handleEditData(row)
          } else {
            getResource(row)
          }
          break
        case 'relevance':
          hiddenPage()
          if (editType.value === 'add') {
            relevanceRef.value.showEditTable = false
            relevanceRef.value.modalConfigRef.formItems.map((i: any) => {
              if (i.field === 'rel') i!.isHidden = true
              if (i.field === 'prep') i!.isHidden = true
              if (i.field === 'subPrep') i!.isHidden = true
            })
            relevanceRef.value.prepEditList = []
            relevanceRef.value.subPrepEditList = []
            relevanceRef.value && relevanceRef.value.handleEditData(row)
          } else {
            getRelevance()
          }
          break
      }
    }
    const openStep = (item: any, data: any) => {
      handleChangeEditData(item, data)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      getTableData,
      dataStep,
      allData,
      editType,
      params,
      editData,
      openStep,
      // 编辑模态框
      modalType,
      changePage,
      // 新增模态框
      handleChangeNewData,
      handleChangeEditData,
      // 模态框表单数据
      otherInfo,
      itemData,
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
      handleQueryBtnClick,
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
