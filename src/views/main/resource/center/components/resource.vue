<!--
 * @Author: your name
 * @Date: 2022-04-11 17:42:08
 * @LastEditTime: 2022-04-18 20:15:24
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
    :showCancelBtn="false"
  >
    <template #titleWrapper="{ row }">
      <step-component
        :active="1"
        @openStep="openStep($event, row)"
      ></step-component>
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
                type="textarea"
                :rows="3"
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
      <el-button size="mini" @click="cancelData(row)">取消</el-button>
      <el-button size="mini" type="primary" @click="sendTimer(row)"
        >保存</el-button
      >
    </template>
  </page-modal>
</template>

<script lang="ts">
import { defineComponent, watchEffect, nextTick } from 'vue'
import { resourceModalConfig } from './config/resource.modal'
import { usePageModal } from '@/hooks/use-page-modal'
import { useSetLanguage } from '../hooks/use-page-list'
import hyEditor from '@/base-ui/editor'
import hyUpload from '@/base-ui/upload'
import { resourceFileOperation } from '@/service/main/resource/center'
import { successTip, errorTip, infoTipBox } from '@/utils/tip-info'
import stepComponent from './step.vue'
import { validateParamsRules } from '@/utils/index'

export default defineComponent({
  emits: ['getData', 'changePage', 'openStep'],
  components: {
    hyEditor,
    hyUpload,
    stepComponent
  },
  props: {
    editData: {
      type: Object,
      default: () => ({})
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
    // 监听图片变化
    watchEffect(() => {
      if (languageItem.value && languageItem.value.giftList.length > 0) {
        languageItem.value.gift = languageItem.value.giftList[0].url
      }
      if (languageItem.value && languageItem.value.coverList.length > 0) {
        languageItem.value.cover = languageItem.value.coverList[0].url
      }
      if (languageItem.value && languageItem.value.b0List.length > 0) {
        const list = languageItem.value.b0List
        languageItem.value.b0 = list.map((i: any) => {
          return i.url
        })
      }
      if (languageItem.value && languageItem.value.c0List.length > 0) {
        const list = languageItem.value.c0List
        languageItem.value.c0 = list.map((i: any) => {
          return i.url
        })
      }
      if (languageItem.value && languageItem.value.d0List.length > 0) {
        const list = languageItem.value.d0List
        languageItem.value.d0 = list.map((i: any) => {
          return i.url
        })
      } else {
        languageItem.value = {
          ...languageItem.value,
          gift: undefined,
          giftList: [],
          coverList: [],
          cover: undefined,
          d0List: [],
          d0: [],
          c0List: [],
          c0: [],
          b0: [],
          b0List: []
        }
      }
    })
    const cancelData = (item: any) => {
      infoTipBox({
        title: '提示',
        message: '是否保存当前编辑内容？',
        cancelButtonText: '丢弃',
        confirmButtonText: '保存'
      })
        .then(() => {
          sendTimer(item, 'cancel')
        })
        .catch((action: any) => {
          if (action === 'cancel') {
            if (pageModalRef.value) {
              pageModalRef.value.dialogVisible = false
              emit('getData')
            }
          }
        })
    }
    const addData = (item: any) => {
      const data = {
        moId: props.params.moId,
        moldJson: JSON.stringify(languageList.value)
      }
      resourceFileOperation(data, 'update').then((res) => {
        if (res.result === 0) {
          resetLanguageList()
          if (pageModalRef.value) pageModalRef.value.dialogVisible = false
          emit('changePage', 'u3d', { moId: props.params.moId })
        } else errorTip(res.msg)
      })
    }
    const editData = (item: any) => {
      console.log(props.params.moId, 'demo')
      const data = {
        moId: props.params.moId,
        moldJson: JSON.stringify(languageList.value)
      }
      resourceFileOperation(data, 'update').then((res) => {
        if (res.result === 0) {
          successTip(res.msg)
          if (pageModalRef.value) {
            // resetLanguageList()
            successTip(res.msg)
            // pageModalRef.value.dialogVisible = false
            emit('getData')
          }
        } else errorTip(res.msg)
      })
    }
    const sendTimer = (item: any, type = 'config') => {
      validateParamsRules(
        languageList.value,
        languageList.value[0],
        requiredField.value
      )
        .then(() => {
          if (props.editType === 'add') {
            if (pageModalRef.value) {
              if (type === 'cancel') {
                pageModalRef.value.dialogVisible = false
              } else {
                addData(item)
              }
            }
          } else {
            editData(item)
          }
        })
        .catch((err) => errorTip(err))
    }
    const openStep = (step: any) => {
      if (step.save) {
        validateParamsRules(
          languageList.value,
          languageList.value[0],
          requiredField.value
        )
          .then(() => {
            const data = {
              moId: props.params.moId,
              moldJson: JSON.stringify(languageList.value)
            }
            if (props.editType === 'add') {
              resourceFileOperation(data, 'update').then((res) => {
                if (res.result === 0) {
                  successTip(res.msg)
                  resetLanguageList()
                  if (pageModalRef.value) {
                    pageModalRef.value.dialogVisible = false
                    emit('openStep', step.step, props.params)
                  }
                } else errorTip(res.msg)
              })
            } else {
              resourceFileOperation(data, 'update').then((res) => {
                if (res.result === 0) {
                  successTip(res.msg)
                  if (pageModalRef.value) {
                    successTip(res.msg)
                    pageModalRef.value.dialogVisible = false
                    resetLanguageList()
                    emit('openStep', step.step, props.params)
                  }
                } else errorTip(res.msg)
              })
            }
          })
          .catch((err) => errorTip(err))
      } else emit('openStep', step.step, props.params)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      cancelData,
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
