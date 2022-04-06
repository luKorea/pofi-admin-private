<template>
  <div class="hg-flex help-questionType">
    <page-country
      ref="countryRef"
      :countryList="handleCountryList"
      @selectCountryItem="selectCountryClick"
    ></page-country>
    <div class="page-country-wrap">
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        :storeTypeInfo="storeTypeInfo"
        pageName="questionTypes"
        @newBtnClick="handleNewData"
        @editBtnClick="editData"
      >
        <template #isImage="{ row }">
          <page-image :img-src="row.img"></page-image>
        </template>
        <template #isState="scope">
          {{ scope.row.state == 1 ? '启用' : '关闭' }}
        </template>
      </page-content>
    </div>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="questionTypes"
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
      </el-row>
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
              问题类型
            </span>
            <el-input
              v-model="languageItem.title"
              placeholder="请输入问题类型"
              clearable
            ></el-input>
          </div>
          <div class="item-flex">
            <span class="item-title">主图</span>
            <hy-upload
              :limit="imgLimit"
              fileTypeName="helpQuestionType/"
              v-model:value="languageItem.url"
            ></hy-upload>
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

import { usePageModal } from '@/hooks/use-page-modal'
import {
  useStoreName,
  useSetLanguage,
  usePageList,
  useImageUpload
} from './hooks/use-page-list'
import { getItemData } from '@/service/common-api'
import hyUpload from '@/base-ui/upload'
import { mapImageToObject } from '@/utils/index'
import { warnTip, errorTip } from '@/utils/tip-info'
import { useMapCountry } from '@/hooks/use-page-side-country'
export default defineComponent({
  name: 'helpQuestionType',
  components: {
    hyUpload
  },
  setup() {
    const [
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      handleChangeLanguage,
      requiredField,
      mapIconState
    ] = useSetLanguage()
    const [, countryList] = usePageList()
    const [storeTypeInfo, operationName] = useStoreName()
    const [imgLimit] = useImageUpload()
    const otherInfo = ref<any>({})
    // 下拉地区
    const areaIds = ref<any>([])
    // 监听多语言图片设置
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
        questionTypeJson: JSON.stringify(languageList.value)
      }
      if (languageItem.value) {
        if (languageItem.value.url.length > 0) {
          console.log(languageItem.value.url[0].url, '获取图片地址')
          languageItem.value.img = languageItem.value.url[0].url
          languageItem.value = {
            ...languageItem.value,
            img: languageItem.value.url[0].url
          }
          console.log(languageItem.value, '用户选中图片')
        } else {
          languageItem.value.img = undefined
          languageItem.value.url = []
        }
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
      return searchFormConfig
    })
    const modalConfigRef = computed(() => {
      return modalConfig
    })
    const newData = () => {
      areaIds.value = []
      resetLanguageList()
    }
    const editData = (item: any) => {
      if (item.parent === 0) {
        warnTip('当前系列暂不支持编辑')
        return
      } else {
        getItemData('questionTypeItem', {
          id: item.id,
          language: 1
        }).then((res: any) => {
          if (res.result === 0) {
            areaIds.value = res.data.areaIds
            otherInfo.value = {
              id: res.data.id,
              areaIds: res.data.areaIds,
              rank: res.data.rank
            }
            if (
              res.data.questionTypeList &&
              res.data.questionTypeList.length > 0
            ) {
              let result: any[] = []
              result = res?.data?.questionTypeList.map((item: any) => {
                return {
                  ...item,
                  url: item.img ? [mapImageToObject(item.img)] : []
                }
              })
              console.log(result)
              languageList.value = result
              languageId.value = res?.data?.questionTypeList[0].lid
            }
            mapIconState(res?.data?.questionTypeList, requiredField.value)
            handleEditData(res.data)
          } else errorTip(res.msg)
        })
      }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    return {
      // 侧边国家
      ...useMapCountry(),
      areaIds,
      countryList,
      handleChangeCountry,
      // 多语言编辑
      imgLimit,
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
      otherInfo
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
