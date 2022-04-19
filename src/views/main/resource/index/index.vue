<template>
  <div class="hg-flex help-questionType">
    <page-country
      ref="countryRef"
      :countryList="handleCountryList"
      @selectCountryItem="selectCountryClick"
    ></page-country>
    <div class="page-country-wrap">
      <el-row :gutter="12">
        <el-col :span="12">
          <seriesComponent @nodeClick="nodeClick"></seriesComponent>
        </el-col>
        <el-col :span="12">
          <page-search
            :searchFormConfig="searchFormConfigRef"
            @resetBtnClick="handleResetBtnClick"
            @queryBtnClick="handleQueryBtnClick"
          />
        </el-col>
      </el-row>
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        :storeTypeInfo="storeTypeInfo"
        pageName="resourceHomes"
        @newBtnClick="handleNewData"
        @editBtnClick="editData"
      >
        <template #isStatus="scope">
          {{ scope.row.status == 1 ? '显示' : '不显示' }}
        </template>
        <template #isLibrary="scope">
          {{ scope.row.library == 1 ? '人偶库' : 'pose库' }}
        </template>
        <template #isType="scope">
          {{ $filters.formatSelectTitle(scope.row.type, contentList) }}
        </template>
        <template #isCountry="scope">
          {{ $filters.formatSelectTitle(scope.row.rid, countryListMap) }}
        </template>
        <template #isCategory="scope">
          {{ $filters.formatSelectTitle(scope.row.category, categoryList) }}
        </template>
      </page-content>
    </div>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="resourceHomes"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
      @changeSelect="handleChangeSelect"
    >
      <el-row :gutter="12">
        <el-col v-bind="modalConfigRef.colLayout">
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
                :value="option.id"
                :label="option.name"
                >{{ option.name }}</el-option
              >
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!-- 多语言 -->
      <page-language
        :languageList="languageList"
        :languageId="languageId"
        :languageBtnList="languageBtnList"
        @changeLanguage="handleChangeLanguage"
      >
        <template #formItem>
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              内容标题
            </span>
            <el-input
              v-model="languageItem.title"
              placeholder="请输入内容标题"
              clearable
            ></el-input>
          </div>
          <!-- 可编辑表格 -->
          <editor-table
            :listData="languageItem.childListStr"
            v-bind="contentTableEditConfigRef"
            :handleDraw="operationType === 'add' ? false : true"
            :editTableDraw="operationType === 'add' ? false : true"
            @drawTable="handleDrawTable"
          >
            <template #otherHandler>
              <el-button type="primary" size="mini" @click="handleNewTableData"
                >新增</el-button
              >
            </template>
            <template #isShare="{ row }">
              <el-button
                type="text"
                size="mini"
                @click="handleChangeEditTableBtn(row)"
                >大小矩形</el-button
              >
            </template>
            <template #isStatus="{ row }">
              <el-button
                type="primary"
                size="mini"
                @click="handleChangeEditTableBtn(row)"
                >显示</el-button
              >
            </template>
            <template #isSelect="{ row }">
              <el-select
                placeholder="资源搜索"
                style="width: 100%"
                filterable
                remote
                reserve-keyword
                :loading="loading"
                :remote-method="handleChangeResourceData"
                @change="handleChangeResourceItemData(row.tid)"
                v-model="row.tid"
                clearable
              >
                <el-option
                  v-for="option in resourceList"
                  :key="option.moId"
                  :value="option.moId"
                  :label="option.pname"
                ></el-option>
              </el-select>
            </template>
            <template #handler="{ row }">
              <el-button
                type="danger"
                size="mini"
                @click="handleDeleteEditTableData(row.tempId)"
                >删除</el-button
              >
            </template>
          </editor-table>
        </template>
      </page-language>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect, watch } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { contentTableEditConfig } from './config/content.edit-config'
import { modalConfig } from './config/modal.config'

import { useMapCountry } from '@/hooks/use-page-side-country'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  useStoreName,
  useSetLanguage,
  usePageList,
  useImageUpload,
  useEditTableData,
  mapFormConfigData
} from './hooks/use-page-list'
import { getItemData, sortPageTableData } from '@/service/common-api'
import editorTable from '@/base-ui/table'
import { mapImageToObject } from '@/utils/index'
import { successTip, errorTip, warnTip } from '@/utils/tip-info'
import seriesComponent from './components/indexSeries.vue'
import { uid } from 'uid'
export default defineComponent({
  name: 'resourceHome',
  components: {
    editorTable,
    seriesComponent
  },
  setup() {
    // 变量声明
    const [imgLimit] = useImageUpload()
    const otherInfo = ref<any>({})
    const operationType = ref<string>('add')
    // 下拉地区
    const areaIds = ref<any>([])
    const searchFormConfigRef = computed(() => {
      searchFormConfig.formItems.map((item: any) => {
        if (item.field === 'type') item!.options = contentList.value
      })
      return searchFormConfig
    })
    const modalConfigRef = computed(() => {
      modalConfig.formItems.map((item: any) => {
        if (item.field === 'type') item!.options = contentList.value
      })
      return modalConfig
    })
    const contentTableEditConfigRef = computed(() => {
      return contentTableEditConfig
    })
    // 资源搜索下拉
    // 资源管理
    const handleChangeResourceData = (keyword: string) => {
      getResourceList(keyword, languageItem.value.lid)
    }
    const handleChangeResourceItemData = (tid: any) => {
      const listData = languageItem.value.childListStr
      const selectItem = resourceList.value.find(
        (item: any) => item.moId === tid
      )
      const index = listData.findIndex((item: any) => item.tid === tid)
      console.log(index, selectItem)
      listData.splice(index, 1, {
        id: selectItem.id,
        cover: selectItem.cover,
        title: selectItem.name,
        subTitle: selectItem.seriesName,
        tid: selectItem.moId,
        coverList: selectItem.cover ? [mapImageToObject(selectItem.cover)] : [],
        giftList: selectItem.gift ? [mapImageToObject(selectItem.gift)] : []
      })
    }
    // 下拉数据搜索
    const editTableType = ref<any>(undefined)
    const {
      pageContentRef,
      handleCountryList,
      countryRef,
      selectCountryClick,
      selectNodeClick,
      handleQueryBtnClick,
      handleResetBtnClick
    } = useMapCountry()
    const nodeClick = (data: any) => {
      selectNodeClick(data)
    }
    // 下拉数据
    const [contentList, categoryList] = mapFormConfigData()
    // 编辑表格
    const [listData, newTableData, deleteTableData] = useEditTableData()
    const handleNewTableData = () => {
      if (editTableType.value) {
        let res = []
        res.push({
          title: '',
          subTitle: '',
          cover: '',
          coverList: [],
          gift: '',
          giftList: [],
          state: 1, // 1. 显示 0. 不显示
          tid: '',
          shape: 0, // shape 0:无,1:大横矩形,2:小横矩形
          jump: '',
          lid: languageItem.value.lid,
          tempId: uid(8)
        })
        languageItem.value.childListStr = [
          ...languageItem.value.childListStr,
          ...res
        ]
        console.log(languageItem.value.childListStr, 'deom')
      } else warnTip('请先选择样式类型')
    }
    const handleDeleteEditTableData = (tempId: any) => {
      if (operationType.value === 'add') {
        const index = languageItem.value.childListStr.findIndex(
          (res: any) => res.tempId === tempId
        )
        languageItem.value.childListStr.splice(index, 1)
      }
      // 暂时不做处理
      // if (operationType.value === 'add') deleteTableData(item)
      // else {
      //   console.log(1111)
      // }
    }
    // 多语言
    const [
      editorRef,
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      handleChangeLanguage,
      requiredField,
      mapIconState
    ] = useSetLanguage()
    watchEffect(() => {
      if (
        languageItem.value &&
        languageItem.value.childListStr &&
        languageItem.value.childListStr.length > 0
      ) {
        languageItem.value.childListStr = languageItem.value.childListStr.map(
          (item: any) => {
            return {
              ...item,
              cover:
                item.coverList && item.coverList.length > 0
                  ? item.coverList[0].url
                  : '',
              gift:
                item.giftList && item.giftList.length > 0
                  ? item.giftList[0].url
                  : ''
            }
          }
        )
        console.log(languageItem.value.childListStr, 'demo')
      }
    })
    const [countryList, resourceList, getResourceList, loading] = usePageList()
    const countryListMap = computed(() => {
      return countryList.value.map((item: any) => {
        return {
          title: item.name,
          value: item.id
        }
      })
    })
    const [storeTypeInfo, operationName] = useStoreName()
    const getData = (id: any) => {
      console.log(id)
    }
    const handleDrawTable = (data: any) => {
      const idList = data.map((item: any) => item.id)
      sortPageTableData('/cms/topic/updateSort', {
        idList: JSON.stringify(idList)
      }).then((res: any) => {
        if (res.result === 0) {
          successTip(res.msg)
          getData(otherInfo.value.id)
        } else errorTip(res.msg)
      })
    }
    watchEffect(() => {
      if (areaIds.value && areaIds.value.length === 0) {
        const region: any[] = []
        countryList.value
          .filter((i: any) => i.id !== -1)
          .forEach((item: any) => {
            region.push(item.id)
          })
        otherInfo.value = {
          ...otherInfo.value,
          areaIds: region.toString()
        }
      }
      const indexJSON = languageList.value.map((i: any) => {
        return {
          ...i,
          childListStr: JSON.stringify(i.childListStr)
        }
      })
      otherInfo.value = {
        ...otherInfo.value,
        indexJson: JSON.stringify(indexJSON)
      }
    })
    const handleChangeCountry = (item: any[]) => {
      const all: any[] = []
      const check = item.find((i: any) => i === -1)
      if (check === -1) {
        countryList.value
          .filter((i: any) => i.id !== -1)
          .forEach((item: any) => {
            all.push(item.id)
          })
        otherInfo.value = {
          ...otherInfo.value,
          areaIds: all.toString()
        }
        areaIds.value = all
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          areaIds: item.toString()
        }
      }
    }
    // 映射可编辑表格数据
    const mapDiffParams = () => {
      if (editTableType.value !== undefined) {
        languageItem.value.childListStr = []
        if (editTableType.value === 1) {
          contentTableEditConfig.propList.map((item: any) => {
            if (item.prop === 'title' && item.label === '按钮名称')
              item!.isHidden = false
            if (item.prop === 'shape') item!.isHidden = true
            if (item.prop === 'tid') item!.isHidden = true
            if (item.prop === 'title' && item.label === '标题')
              item!.isHidden = true
            if (item.prop === 'subTitle') item!.isHidden = true
            if (item.prop === 'giftList') item!.isHidden = true
            if (item.prop === 'jump') item!.isHidden = false
          })
        } else if (editTableType.value === 8) {
          contentTableEditConfigRef.value.propList.map((item: any) => {
            if (item.prop === 'title' && item.label === '按钮名称')
              item!.isHidden = true
            if (item.prop === 'shape') item!.isHidden = false
            if (item.prop === 'tid') item!.isHidden = false
            if (item.prop === 'title' && item.label === '标题')
              item!.isHidden = false
            if (item.prop === 'subTitle') item!.isHidden = false
            if (item.prop === 'jump') item!.isHidden = true
            if (item.prop === 'giftList') item!.isHidden = false
          })
        } else {
          contentTableEditConfigRef.value.propList.map((item: any) => {
            if (item.prop === 'title' && item.label === '按钮名称')
              item!.isHidden = true
            if (item.prop === 'shape') item!.isHidden = true
            if (item.prop === 'tid') item!.isHidden = false
            if (item.prop === 'title' && item.label === '标题')
              item!.isHidden = false
            if (item.prop === 'subTitle') item!.isHidden = false
            if (item.prop === 'jump') item!.isHidden = true
            if (item.prop === 'giftList') item!.isHidden = false
          })
        }
      }
    }
    // 映射分类数据
    const mapCategoryList = (value: any) => {
      modalConfig.formItems.map((item: any) => {
        if (item.field === 'category') {
          item!.options = []
        }
      })
      modalConfig.formItems.map((item: any) => {
        if (item.field === 'category') {
          categoryList.value.map((i: any) => {
            if (i.parent === value) {
              item!.options.push({
                title: i.title,
                value: i.value
              })
            }
          })
        }
      })
    }
    const handleChangeSelect = (data: any) => {
      if (data.field === 'library' && +data.value === 2) {
        mapCategoryList(data.value)
      }
      if (data.field === 'library' && +data.value === 1) {
        mapCategoryList(data.value)
      }
      if (data.field === 'type') {
        editTableType.value = +data.value
        mapDiffParams()
      }
    }
    const newData = () => {
      // 清空原有数据
      operationType.value = 'add'
      areaIds.value = []
      listData.value = []
      editTableType.value = undefined
      mapDiffParams()
      mapCategoryList(undefined)
      resetLanguageList()
    }
    const getItem = (item: any) => {
      getItemData('homeIndexItem', {
        id: item.id,
        rid: item.rid
      }).then((res) => {
        if (res.result === 0) {
          const data = res.data
          // 国家地区
          areaIds.value = data.index.areaList
          // 多语言
          languageList.value = data.index.indexList.map((i: any) => {
            return {
              ...i,
              childListStr: i.childList
            }
          })
          languageId.value = data?.index?.indexList[0].lid
          mapIconState(data?.index?.indexList, requiredField.value)
          // 可编辑表格
          // if (data.childList && data.childList.length > 0) {
          //   listData.value = data.childList.map((i: any) => {
          //     return {
          //       ...i,
          //       giftList: i.gift ? [mapImageToObject(i.gift)] : [],
          //       coverList: i.cover ? [mapImageToObject(i.cover)] : []
          //     }
          //   })
          // }
          otherInfo.value = {
            ...otherInfo.value,
            areaIds: data.index.areaList.toString()
          }
        } else errorTip(res.msg)
      })
    }
    const editData = (item: any) => {
      operationType.value = 'edit'
      editTableType.value = +item.type
      resetLanguageList()
      mapDiffParams()
      mapCategoryList(item.library)
      getItem(item)
      handleEditData(item)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    return {
      nodeClick,
      contentList,
      categoryList,
      resourceList,
      getResourceList,
      loading,
      handleChangeSelect,
      handleChangeResourceData,
      handleChangeResourceItemData,
      // 编辑表格
      operationType,
      contentTableEditConfig,
      handleNewTableData,
      handleDeleteEditTableData,
      listData,
      deleteTableData,
      handleDrawTable,
      // 侧边国家
      pageContentRef,
      handleCountryList,
      countryRef,
      selectCountryClick,
      handleQueryBtnClick,
      handleResetBtnClick,
      // 下拉框数据
      areaIds,
      countryList,
      countryListMap,
      handleChangeCountry,
      // 多语言编辑
      imgLimit,
      editorRef,
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      searchFormConfigRef,
      storeTypeInfo,
      contentTableConfig,
      modalConfigRef,
      handleNewData,
      editData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      operationName,
      otherInfo,
      contentTableEditConfigRef
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
