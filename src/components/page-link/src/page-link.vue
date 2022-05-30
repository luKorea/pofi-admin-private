<template>
  <!-- APP内打开网址 -->
  <el-row :gutter="12">
    <el-col v-bind="modalConfig.colLayout" v-if="value.jumpType === 1">
      <div class="item-flex">
        <span class="item-title">
          <span class="item-tip">*</span>
          网页标题
        </span>
        <el-input
          :value="value.title"
          @update:value="handleValueChange($event, title)"
          @input="handleChangeLink"
          placeholder="请输入网页标题"
        ></el-input>
      </div>
    </el-col>
    <el-col
      v-bind="modalConfig.colLayout"
      v-if="value.jumpType === 15 || value.jumpType === 1"
    >
      <div class="item-flex">
        <span class="item-title">
          <span class="item-tip">*</span>
          跳转url
        </span>
        <el-input
          :value="value.url"
          @update:value="handleValueChange($event, value.url)"
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
    <el-col v-bind="modalConfig.colLayout" v-if="value.jumpType === 3">
      <div class="item-flex">
        <span class="item-title">
          <span class="item-tip">*</span>
          VIP类型
        </span>
        <el-select
          @change="handleChangeLink"
          :value="value.funcType"
          @update:value="handleValueChange($event, value.funcType)"
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
    <el-col v-bind="modalConfig.colLayout" v-if="value.jumpType === 5">
      <div class="item-flex">
        <span class="item-title">
          <span class="item-tip">*</span>
          模型编号
        </span>
        <el-input
          :value="value.moId"
          @update:value="handleValueChange($event, value.moId)"
          placeholder="请输入模型编号"
          @input="handleChangeLink"
        ></el-input>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="12">
    <!-- 专题编号 -->
    <el-col v-bind="modalConfig.colLayout" v-if="value.jumpType === 6">
      <div class="item-flex">
        <span class="item-title">
          <span class="item-tip">*</span>
          专题编号
        </span>
        <el-input
          :value="value.topicId"
          @update:value="handleValueChange($event, value.topicId)"
          placeholder="请输入专题编号"
          @input="handleChangeLink"
        ></el-input>
      </div>
    </el-col>
    <!-- 应用的包名 -->
    <el-col v-bind="modalConfig.colLayout" v-if="value.jumpType === 13">
      <div class="item-flex">
        <span class="item-title">
          <span class="item-tip">*</span>
          应用的包名
        </span>
        <el-input
          :value="value.packagename"
          @update:value="handleValueChange($event, value.packagename)"
          placeholder="请输入应用的包名"
          @input="handleChangeLink"
        ></el-input>
      </div>
    </el-col>
  </el-row>
  <!-- 小程序 -->
  <el-row :gutter="12" v-if="value.jumpType === 16">
    <!-- 小程序APPID -->
    <el-col v-bind="modalConfig.colLayout">
      <div class="item-flex">
        <span class="item-title">
          <span class="item-tip">*</span>
          小程序APPID
        </span>
        <el-input
          :value="value.appid"
          @update:value="handleValueChange($event, value.appid)"
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
          :value="value.page"
          @update:value="handleValueChange($event, value.page)"
          v-model="otherInfo.page"
          @input="handleChangeLink"
          placeholder="请输入小程序指定页面"
        ></el-input>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="12">
    <!-- 指定问题 -->
    <el-col v-bind="modalConfig.colLayout" v-if="value.jumpType === 19">
      <div class="item-flex">
        <span class="item-title">
          <span class="item-tip">*</span>
          指定问题
        </span>
        <el-select
          :value="value.qaId"
          @update:value="handleValueChange($event, value.qaId)"
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
    <el-col v-bind="modalConfig.colLayout" v-if="value.jumpType === 17">
      <div class="item-flex">
        <span class="item-title">
          <span class="item-tip">*</span>
          收信邮箱
        </span>
        <el-input
          :value="value.email"
          @update:value="handleValueChange($event, value.email)"
          placeholder="请输入收信邮箱"
          @input="handleChangeLink"
        ></el-input>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="12">
    <!-- 指定使用指南 -->
    <el-col v-bind="modalConfig.colLayout" v-if="value.jumpType === 21">
      <div class="item-flex">
        <span class="item-title">
          <span class="item-tip">*</span>
          指定使用指南
        </span>
        <el-select
          :value="value.guideId"
          @update:value="handleValueChange($event, value.guideId)"
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
    <el-col v-bind="modalConfig.colLayout" v-if="value.jumpType === 23">
      <div class="item-flex">
        <span class="item-title">
          <span class="item-tip">*</span>
          指定富文本配置
        </span>
        <el-input
          :value="value.configName"
          @update:value="handleValueChange($event, value.configName)"
          placeholder="请输入指定富文本配置"
          @input="handleChangeLink"
        ></el-input>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="12">
    <!-- 系列编号 -->
    <el-col v-bind="modalConfig.colLayout" v-if="value.jumpType === 24">
      <div class="item-flex">
        <span class="item-title">
          <span class="item-tip">*</span>
          系列编号
        </span>
        <el-select
          :value="value.msId"
          @update:value="handleValueChange($event, value.msId)"
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
    <el-col v-bind="modalConfig.colLayout" v-if="value.jumpType === 9">
      <div class="item-flex">
        <span class="item-title">
          <span class="item-tip">*</span>
          关键字(多语言)
        </span>
        <el-input
          :value="value.keyword"
          @update:value="handleValueChange($event, value.keyword)"
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
          :value="value.jump"
          @update:value="handleValueChange($event, value.jump)"
          placeholder="选择链接类型后自动生成"
          type="textarea"
          :rows="3"
          disabled
        ></el-input>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'pageLink',
  props: {
    value: {
      type: Object,
      required: true
    },
    modalConfig: {
      type: Object,
      default: () => ({})
    },
    otherList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['changeLink', 'update:value'],
  setup(props, { emit }) {
    const handleChangeLink = () => {
      emit('changeLink')
    }
    const handleValueChange = (value: any, field: string) => {
      console.log(value, field)
      debugger
      emit('update:value', { ...props.value, [field]: value })
    }
    return {
      handleChangeLink,
      handleValueChange
    }
  }
})
</script>

<style scoped></style>
