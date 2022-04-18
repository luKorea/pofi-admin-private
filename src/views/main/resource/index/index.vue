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
              v-model="languageItem.name"
              placeholder="请输入内容标题"
              clearable
            ></el-input>
          </div>
          <!-- 可编辑表格 -->
          <editor-table
            :listData="listData"
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
            <template #other="{ row }">
              <el-button
                type="primary"
                size="mini"
                @click="handleChangeEditTableBtn(row)"
                >显示</el-button
              >
            </template>
            <template #handler="{ row }">
              <el-button
                type="danger"
                size="mini"
                @click="handleDeleteEditTableData(row.id)"
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
import { successTip, errorTip } from '@/utils/tip-info'
import seriesComponent from './components/indexSeries.vue'
export default defineComponent({
  name: 'resourceHome',
  components: {
    editorTable,
    seriesComponent
  },
  setup() {
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
      newTableData({
        title: '',
        subTitle: '',
        cover: '',
        coverList: [],
        gift: '',
        giftList: [],
        state: '',
        tid: '',
        shape: '', // shape 0:无,1:大横矩形,2:小横矩形
        jump: ''
      })
    }
    const handleDeleteEditTableData = (item: any) => {
      deleteTableData(item)
      // 暂时不做处理
      // if (operationType.value === 'add') deleteTableData(item)
      // else {
      //   console.log(1111)
      // }
    }
    watch(listData.value, () => {
      listData.value = listData.value.map((item: any) => {
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
      })
    })
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
    const [countryList] = usePageList()
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
    const [imgLimit] = useImageUpload()
    const author = ref<any>()
    const otherInfo = ref<any>({})
    const operationType = ref<string>('add')
    // 下拉地区
    const areaIds = ref<any>([])
    watchEffect(() => {
      if (areaIds.value && areaIds.value.length === 0) {
        const region: any[] = []
        countryList.value.forEach((item: any) => {
          region.push(item.id)
        })
        otherInfo.value = {
          ...otherInfo.value,
          areaIds: region.toString()
        }
      }
      otherInfo.value = {
        ...otherInfo.value,
        author: author.value,
        indexJson: JSON.stringify(languageList.value),
        childListStr: JSON.stringify(listData.value)
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
    // 下拉数据搜索
    const editTableType = ref<any>(undefined)
    const mapDiffParams = () => {
      if (editTableType.value !== undefined) {
        listData.value = []
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
    const handleChangeSelect = (data: any) => {
      if (data.field === 'library' && +data.value === 2) {
        modalConfig.formItems.map((item: any) => {
          if (item.field === 'category') {
            item!.options = []
          }
        })
        modalConfig.formItems.map((item: any) => {
          if (item.field === 'category') {
            categoryList.value.map((i: any) => {
              if (i.parent === data.value) {
                item!.options.push({
                  title: i.title,
                  value: i.value
                })
              }
            })
          }
        })
      }
      if (data.field === 'library' && +data.value === 1) {
        modalConfig.formItems.map((item: any) => {
          if (item.field === 'category') {
            item!.options = []
          }
        })
        modalConfig.formItems.map((item: any) => {
          if (item.field === 'category') {
            categoryList.value.map((i: any) => {
              if (i.parent === data.value) {
                item!.options.push({
                  title: i.title,
                  value: i.value
                })
              }
            })
          }
        })
      }
      if (data.field === 'type') {
        editTableType.value = +data.value
        mapDiffParams()
      }
    }
    const newData = () => {
      author.value = null
      operationType.value = 'add'
      areaIds.value = []
      listData.value = []
      editTableType.value = undefined
      resetLanguageList()
    }

    const editData = (item: any) => {
      operationType.value = 'edit'
      editTableType.value = +item.type
      mapDiffParams()
      // getData(item.mtId)
      handleEditData(item)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    return {
      nodeClick,
      contentList,
      categoryList,
      handleChangeSelect,
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
