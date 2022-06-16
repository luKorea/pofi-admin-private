<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-16 11:35:51
 * @Description: descriptions
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/tradeRecord.vue
-->
<template>
  <div class="resource-good">
    <page-search
      :searchFormConfig="searchFormConfigRef"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="descriptions"
      @newBtnClick="handleNewData"
      @editBtnClick="editData"
    >
      <template #isType="{ row }">
        {{ $filters.formatSelectTitle(row.type, articleList) }}
      </template>
      <template #isFuncType="{ row }">
        {{ $filters.formatSelectTitle(row.funcType, memberTypeList) }}
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="descriptions"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
      @changeSelect="handleChangeSelect"
    >
      <!-- 这里是文章分类展示不同选项 -->
      <el-row :gutter="12">
        <!-- 是否专属资源 -->
        <el-col v-bind="modalConfig.colLayout" v-if="articleType === 2">
          <div class="item-flex">
            <span class="item-title"
              ><span class="item-tip">*</span>是否专属资源</span
            >
            <el-select
              v-model="otherInfo.isExclusive"
              placeholder="请选择是否专属资源"
              style="width: 100%"
            >
              <el-option label="是" :value="1">是</el-option>
              <el-option label="否" :value="0">否</el-option>
            </el-select>
          </div>
        </el-col>
        <!-- 所属权益 -->
        <el-col
          v-bind="modalConfig.colLayout"
          v-if="articleType === 3 || articleType === 4 || articleType === 5"
        >
          <div class="item-flex">
            <span class="item-title"
              ><span
                class="item-tip"
                v-if="articleType === 3 || articleType === 4"
                >*</span
              >所属权益</span
            >
            <el-select
              v-model="otherInfo.parentId"
              placeholder="请选择所属权益"
              style="width: 100%"
            >
              <el-option
                v-for="item in equityList"
                :key="item.value"
                :label="item.title"
                :value="item.value"
              >
                {{ item.title }}
              </el-option>
            </el-select>
          </div>
        </el-col>
        <!-- 功能特权说明按钮 -->
        <el-col
          v-bind="modalConfig.colLayout"
          v-if="articleType === 3 || articleType === 4"
        >
          <div class="item-flex">
            <span class="item-title"
              ><span class="item-tip">*</span>功能{{
                articleType === 3 ? '说明' : '设置'
              }}按钮</span
            >
            <el-select v-model="otherInfo.button" style="width: 100%">
              <el-option label="显示" :value="1">显示</el-option>
              <el-option label="隐藏" :value="0">隐藏</el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12" v-if="articleType === 3 || articleType === 4">
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title"
              ><span class="item-tip">*</span>是否Pro</span
            >
            <el-select
              v-model="otherInfo.isPro"
              placeholder="请选择是否Pro"
              style="width: 100%"
            >
              <el-option label="是" :value="1">是</el-option>
              <el-option label="否" :value="0">否</el-option>
            </el-select>
          </div>
        </el-col>
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title"
              ><span class="item-tip">*</span>是否Plus</span
            >
            <el-select
              v-model="otherInfo.isPlus"
              placeholder="请选择是否Plus"
              style="width: 100%"
            >
              <el-option label="是" :value="1">是</el-option>
              <el-option label="否" :value="0">否</el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col
          v-bind="modalConfig.colLayout"
          v-if="articleType === 2 || articleType === 3 || articleType === 4"
        >
          <div class="item-flex">
            <span class="item-title">图标</span>
            <hy-upload
              v-model:value="otherInfo.iconList"
              fileTypeName="goodDescription/"
              :limit="1"
            ></hy-upload>
          </div>
        </el-col>
      </el-row>
      <!-- end -->
      <!-- 链接类型 -->
      <el-row
        :gutter="12"
        v-if="
          otherInfo.button === 1 && (articleType === 3 || articleType === 4)
        "
      >
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title"
              >链接类型(请确保选中的类型中带有<span class="item-tip">*</span
              >号的字段填写完整)</span
            >
            <el-select
              placeholder="请选择链接类型"
              style="width: 100%"
              filterable
              v-model="otherInfo.jumpType"
              @change="handleChangeLink"
            >
              <el-option
                v-for="option in jumpList"
                :key="option.type"
                :value="option.type"
                :label="option.dec"
                >{{ option.dec }}</el-option
              >
            </el-select>
          </div>
        </el-col>
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">链接地址</span>
            <el-input
              v-model="otherInfo.jump"
              placeholder="选择链接类型后自动生成"
              type="textarea"
              :rows="3"
              disabled
            ></el-input>
          </div>
        </el-col>
      </el-row>

      <!-- 这里为跳转地址配置 -->
      <!-- APP内打开网址 -->
      <el-row :gutter="12">
        <el-col v-bind="modalConfig.colLayout" v-if="otherInfo.jumpType === 1">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              网页标题
            </span>
            <el-input
              v-model="otherInfo.title"
              @input="handleChangeLink"
              placeholder="请输入网页标题"
            ></el-input>
          </div>
        </el-col>
        <el-col
          v-bind="modalConfig.colLayout"
          v-if="otherInfo.jumpType === 15 || otherInfo.jumpType === 1"
        >
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              跳转url
            </span>
            <el-input
              v-model="otherInfo.url"
              placeholder="请输入跳转url"
              type="textarea"
              @input="handleChangeLink"
              :rows="3"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <!-- VIP类型 -->
        <el-col v-bind="modalConfig.colLayout" v-if="otherInfo.jumpType === 3">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              VIP类型
            </span>
            <el-select
              style="width: 100%"
              @change="handleChangeLink"
              v-model="otherInfo.funcType"
              placeholder="请选择VIP类型"
            >
              <el-option
                v-for="item in otherList.vipList"
                :key="item.value"
                :label="item.title"
                :value="item.value"
                >{{ item.title }}</el-option
              >
            </el-select>
          </div>
        </el-col>
        <!-- 模型编号 -->
        <el-col v-bind="modalConfig.colLayout" v-if="otherInfo.jumpType === 5">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              模型编号
            </span>
            <el-input
              v-model="otherInfo.moId"
              placeholder="请输入模型编号"
              @input="handleChangeLink"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <!-- 专题编号 -->
        <el-col v-bind="modalConfig.colLayout" v-if="otherInfo.jumpType === 6">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              专题编号
            </span>
            <el-input
              v-model="otherInfo.topicId"
              placeholder="请输入专题编号"
              @input="handleChangeLink"
            ></el-input>
          </div>
        </el-col>
        <!-- 应用的包名 -->
        <el-col v-bind="modalConfig.colLayout" v-if="otherInfo.jumpType === 13">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              应用的包名
            </span>
            <el-input
              v-model="otherInfo.packagename"
              placeholder="请输入应用的包名"
              @input="handleChangeLink"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 小程序 -->
      <el-row :gutter="12" v-if="otherInfo.jumpType === 16">
        <!-- 小程序APPID -->
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              小程序APPID
            </span>
            <el-input
              v-model="otherInfo.appid"
              placeholder="请输入小程序APPID"
              @input="handleChangeLink"
            ></el-input>
          </div>
        </el-col>
        <!-- 小程序指定页面 -->
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              小程序指定页面
            </span>
            <el-input
              v-model="otherInfo.page"
              @input="handleChangeLink"
              placeholder="请输入小程序指定页面"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <!-- 指定问题 -->
        <el-col v-bind="modalConfig.colLayout" v-if="otherInfo.jumpType === 19">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              指定问题
            </span>
            <el-select
              style="width: 100%"
              v-model="otherInfo.qaId"
              @change="handleChangeLink"
              placeholder="请选择指定问题"
            >
              <el-option
                v-for="item in otherList.questionList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
                >{{ item.title }}</el-option
              >
            </el-select>
          </div>
        </el-col>
        <!-- 收信邮箱 -->
        <el-col v-bind="modalConfig.colLayout" v-if="otherInfo.jumpType === 17">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              收信邮箱
            </span>
            <el-input
              v-model="otherInfo.email"
              placeholder="请输入收信邮箱"
              @input="handleChangeLink"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <!-- 指定使用指南 -->
        <el-col v-bind="modalConfig.colLayout" v-if="otherInfo.jumpType === 21">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              指定使用指南
            </span>
            <el-select
              style="width: 100%"
              v-model="otherInfo.guideId"
              placeholder="请选择指定使用指南"
              @change="handleChangeLink"
            >
              <el-option
                v-for="item in otherList.guideList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
                >{{ item.title }}</el-option
              >
            </el-select>
          </div>
        </el-col>
        <!-- 指定富文本配置 -->
        <el-col v-bind="modalConfig.colLayout" v-if="otherInfo.jumpType === 23">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              指定富文本配置
            </span>
            <el-input
              v-model="otherInfo.configName"
              placeholder="请输入指定富文本配置"
              @input="handleChangeLink"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <!-- 系列编号 -->
        <el-col v-bind="modalConfig.colLayout" v-if="otherInfo.jumpType === 24">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              系列编号
            </span>
            <el-select
              style="width: 100%"
              v-model="otherInfo.msId"
              @change="handleChangeLink"
              placeholder="请选择系列编号"
            >
              <el-option
                v-for="item in otherList.seriesList"
                :key="item.msId"
                :label="item.name"
                :value="item.msId"
                >{{ item.name }}</el-option
              >
            </el-select>
          </div>
        </el-col>
        <!-- 搜索页 -->
        <el-col v-bind="modalConfig.colLayout" v-if="otherInfo.jumpType === 9">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              关键字(多语言)
            </span>
            <el-input
              v-model="otherInfo.keyword"
              placeholder="请输入关键字(多语言)"
              @input="handleChangeLink"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 多语言区域 -->
      <page-language
        :languageList="languageList"
        :languageId="languageId"
        :languageBtnList="languageBtnList"
        @changeLanguage="handleChangeLanguage"
      >
        <template #formItem v-if="articleType !== 0">
          <!-- 版本文案 -->
          <template v-if="articleType === 1">
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                版本名称
              </span>
              <el-input
                v-model="languageItem.vipName"
                placeholder="版本名称"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                代号
              </span>
              <el-input
                v-model="languageItem.enName"
                placeholder="代号"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                版本描述
              </span>
              <el-input
                v-model="languageItem.desc"
                placeholder="版本描述"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                版本副描述
              </span>
              <el-input
                v-model="languageItem.subDesc"
                placeholder="版本副描述"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title"> 优惠标签 </span>
              <el-input
                v-model="languageItem.discountLabel"
                placeholder="优惠标签"
              ></el-input>
            </div>
          </template>
          <!-- 权益分类 -->
          <template v-if="articleType === 2">
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                权益分类
              </span>
              <el-input
                v-model="languageItem.benefitName"
                placeholder="权益分类"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                副标题
              </span>
              <el-input
                v-model="languageItem.benefitLabel"
                placeholder="副标题"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                内标题1
              </span>
              <el-input
                v-model="languageItem.benefitSubtitle"
                placeholder="内标题1"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                内标题2
              </span>
              <el-input
                v-model="languageItem.benefitThreetitle"
                placeholder="内标题2"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span> 内描述
              </span>
              <el-input
                v-model="languageItem.benefitDesc"
                placeholder="内描述"
              ></el-input>
            </div>
          </template>
          <!-- 功能 -->
          <template v-if="articleType === 3">
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                功能名称
              </span>
              <el-input
                v-model="languageItem.funcName"
                placeholder="功能名称"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                全称
              </span>
              <el-input
                v-model="languageItem.funcSubtitle"
                placeholder="全称"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                描述
              </span>
              <el-input
                v-model="languageItem.funcDesc"
                placeholder="描述"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title"> 小提示 </span>
              <el-input
                v-model="languageItem.funcTips"
                placeholder="小提示"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title"> 演示图(或视频) </span>
              <hy-upload
                v-model:value="languageItem.imgList"
                fileTypeName="goodDescription/"
                :limit="1"
              ></hy-upload>
            </div>
          </template>
          <!-- 特权 -->
          <template v-if="articleType === 4">
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                特权名称
              </span>
              <el-input
                v-model="languageItem.privilegeName"
                placeholder="特权名称"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                全称
              </span>
              <el-input
                v-model="languageItem.privilegeName2"
                placeholder="全称"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                描述
              </span>
              <el-input
                v-model="languageItem.privilegeDesc"
                placeholder="描述"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title"> 按钮名称 </span>
              <el-input
                v-model="languageItem.privilegeButName"
                placeholder="按钮名称"
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title"> 演示图(或视频) </span>
              <hy-upload
                v-model:value="languageItem.imgList"
                fileTypeName="goodDescription/"
                :limit="1"
              ></hy-upload>
            </div>
          </template>
          <!-- 富文本 -->
          <template v-if="articleType === 5">
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                内容
              </span>
              <hy-editor
                ref="editorRef"
                v-model:value="languageItem.ghost"
                fileTypeName="goodDescription/"
              ></hy-editor>
            </div>
          </template>
        </template>
        <template #formItem v-else>
          <el-empty description="请先选择文案类型" />
        </template>
      </page-language>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, watch, nextTick } from 'vue'

import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import {
  useStoreName,
  useSetLanguage,
  useMapFormData,
  usePageList,
  equityList
} from './hooks/use-page-list'
import { unityModalList } from '@/utils/select-list/map-resource-list'
import HyEditor from '@/base-ui/editor'
import HyUpload from '@/base-ui/upload'
import { _debounce } from '@/utils'
import { getJumpLink } from '@/service/main/help/account'
import { errorTip } from '@/utils/tip-info'
import { getItemData } from '@/service/common-api'
import { mapImageToObject } from '@/utils/index'

export default defineComponent({
  name: 'goodDescription',
  components: {
    HyEditor,
    HyUpload
  },
  setup() {
    const {
      searchFormConfigRef,
      modalConfigRef,
      modalConfig,
      articleList,
      memberTypeList
    } = useMapFormData()
    const [jumpList, otherList, getEquityList] = usePageList()
    const {
      editorRef,
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      handleChangeLanguage,
      requiredField,
      mapIconState,
      mapDifferentLanguage,
      mapDifferentRequired
    } = useSetLanguage()
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    // 编辑新增操作
    const otherInfo = ref<any>({
      jumpType: '', //跳转链接
      parentId: '', // 所属权益
      isExclusive: '', //是否专属资源
      iconList: [], //图标
      icon: '',
      button: '', // 功能说明按钮
      isPro: '',
      isPlus: '',
      jump: '',
      rank: 0
    })
    const resetInfo = () => {
      return {
        jumpType: '', //跳转链接
        parentId: '', // 所属权益
        isExclusive: '', //是否专属资源
        iconList: [], //图标
        icon: '',
        button: '', // 功能说明按钮
        isPro: '',
        isPlus: '',
        jump: '',
        rank: 0
      }
    }
    watchEffect(() => {
      if (languageItem.value) {
        if (languageItem.value?.imgList?.length > 0) {
          languageItem.value.funcFile = languageItem.value.imgList[0].url
        } else {
          languageItem.value.funcFile = undefined
          languageItem.value.imgList = []
        }
      }
      if (otherInfo.value && otherInfo.value.iconList) {
        if (otherInfo.value?.iconList?.length > 0) {
          otherInfo.value.icon = otherInfo.value.iconList[0].url
        } else {
          otherInfo.value.icon = undefined
          otherInfo.value.iconList = []
        }
      }
    })
    // 监听选项变化，动态修改多语言值
    const articleType = ref<number>(0)
    const handleChangeSelect = async (item: any) => {
      if (item.field === 'type') {
        mapDifferentLanguage(+item.value)
        articleType.value = +item.value
      } else if (item.field === 'funcType') {
        getEquityList(+item.value)
      }
    }
    watchEffect(async () => {
      if (languageList?.value?.length > 0) {
        await nextTick()
        otherInfo.value = {
          ...otherInfo.value,
          vipConfigJson: languageList.value,
          requiredField: requiredField.value
        }
      }
    })
    // 当前函数用来生成用户选择不同链接类型后生成不同跳转地址，需要做节流操作，避免用户快速输入重复发送请求
    const handleChangeLink = _debounce(
      () => {
        getJumpLink({
          ...otherInfo.value,
          type: otherInfo.value.jumpType
        }).then((res: any) => {
          if (res.result === 0) {
            otherInfo.value = {
              ...otherInfo.value,
              jump: res.data
            }
          } else errorTip(res.msg)
        })
      },
      200,
      true
    )
    const newData = () => {
      articleType.value = 0
      otherInfo.value = {
        rank: 0
      }
      resetLanguageList()
    }
    // 编辑操作
    const getData = (item: any) => {
      getEquityList(+item.funcType)
      getItemData('descriptionItem', { id: item.id }).then(async (res) => {
        if (res.result === 0) {
          const data = res.data
          otherInfo.value = {
            ...otherInfo.value,
            jumpType: data.jumpType ?? '', //跳转链接
            jump: data.jump ?? '',
            parentId: data.parentId ? +data.parentId : '', // 所属权益
            isExclusive: data.isExclusive ? +data.isExclusive : '', //是否专属资源
            iconList: data.icon ? [mapImageToObject(data.icon)] : [], //图标
            icon: data.icon ?? '',
            button: data.button ? +data.button : '', // 功能说明按钮
            isPro: data.isPro ? +data.isPro : '',
            isPlus: data.isPlus ? +data.isPlus : ''
          }
          if (data?.vipConfigList?.length > 0) {
            const info = languageList.value.map((item: any) => {
              let res = data.vipConfigList.find((i: any) => i.lid === item.lid)
              if (res) {
                return {
                  ...item,
                  ...res,
                  imgList: res.funcFile ? [mapImageToObject(res.funcFile)] : []
                }
              } else {
                return {
                  ...item
                }
              }
            })
            await nextTick()
            languageList.value = info
            console.log(languageList.value, 'value')
            languageId.value = info[0].lid
            mapIconState(info, requiredField.value)
          }
          handleEditData({
            ...data
          })
        }
      })
    }
    const editData = (item: any) => {
      articleType.value = +item.type
      otherInfo.value = {
        ...resetInfo(),
        id: item.id,
        rank: item.rank
      }
      mapDifferentRequired(+item.type)
      getData(item)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    return {
      searchFormConfigRef,
      modalConfigRef,
      modalConfig,
      articleList,
      memberTypeList,
      unityModalList,
      equityList,
      // 跳转链接
      jumpList,
      otherList,
      // 多语言编辑
      editorRef,
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      handleResetClick,
      handleQueryClick,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      handleNewData,
      handleEditData,
      editData,
      pageModalRef,
      defaultInfo,
      operationName,
      otherInfo,
      articleType,
      handleChangeSelect,
      handleChangeLink
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
