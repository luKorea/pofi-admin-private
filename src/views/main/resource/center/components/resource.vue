<!--
 * @Author: your name
 * @Date: 2022-04-11 17:42:08
 * @LastEditTime: 2022-04-12 18:39:21
 * @LastEditors: Please set LastEditors
 * @Description: /cms/mold/getPic
 * @FilePath: /pofi-admin-private/src/views/main/resource/center/copmonents/timer copy.vue
-->
<template>
  <page-modal
    :defaultInfo="defaultInfo"
    ref="pageModalRef"
    pageName="centers"
    :modalConfig="resourceModalConfig"
    :showConfigBtn="false"
  >
    <template #titleWrapper>
      <step-component :active="1" @openStep="openStep"></step-component>
    </template>
    <!-- 多语言 -->
    <page-language
      :languageList="languageList"
      :languageId="languageId"
      :languageBtnList="languageBtnList"
      @changeLanguage="handleChangeLanguage"
    >
      <template #formItem>
        <!-- 图片上传区域 -->
        <el-row :gutter="12">
          <el-col v-bind="resourceModalConfig.colLayout">
            <div class="item-flex">
              <span class="item-title">主图a0-gif(彩蛋) </span>
              <hy-upload
                :limit="1"
                fileTypeName="helpQuestionType/"
                v-model:value="languageItem.giftList"
              ></hy-upload>
            </div>
          </el-col>
          <el-col v-bind="resourceModalConfig.colLayout">
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>主图a0
              </span>
              <hy-upload
                :limit="1"
                fileTypeName="helpQuestionType/"
                v-model:value="languageItem.coverList"
              ></hy-upload>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col v-bind="resourceModalConfig.colLayout">
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>内图b0
              </span>
              <hy-upload
                fileTypeName="helpQuestionType/"
                v-model:value="languageItem.b0List"
              ></hy-upload>
            </div>
          </el-col>
          <el-col v-bind="resourceModalConfig.colLayout">
            <div class="item-flex">
              <span class="item-title">详情图c0</span>
              <hy-upload
                fileTypeName="helpQuestionType/"
                v-model:value="languageItem.c0List"
              ></hy-upload>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col v-bind="resourceModalConfig.colLayout">
            <div class="item-flex">
              <span class="item-title">使用展示图d0</span>
              <hy-upload
                fileTypeName="helpQuestionType/"
                v-model:value="languageItem.d0List"
              ></hy-upload>
            </div>
          </el-col>
        </el-row>
        <!-- 输入框编辑区域 -->
        <el-row :gutter="12">
          <el-col v-bind="resourceModalConfig.colLayout">
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                资源名称
              </span>
              <el-input
                v-model="languageItem.name"
                placeholder="请输入资源名称"
                clearable
              ></el-input>
            </div>
          </el-col>
          <el-col v-bind="resourceModalConfig.colLayout">
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                资源简介
              </span>
              <el-input
                v-model="languageItem.intro"
                placeholder="一句话简介"
                clearable
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col v-bind="resourceModalConfig.colLayout">
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                介绍摘要
              </span>
              <el-input
                v-model="languageItem.summary"
                placeholder="最多三行文字"
                clearable
              ></el-input>
            </div>
          </el-col>
          <el-col v-bind="resourceModalConfig.colLayout">
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                介绍标签
              </span>
              <el-input
                v-model="languageItem.labelA"
                placeholder="请输入介绍标签"
                clearable
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col v-bind="resourceModalConfig.colLayout">
            <div class="item-flex">
              <span class="item-title"> d0简介 </span>
              <el-input
                v-model="languageItem.showLabel"
                placeholder="请输入d0简介"
                clearable
              ></el-input>
            </div>
          </el-col>
          <el-col v-bind="resourceModalConfig.colLayout">
            <div class="item-flex">
              <span class="item-title"> 包含资源标签 </span>
              <el-input
                v-model="languageItem.labelB"
                placeholder="请输入包含资源标签"
                clearable
              ></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="12">
          <el-col v-bind="resourceModalConfig.colLayout">
            <div class="item-flex">
              <span class="item-title"> 模型精度 </span>
              <el-input
                v-model="languageItem.precision"
                placeholder="请输入模型精度"
                clearable
              ></el-input>
            </div>
          </el-col>
          <el-col v-bind="resourceModalConfig.colLayout">
            <div class="item-flex">
              <span class="item-title"> 模型面数 </span>
              <el-input
                v-model="languageItem.side"
                placeholder="请输入模型面数"
                clearable
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <div class="item-flex">
          <span class="item-title">
            <span class="item-tip">*</span>介绍详情</span
          >
          <hy-editor
            ref="editorRef"
            fileTypeName="resourceCenterResource/"
            v-model:value="languageItem.info"
          ></hy-editor>
        </div>
      </template>
    </page-language>
    <template #otherModalHandler="{ row }">
      <!-- <el-button size="mini" type="primary" @click="sendTimer(row)">{{
        editType === 'edit' ? '确定' : '下一步'
      }}</el-button> -->
      <el-button size="mini" type="primary" @click="sendTimer(row)"
        >保存</el-button
      >
    </template>
  </page-modal>
</template>

<script lang="ts">
import { defineComponent, watchEffect, onMounted } from 'vue'
import { resourceModalConfig } from './config/resource.modal'
import { usePageModal } from '@/hooks/use-page-modal'
import { useSetLanguage } from '../hooks/use-page-list'
import hyEditor from '@/base-ui/editor'
import hyUpload from '@/base-ui/upload'
import { resourceFileOperation } from '@/service/main/resource/center'
import { successTip, errorTip } from '@/utils/tip-info'
import stepComponent from './step.vue'

export default defineComponent({
  emits: ['getData', 'changePage', 'openStep'],
  components: {
    hyEditor,
    hyUpload,
    stepComponent
  },
  props: {
    itemData: {
      type: Array,
      default: () => []
    },
    editType: {
      type: String,
      default: 'edit'
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const {
      editorRef,
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      handleChangeLanguage,
      requiredField,
      mapIconState
    } = useSetLanguage()
    onMounted(() => {
      if (props.editType === 'edit') {
        languageList.value = props.itemData
      }
    })
    // 监听图片变化
    watchEffect(() => {
      if (languageItem.value && languageItem.value.giftList.length > 0) {
        languageItem.value.gift = languageItem.value.giftList[0].url
      } else {
        languageItem.value = {
          ...languageItem.value,
          gift: undefined
        }
      }
      if (languageItem.value && languageItem.value.coverList.length > 0) {
        languageItem.value.cover = languageItem.value.coverList[0].url
      } else {
        languageItem.value = {
          ...languageItem.value,
          gift: undefined
        }
      }
      if (languageItem.value && languageItem.value.b0List.length > 0) {
        const list = languageItem.value.b0List
        languageItem.value.b0 = list.map((i: any) => {
          return i.url
        })
      } else {
        languageItem.value = {
          ...languageItem.value,
          b0: undefined
        }
      }
      if (languageItem.value && languageItem.value.c0List.length > 0) {
        const list = languageItem.value.c0List
        languageItem.value.c0 = list.map((i: any) => {
          return i.url
        })
      } else {
        languageItem.value = {
          ...languageItem.value,
          c0: undefined
        }
      }
      if (languageItem.value && languageItem.value.d0List.length > 0) {
        const list = languageItem.value.d0List
        languageItem.value.d0 = list.map((i: any) => {
          return i.url
        })
      } else {
        languageItem.value = {
          ...languageItem.value,
          d0: undefined
        }
      }
    })
    const openStep = (step: any) => {
      console.log('这里调用保存的接口')
      emit('openStep', step, props.params)
    }
    const sendTimer = (item: any) => {
      if (props.editType === 'add') {
        emit('changePage', 'u3d', props.params)
      }
      // console.log(item)
      // const data = {
      //   moId: item.data.moId,
      //   moldJson: JSON.stringify(languageList.value)
      // }
      // resourceFileOperation(data, 'update').then((res) => {
      //   if (res.result === 0) {
      //     successTip(res.msg)
      //     if (pageModalRef.value) {
      //       pageModalRef.value.dialogVisible = false
      //       resetLanguageList()
      //       emit('getData')
      //       if (props.editType === 'add') emit('changePage', 'u3d')
      //     }
      //   } else errorTip(res.msg)
      // })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      openStep,
      resourceModalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      sendTimer,
      // 多语言配置
      editorRef,
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      handleChangeLanguage,
      requiredField,
      mapIconState
    }
  }
})
</script>

<style scoped></style>
