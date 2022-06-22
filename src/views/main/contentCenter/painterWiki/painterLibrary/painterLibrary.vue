<template>
  <div class="base-languages">
    <page-search
      :searchFormConfig="searchFormConfigRef"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryBtnClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="painterLibrarys"
      @newBtnClick="handleNewData"
      @editBtnClick="editData"
    >
      <template #isId="{ row }"> PR{{ row.id }} </template>
      <!-- <template #isJob="{ row }">
        {{ $filters.formatSelectTitle(row.job, otherFieldList.jobList) }}
      </template> -->
      <template #isImage="{ row }">
        <page-image :img-src="row.iconUrl"></page-image>
      </template>
      <template #isState="{ row }">
        {{ row.status ? '启用' : '禁用' }}</template
      >
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="painterLibrarys"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <el-row :gutter="12">
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span> 画师头像</span
            >
            <hy-upload
              :limit="imgLimit"
              fileTypeName="painterLibrary/"
              v-model:value="imgList"
            ></hy-upload>
          </div>
        </el-col>
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">画师背景</span>
            <hy-upload
              :limit="imgLimit"
              fileTypeName="painterLibrary/"
              v-model:value="imgList1"
            ></hy-upload>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <div class="item-flex">
            <span class="item-title">作者名称</span>
            <el-select
              placeholder="请输入作者名称"
              style="width: 100%"
              filterable
              remote
              reserve-keyword
              clearable
              :remote-method="getAuthorList"
              :loading="loading"
              @change="handleChangeAuthor($event)"
              v-model="otherInfo.nickName"
            >
              <el-option
                v-for="option in authorList"
                :key="option.uid"
                :value="option.uid"
                :label="option.nickName"
                >{{ option.nickName }}</el-option
              >
            </el-select>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="item-flex">
            <span class="item-title">第三方链接</span>
            <el-select
              placeholder="请选择第三方链接"
              style="width: 100%"
              multiple
              v-model="otherInfo.contactList"
              @change="handleChangePrep"
            >
              <el-option
                v-for="option in otherFieldList.urlList"
                :key="option.value"
                :value="option.value"
                :label="option.title"
                >{{ option.title }}</el-option
              >
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!-- 第三方链接 -->
      <el-row>
        <!-- 第三方链接 -->
        <el-col :span="24">
          <div class="item-flex">
            <span class="item-title">第三方链接</span>
            <editor-table
              :listData="prepEditList"
              v-bind="urlModalConfig"
              :showHeader="false"
              style="width: 100%"
            >
              <template #handler="{ row }">
                <el-button
                  type="danger"
                  size="mini"
                  @click="handleDeletePrep(row)"
                  >删除</el-button
                >
              </template>
            </editor-table>
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
            <div class="item-title">
              <span class="item-tip">*</span>
              画师名
            </div>
            <el-input
              v-model="languageItem.name"
              placeholder="请输入画师名"
              required
              clearable
            ></el-input>
          </div>
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>画师摘要
            </span>
            <el-input
              type="textarea"
              maxlength="120"
              :rows="4"
              show-word-limit
              v-model="languageItem.digest"
              placeholder="请输入画师摘要"
              clearable
            ></el-input>
          </div>
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>画师简介
            </span>
            <hy-editor
              ref="editorRef"
              v-model:value="languageItem.about"
              fileTypeName="painterLibrary/"
            ></hy-editor>
          </div>
        </template>
      </page-language>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, nextTick } from 'vue'

import { contentTableConfig } from './config/content.config'
import { urlModalConfig } from './config/edit.modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  useStoreName,
  useSetLanguage,
  useImageUpload,
  useMapField
} from './hooks/use-page-list'
import { getItemData, deleteItemData } from '@/service/common-api'
import { errorTip } from '@/utils/tip-info'
import { mapImageToObject, mapTimeToSearch, _debounce } from '@/utils/index'
import hyUpload from '@/base-ui/upload'
import HyEditor from '@/base-ui/editor'
import editorTable from '@/base-ui/table'
import { getCommonSelectList } from '@/service/common'
export default defineComponent({
  name: 'painterLibrary',
  components: {
    hyUpload,
    HyEditor,
    editorTable
  },
  setup() {
    const [searchFormConfigRef, modalConfigRef, otherFieldList] = useMapField()
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
    const otherInfo = ref<any>({})
    const [imgLimit, imgList, imgList1] = useImageUpload()
    const handleQueryBtnClick = (data: any) => {
      const beginDate = mapTimeToSearch(data.dateTime).start
      const endDate = mapTimeToSearch(data.dateTime).end
      handleQueryClick({
        ...data,
        beginDate,
        endDate
      })
    }
    watchEffect(() => {
      if (imgList.value.length > 0) {
        otherInfo.value = {
          ...otherInfo.value,
          iconUrl: imgList.value[0].url
        }
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          iconUrl: undefined
        }
      }
      if (imgList1.value.length > 0) {
        otherInfo.value = {
          ...otherInfo.value,
          bgUrl: imgList1.value[0].url
        }
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          bgUrl: undefined
        }
      }
      otherInfo.value = {
        ...otherInfo.value,
        functionExplainTypeJson: JSON.stringify(languageList.value)
      }
    })
    const newData = () => {
      otherInfo.value = {}
      imgList.value = []
      editTableStatus.value = 'add'
      resetLanguageList()
    }
    const editData = (item: any) => {
      resetLanguageList()
      editTableStatus.value = 'edit'
      getItemData('painterLibraryItem', {
        id: item.id
      }).then(async (res: any) => {
        if (res.result === 0) {
          imgList.value = []
          imgList1.value = []
          if (res.data.iconUrl) {
            imgList.value.push(mapImageToObject(res.data.iconUrl))
          }
          if (res.data.bgUrl) {
            imgList1.value.push(mapImageToObject(res.data.bgUrl))
          }
          otherInfo.value = {
            id: res.data.id,
            uid: res.data.uid,
            nickName: res.data.nickName ? res.data.nickName : ''
          }
          if (res.data?.authorVoList?.length > 0) {
            const info = languageList.value.map((item: any) => {
              let result = res.data.authorVoList.find(
                (i: any) => i.lid === item.lid
              )
              if (result) {
                return {
                  ...item,
                  ...result
                }
              } else {
                return {
                  ...item
                }
              }
            })
            await nextTick()
            languageList.value = info
            languageId.value = info[0].lid
            mapIconState(info, requiredField.value)
          }
          handleEditData({
            ...res.data,
            kid: item.id
          })
        } else errorTip(res.msg)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    // 搜索作者
    const loading = ref<boolean>(false)
    const authorList = ref<any>([])
    const getAuthorList = _debounce(
      (keyword: string) => {
        loading.value = true
        getCommonSelectList('authorType', { author: keyword }, false)
          .then((res) => {
            if (res.result == 0) {
              authorList.value = res.data
            } else errorTip(res.msg)
          })
          .finally(() => (loading.value = false))
      },
      300,
      true
    )
    const handleChangeAuthor = (row: any) => {
      otherInfo.value = {
        ...otherInfo.value,
        uid: row
      }
    }
    // 第三方链接
    const prepEditList = ref<any>([]) // 主关联资源
    const editTableStatus = ref<string>('add')
    const handleChangePrep = (value: any) => {
      if (value.length > 0) {
        let prpObj: any = {}
        let prepEditObj: any = {}
        let prepEditList2: any = []
        otherFieldList.value.urlList.map((v: any) => {
          prpObj[v.value] = v
        })
        console.log(prpObj, 'demo')
        prepEditList.value.map((v: any) => {
          prepEditObj[v.value] = v
        })
        value.map((v: any) => {
          if (prepEditObj[v]) {
            prepEditList2.push(prepEditObj[v])
          } else if (prpObj[v]) {
            let d = prpObj[v]
            prepEditList2.push({
              ...d,
              url: d.url,
              iconList: d.url ? [mapImageToObject(d.url)] : []
            })
          }
          prepEditObj[v] = v
        })
        prepEditList.value = prepEditList2
      } else prepEditList.value = []
    }
    const handleDeletePrep = (row: any) => {
      if (editTableStatus.value === 'add') {
        const checkItem = prepEditList.value.findIndex(
          (i: any) => i.value === row.value
        )
        const selectItem = otherInfo.value.contactList.findIndex(
          (i: any) => i === row.value
        )
        prepEditList.value.splice(checkItem, 1)
        otherInfo.value.contactList.splice(selectItem, 1)
      } else {
        deleteItemData('/cms/painter/author/deleteAuthorChild', {
          id: row.value
        }).then((res) => {
          getItemData('painterLibraryItem', {
            id: otherInfo.value.id
          }).then(async (res: any) => {
            if (res.result === 0) {
              console.log(res.data, '删除后的数据')
            } else errorTip(res.msg)
          })
        })
      }
    }
    return {
      loading,
      authorList,
      getAuthorList,
      handleChangeAuthor,
      // 可编辑表格
      urlModalConfig,
      editTableStatus,
      handleChangePrep,
      handleDeletePrep,
      prepEditList,
      imgLimit,
      imgList,
      imgList1,
      otherFieldList,
      // 多语言编辑
      editorRef,
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      searchFormConfigRef,
      handleResetClick,
      handleQueryClick,
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
