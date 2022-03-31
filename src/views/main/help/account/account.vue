<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-24 15:35:46
 * @Description: 完成
 * @FilePath: /pofi-admin/src/views/main/base/head/head.vue
-->
<template>
  <div class="base-head">
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="helpAccounts"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #isState="scope">
        <span>{{ scope.row.state ? '启用' : '禁用' }}</span>
      </template>
      <template #isBlack="scope">
        <page-image :img-src="scope.row.blackIcon"></page-image>
      </template>
      <template #isWhite="scope">
        <page-image
          :img-src="scope.row.icon"
          style="background-color: #ccc"
        ></page-image>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="helpAccounts"
      :modalConfig="modalConfig"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <el-row>
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">图标(暗黑)</span>
            <hy-upload
              :limit="imgLimit"
              fileTypeName="helpAccount/"
              v-model:value="effectImgList"
              :otherOptions="{
                multiple: false
              }"
            ></hy-upload>
          </div>
        </el-col>
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">图标</span>
            <hy-upload
              :limit="imgLimit"
              fileTypeName="helpAccount/"
              v-model:value="imgList"
              :otherOptions="{
                multiple: false
              }"
            ></hy-upload>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title"
              >链接类型(请确保选中的类型中带有<span class="item-tip">*</span
              >号的字段填写完整)</span
            >
            <el-select
              placeholder="请选择链接类型"
              style="width: 100%"
              clearable
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
              v-model="otherInfo.jumpKeyword"
              placeholder="请输入关键字(多语言)"
              @input="handleChangeLink"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 这里是一定展示的区域 -->
      <el-row :gutter="12">
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
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  usePageList,
  useStoreName,
  useImageUpload
} from './hooks/use-page-list'
import hyUpload from '@/base-ui/upload'
import { mapImageToObject } from '@/utils/index'
import { getJumpLink } from '@/service/main/help/account'
import { errorTip } from '@/utils/tip-info'
import { _debounce } from '@/utils'
import { decryptUrl } from '@/service/main/help/account'
import { Base64 } from 'js-base64'

export default defineComponent({
  name: 'helpAccount',
  components: {
    hyUpload
  },
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef] = usePageSearch()
    const [imgLimit, imgList, effectImgList] = useImageUpload()
    const otherInfo = ref<any>()
    const [countryList, jumpList, otherList] = usePageList()
    const areaIds = ref<any>([])
    // 判断用户是否有选择地区，没有的话将下拉数据循环并发送到后台
    watchEffect(() => {
      if (areaIds.value.length === 0) {
        const region: any[] = []
        countryList.value.forEach((item: any) => {
          region.push(item.id)
        })
        otherInfo.value = {
          ...otherInfo.value,
          areaIds: region.toString()
        }
      }
      if (imgList.value.length > 0) {
        otherInfo.value = {
          ...otherInfo.value,
          icon: imgList.value[0].url
        }
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          icon: undefined
        }
      }
      if (effectImgList.value.length > 0) {
        otherInfo.value = {
          ...otherInfo.value,
          blackIcon: effectImgList.value[0].url
        }
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          blackIcon: undefined
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
    const handleChangeCountry = (item: any) => {
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: item.toString()
      }
    }
    const newData = () => {
      imgList.value = []
      effectImgList.value = []
      areaIds.value = []
      otherInfo.value = {}
    }
    const editData = (item: any) => {
      imgList.value = []
      effectImgList.value = []
      if (item.icon) {
        imgList.value.push(mapImageToObject(item.icon))
      }
      if (item.blackIcon) {
        effectImgList.value.push(mapImageToObject(item.blackIcon))
      }
      otherInfo.value = {
        areaIds: item.areaIds.toString(), // 用户如果没有修改这个选项。使用默认值
        id: item.id,
        jump: item.jump,
        jumpType: item.jumpType
      }
      areaIds.value = item.areaIds
      decryptUrl({
        jump: item.jump,
        type: item.jumpType
      }).then((res: any) => {
        if (res.result === 0) {
          if (item.jumpType === 1) {
            otherInfo.value.title = res.data.title
            otherInfo.value.url = res.data.url
          } else if (item.jumpType == 3) {
            otherInfo.value.funcType = parseInt(res.data.funcType)
          } else if (item.jumpType == 5) {
            otherInfo.value.moId = res.data.id
          } else if (item.jumpType == 6) {
            otherInfo.value.topicId = res.data.id
          } else if (item.jumpType == 13) {
            otherInfo.value.packagename = res.data.packagename
          } else if (item.jumpType == 15) {
            otherInfo.value.url = Base64.decode(res.data.url)
          } else if (item.jumpType === 17) {
            otherInfo.value.email = res.data.recipient
          } else if (item.jumpType == 19) {
            otherInfo.value.qaId = parseInt(res.data.id)
          } else if (item.jumpType == 21) {
            otherInfo.value.guideId = parseInt(res.data.id)
          } else if (item.jumpType == 23) {
            otherInfo.value.configName = res.data.config
          } else if (item.jumpType == 24) {
            otherInfo.value.msId = res.data.id
          }
        } else errorTip(res.msg)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData, editData)
    return {
      // 跳转链接
      jumpList,
      otherList,
      handleChangeLink,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfig,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      operationName,
      otherInfo,
      countryList,
      areaIds,
      handleChangeCountry,
      imgLimit,
      imgList,
      effectImgList
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
