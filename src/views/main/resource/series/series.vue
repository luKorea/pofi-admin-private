<template>
  <div class="resource-classify">
    <!-- <page-search
      :searchFormConfig="searchFormConfigRef"
      @resetBtnClick="handleResetBtnClick"
      @queryBtnClick="handleQueryBtnClick"
    /> -->
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      :showSearch="true"
      pageName="series"
      @newBtnClick="handleNewData"
      @editBtnClick="editData"
    >
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="series"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
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
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">当前节点</span>
            <el-input v-model="selectName" disabled></el-input>
          </div>
        </el-col>
      </el-row>
      <page-language
        :languageList="languageList"
        :languageId="languageId"
        :languageBtnList="languageBtnList"
        @changeLanguage="handleChangeLanguage"
      >
        <template #formItem>
          <el-row :gutter="12">
            <el-col :span="12">
              <div class="item-flex">
                <div class="item-title">
                  <span class="item-tip">*</span>
                  系列名称
                </div>
                <el-input
                  v-model="languageItem.name"
                  placeholder="请输入系列名称"
                  required
                  clearable
                ></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="item-flex">
                <span class="item-title">
                  <span class="item-tip">*</span>
                  副标题(所属库)
                </span>
                <el-input
                  v-model="languageItem.subTitle"
                  placeholder="请输入副标题(所属库)"
                  clearable
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <div class="item-flex">
            <span class="item-title">图标上传</span>
            <hy-upload
              :limit="imgLimit"
              fileTypeName="series/"
              v-model:value="languageItem.url"
            ></hy-upload>
          </div>
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              描述
            </span>
            <hy-editor
              ref="editorRef"
              v-model:value="languageItem.desc"
              fileTypeName="series/"
            ></hy-editor>
          </div>
        </template>
      </page-language>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  useStoreName,
  usePageList,
  useSetLanguage,
  useImageUpload,
  useMapSelectTitle
} from './hooks/use-page-list'
import { getItemData } from '@/service/common-api'
import hyUpload from '@/base-ui/upload'
import hyEditor from '@/base-ui/editor'
import { mapImageToObject } from '@/utils/index'
import { warnTip, errorTip } from '@/utils/tip-info'
import { useStore } from '@/store'
export default defineComponent({
  name: 'resourceClassify',
  components: {
    hyUpload,
    hyEditor
  },
  setup() {
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
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [imgLimit, imgList] = useImageUpload()
    const otherInfo = ref<any>({})
    const [keyTypeList, countryList] = usePageList()
    const areaIds = ref<any>([])
    // 用户选中的节点名称
    const selectName = ref<any>()
    // 监听国家地区
    watchEffect(() => {
      if (areaIds.value.length === 0) {
        const region: any[] = []
        countryList.value.forEach((item: any) => {
          region.push(item.id)
        })
        otherInfo.value = {
          ...otherInfo.value,
          rids: region.toString()
        }
      }
      if (languageItem.value) {
        if (languageItem.value.url.length > 0) {
          console.log(languageItem.value.url[0].url, '获取图片地址')
          languageItem.value.icon = languageItem.value.url[0].url
          languageItem.value = {
            ...languageItem.value,
            icon: languageItem.value.url[0].url
          }
          console.log(languageItem.value, '用户选中图片')
        } else {
          languageItem.value.icon = undefined
          languageItem.value.url = []
        }
      }
      otherInfo.value = {
        ...otherInfo.value,
        moldSeriesJson: JSON.stringify(languageList.value)
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
          rids: all.toString()
        }
        areaIds.value = all
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          rids: item.toString()
        }
      }
    }
    const searchFormConfigRef = computed(() => {
      return searchFormConfig
    })
    const modalConfigRef = computed(() => {
      return modalConfig
    })
    const newData = (item: any) => {
      selectName.value = item.name
      // const [name] = useMapSelectTitle(item.id)
      imgList.value = []
      areaIds.value = []
      otherInfo.value = {
        parent: item.id
      }
      resetLanguageList()
    }
    const editData = (item: any) => {
      selectName.value = item.name
      if (item.parent === 0) {
        warnTip('当前系列暂不支持编辑')
        return
      } else {
        getItemData('seriesItem', {
          id: item.id,
          language: 1
        }).then((res: any) => {
          if (res.result === 0) {
            otherInfo.value = {
              id: res.data.id,
              msId: res.data.msId,
              rids: res.data.rids
            }
            areaIds.value = res?.data?.rids.split(',').map((item: any) => +item)
            if (res.data.moldSeriesList && res.data.moldSeriesList.length > 0) {
              let result: any[] = []
              result = res?.data?.moldSeriesList.map((item: any) => {
                return {
                  ...item,
                  url: item.icon ? [mapImageToObject(item.icon)] : []
                }
              })
              console.log(result)
              languageList.value = result
              languageId.value = res?.data?.moldSeriesList[0].lid
              mapIconState(res?.data?.moldSeriesList, requiredField.value)
            }
            handleEditData(res.data)
          } else errorTip(res.msg)
        })
      }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    const store = useStore()
    const dataList = computed(
      () => store.state.resourceClassifyModule.classifysList
    )
    const handleResetBtnClick = () => {
      console.log(store)
    }
    const handleQueryBtnClick = (queryInfo: any) => {
      const data: any[] = []
      dataList.value.map((item: any) => {
        if (item.name.indexOf(queryInfo.name)) {
          console.log(item)
        }
      })
      console.log(data)
    }
    return {
      imgLimit,
      imgList,
      selectName,
      // 地区选择
      countryList,
      areaIds,
      handleChangeCountry,
      // 多语言编辑
      editorRef,
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      searchFormConfigRef,
      handleResetBtnClick,
      handleQueryBtnClick,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfigRef,
      handleNewData,
      editData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      operationName,
      otherInfo
    }
  }
})
</script>

<style scoped module lang="less">
.red {
  color: red;
}
</style>
