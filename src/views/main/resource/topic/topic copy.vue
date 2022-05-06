<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-06 23:41:54
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-06 23:41:55
 * @FilePath: /pofi-admin-private/src/views/main/resource/topic/topic copy.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
1. 实现逻辑
    新增资源后，每一次切换，
    拿到上一个数组的内容。进行资源搜索然后赋值
    2. 将所有新增的内容都放到一个数组中，然后点击切换时，查出对应的内容
-->
<template>
  <div class="hg-flex help-questionType">
    <page-country
      ref="countryRef"
      :countryList="handleCountryList"
      @selectCountryItem="selectCountryClick"
    ></page-country>
    <div class="page-country-wrap">
      <page-search
        :searchFormConfig="searchFormConfigRef"
        @resetBtnClick="handleResetBtnClick"
        @queryBtnClick="handleQueryBtnClick"
      />
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        :storeTypeInfo="storeTypeInfo"
        pageName="topics"
        @newBtnClick="handleNewData"
        @editBtnClick="editData"
      >
        <template #isStatus="scope">
          {{ scope.row.status == 1 ? '有效' : '无效' }}
        </template>
      </page-content>
    </div>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="topics"
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
            <span class="item-title">作者</span>
            <el-select
              placeholder="请输入Pofi ID或昵称"
              style="width: 100%"
              filterable
              remote
              reserve-keyword
              clearable
              :remote-method="getAuthorList"
              :loading="loading"
              v-model="author"
            >
              <el-option
                v-for="option in authorList"
                :key="option.nickName"
                :value="option.nickName"
                :label="option.nickName"
                >{{ option.nickName }}</el-option
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
              专题名称
            </span>
            <el-input
              v-model="languageItem.name"
              placeholder="请输入专题名称"
              clearable
            ></el-input>
          </div>
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              副标题
            </span>
            <el-input
              v-model="languageItem.subTitle"
              placeholder="请输入副标题"
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
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>专题内容</span
            >
            <hy-editor
              ref="editorRef"
              fileTypeName="helpQuestionType/"
              v-model:value="languageItem.desc"
            ></hy-editor>
          </div>
        </template>
      </page-language>
      <!-- 可编辑表格 -->
      <editor-table
        :listData="languageItem.childListStr"
        v-bind="contentTableEditConfig"
        :handleDraw="operationType === 'add' ? false : true"
        :editTableDraw="operationType === 'add' ? false : true"
        @drawTable="handleDrawTable"
      >
        <template #otherHandler>
          <el-button type="primary" size="mini" @click="handleNewTableData"
            >新增</el-button
          >
        </template>
        <template #isMid="{ row }">
          <el-select
            placeholder="资源搜索"
            style="width: 100%"
            filterable
            remote
            reserve-keyword
            :loading="loading"
            :remote-method="handleChangeResourceData"
            @change="handleChangeResourceItemData(row.tempMid)"
            v-model="row.tempMid"
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
            @click="handleDeleteEditTableData(row.tempId, row)"
            >删除</el-button
          >
        </template>
      </editor-table>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect, nextTick } from 'vue'

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
  useImageUpload
} from './hooks/use-page-list'
import { getItemData, sortPageTableData } from '@/service/common-api'
import hyUpload from '@/base-ui/upload'
import hyEditor from '@/base-ui/editor'
import editorTable from '@/base-ui/table'
import { mapImageToObject } from '@/utils/index'
import { successTip, errorTip, warnTip } from '@/utils/tip-info'
import { uid } from 'uid'
export default defineComponent({
  name: 'resourceTopic',
  components: {
    hyUpload,
    hyEditor,
    editorTable
  },
  setup() {
    const handleNewTableData = () => {
      let res: any[] = []
      res.push({
        lid: languageItem.value.lid,
        tempId: uid(8),
        rank: '',
        mid: '',
        subTitle: '',
        url: [],
        cover: '',
        newField: true
      })
      languageItem.value.childListStr = [
        ...languageItem.value.childListStr,
        ...res
      ]
    }
    const handleDeleteEditTableData = (tempId: any, row: any) => {
      if (operationType.value === 'add') {
        const index = languageItem.value.childListStr.findIndex(
          (res: any) => res.tempId === tempId
        )
        languageItem.value.childListStr.splice(index, 1)
      } else {
        if (row.id) {
          const index = languageItem.value.childListStr.findIndex(
            (res: any) => res.id === row.id
          )
          languageItem.value.childListStr.splice(index, 1)
        } else {
          const index = languageItem.value.childListStr.findIndex(
            (res: any) => res.tempId === tempId
          )
          languageItem.value.childListStr.splice(index, 1)
        }
      }
    }
    watchEffect(() => {
      if (languageItem?.value?.childListStr?.length > 0) {
        let newData: any[] = []
        newData = languageItem.value.childListStr.map((item: any) => {
          return {
            ...item,
            cover: item.url && item.url.length > 0 ? item.url[0].url : ''
          }
        })
        languageItem.value.childListStr = newData
      }
    })
    // 多语言
    const [
      editorRef,
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      requiredField,
      mapIconState
    ] = useSetLanguage()
    // 改变多语言
    // 点击这里改变多语言
    const handleChangeLanguage = async (id: any) => {
      languageId.value = id
      await nextTick()
      editorRef.value.setEditorValue()
    }

    const [
      countryList,
      authorList,
      getAuthorList,
      resourceList,
      getResourceList,
      loading
    ] = usePageList()
    const [storeTypeInfo, operationName] = useStoreName()
    const getData = (mtId: any) => {
      getItemData('topicItem', {
        mtId: mtId
      }).then((res: any) => {
        if (res.result === 0) {
          author.value = res.data.author
          areaIds.value = res.data.areaIds
          otherInfo.value = {
            mtId: res.data.mtId,
            author: res.data.author,
            areaIds: res.data.areaIds.toString()
          }
          if (res.data.topicList && res.data.topicList.length > 0) {
            let result: any[] = []
            result = res?.data?.topicList.map((item: any) => {
              return {
                ...item,
                url: item.cover ? [mapImageToObject(item.cover)] : []
              }
            })
            let endData = []
            endData = result.map((item: any) => {
              console.log(result, 'resulr')
              if (item.childList) {
                item['childListStr'] = []
                item.childList.map((i: any) => {
                  item.childListStr.push({
                    ...i,
                    tempMid: i.title,
                    url: i.cover ? [mapImageToObject(i.cover)] : []
                  })
                })
                return item
              } else {
                return {
                  ...item
                }
              }
            })
            languageList.value = endData
            languageId.value = res?.data?.topicList[0].lid
            mapIconState(res?.data?.topicList, requiredField.value)
          }
          handleEditData(res.data)
        } else errorTip(res.msg)
      })
    }
    const handleDrawTable = (data: any) => {
      const nothing = data.find((i: any) => i.newField)
      if (nothing) {
        warnTip('当前表格有新增项，请填写保存后，再排序，否则排序无效', 2000)
      } else {
        const idList = data.map((item: any) => item.id)
        sortPageTableData('/cms/topic/updateSort', {
          idList: JSON.stringify(idList)
        }).then((res: any) => {
          if (res.result === 0) {
            successTip(res.msg)
            getData(otherInfo.value.mtId)
          } else errorTip(res.msg)
        })
      }
    }
    const [imgLimit] = useImageUpload()
    const author = ref<any>()
    const otherInfo = ref<any>({})
    const operationType = ref<string>('add')
    // 资源管理
    const handleChangeResourceData = (keyword: string) => {
      getResourceList(keyword, languageId.value)
    }
    const handleChangeResourceItemData = (tempMid: any) => {
      const selectItem = resourceList.value.find(
        (item: any) => item.moId === tempMid
      )
      const index = languageItem.value.childListStr.findIndex(
        (item: any) => item.tempMid === tempMid
      )
      languageItem.value.childListStr.splice(index, 1, {
        lid: languageItem.value.lid,
        newField: true,
        cover: selectItem.cover ?? '',
        title: selectItem.name,
        subTitle: selectItem.seriesName,
        mid: selectItem.moId,
        tempMid: selectItem.moId,
        tempId: uid(8),
        url: selectItem.cover ? [mapImageToObject(selectItem.cover)] : []
      })
    }
    // 下拉地区
    const areaIds = ref<any>([])
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
      if (languageItem.value) {
        if (languageItem.value.url.length > 0) {
          languageItem.value.cover = languageItem.value.url[0].url
          languageItem.value = {
            ...languageItem.value,
            cover: languageItem.value.url[0].url
          }
        } else {
          languageItem.value.cover = undefined
          languageItem.value.url = []
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
        author: author.value,
        topicJson: JSON.stringify(indexJSON)
      }
    })
    // 监听多语言图片设置
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
      author.value = null
      operationType.value = 'add'
      areaIds.value = []
      resetLanguageList()
    }

    const editData = (item: any) => {
      operationType.value = 'edit'
      getData(item.mtId)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    return {
      // 编辑表格
      operationType,
      contentTableEditConfig,
      handleNewTableData,
      handleDeleteEditTableData,
      handleDrawTable,
      // 侧边国家
      ...useMapCountry(),
      // 下拉框数据
      areaIds,
      author,
      countryList,
      handleChangeCountry,
      authorList,
      getAuthorList,
      resourceList,
      getResourceList,
      handleChangeResourceData,
      handleChangeResourceItemData,
      loading,
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
