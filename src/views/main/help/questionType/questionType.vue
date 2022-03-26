<template>
  <div class="hg-flex" v-if="0">
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
              v-model="languageItem.subTitle"
              placeholder="请输入问题类型"
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

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  useStoreName,
  useSetLanguage,
  usePageList
} from './hooks/use-page-list'
import { getItemData } from '@/service/common-api'
import hyUpload from '@/base-ui/upload'
import { mapImageToObject } from '@/utils/index'
import { warnTip, errorTip } from '@/utils/tip-info'
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
      handleChangeLanguage
    ] = useSetLanguage()
    const [, countryList] = usePageList()
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, , handleQueryClick] = usePageSearch()
    const otherInfo = ref<any>({})
    // 地区
    const countryRef = ref()
    const countryID = ref(-999)
    const handleCountryList = computed(() => {
      const list = [
        {
          name: '全部',
          id: -999
        },
        ...countryList.value
      ]
      return list
    })
    const copyQueryInfo = ref({})
    const selectCountryClick = (item: any) => {
      countryID.value = item.id
      handleQueryClick({
        ...copyQueryInfo.value,
        rid: countryID.value
      })
    }
    watchEffect(() => {
      otherInfo.value = {
        ...otherInfo.value,
        moldSeriesJson: JSON.stringify(languageList.value)
      }
    })
    // 监听多语言图片设置
    watchEffect(() => {
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
        }
      }
    })
    const searchFormConfigRef = computed(() => {
      return searchFormConfig
    })
    const modalConfigRef = computed(() => {
      const countryItem = modalConfig.formItems.find(
        (item) => item.field === 'areaIds'
      )
      countryItem!.options = countryList.value.map((item: any) => {
        return {
          title: item.name,
          value: item.id
        }
      })
      return modalConfig
    })
    const newData = () => {
      resetLanguageList()
    }
    const editData = (item: any) => {
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
            }
            handleEditData(res.data)
          } else errorTip(res.msg)
        })
      }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    return {
      // 侧边国家
      countryRef,
      handleCountryList,
      selectCountryClick,
      // 多语言编辑
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      searchFormConfigRef,
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

<style scoped module>
.red {
  color: red;
}
</style>
