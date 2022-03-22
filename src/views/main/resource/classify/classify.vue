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
      pageName="classifys"
      @newBtnClick="handleNewData"
      @editBtnClick="editData"
    >
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="classifys"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <el-row :gutter="12">
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">当前节点</span>
            <el-input v-model="selectName" disabled></el-input>
          </div>
        </el-col>
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">图片上传</span>
            <hy-upload
              :limit="imgLimit"
              fileTypeName="category/"
              v-model:value="imgList"
            ></hy-upload>
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
          <el-col :span="21">
            <div class="item-flex">
              <div class="item-title">
                <span class="item-tip">*</span>
                分类名称
              </div>
              <el-input
                v-model="languageItem.name"
                placeholder="请输入分类名称"
                required
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title">描述</span>
              <el-input
                type="textarea"
                :rows="3"
                v-model="languageItem.desc"
                placeholder="请输入描述"
              ></el-input>
            </div>
          </el-col>
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
import { mapImageToObject } from '@/utils/index'
import { warnTip, errorTip } from '@/utils/tip-info'
import { useStore } from '@/store'
export default defineComponent({
  name: 'resourceClassify',
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
    const [keyTypeList] = usePageList()
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [imgLimit, imgList] = useImageUpload()
    const otherInfo = ref<any>({})
    // 用户选中的节点名称
    const selectName = ref<any>()
    watchEffect(() => {
      if (imgList.value.length > 0) {
        otherInfo.value = {
          ...otherInfo.value,
          url: imgList.value[0].url
        }
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          url: undefined
        }
      }
      otherInfo.value = {
        ...otherInfo.value,
        moldCategoryJson: JSON.stringify(languageList.value)
      }
    })
    const searchFormConfigRef = computed(() => {
      return searchFormConfig
    })
    const modalConfigRef = computed(() => {
      return modalConfig
    })
    const newData = (item: any) => {
      selectName.value = item.name
      item.selectName = item.name
      // const [name] = useMapSelectTitle(item.id)
      imgList.value = []
      otherInfo.value = {
        parent: item.id
      }
      resetLanguageList()
    }
    const editData = (item: any) => {
      if (item.parent === 0) {
        warnTip('当前分类暂不支持编辑')
        return
      } else {
        getItemData('resourceClassify', {
          id: item.id,
          language: 1
        }).then((res: any) => {
          if (res.result === 0) {
            imgList.value = []
            if (res.data.url) {
              imgList.value.push(mapImageToObject(res.data.url))
            }
            otherInfo.value = {
              id: res.data.id
            }
            item.selectName = res.data.name
            if (
              res.data.moldCategoryList &&
              res.data.moldCategoryList.length > 0
            ) {
              languageList.value = res?.data?.moldCategoryList
              languageId.value = res?.data?.moldCategoryList[0].lid
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
      // 多语言编辑
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

<style scoped module>
.red {
  color: red;
}
</style>
