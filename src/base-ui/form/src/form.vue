<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form
      ref="formRef"
      :label-width="labelWidth"
      label-position="top"
      :model="modelValue"
      class="animate__animated animate__fadeIn"
    >
      <el-row :gutter="16">
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              :prop="item.field"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  clearable
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                />
              </template>
              <template v-if="item.type === 'textarea'">
                <el-input
                  clearable
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  type="textarea"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                />
              </template>
              <template v-if="item.type === 'inputNumber'">
                <el-input-number
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  style="width: 100%"
                  @update:modelValue="handleValueChange($event, item.field)"
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                />
              </template>

              <template v-else-if="item.type === 'radio'">
                <el-radio-group
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  clearable
                  @change="handleChangeSelect"
                  @clear="handleClear"
                >
                  <el-radio
                    v-for="option in item.options"
                    :label="option.value"
                    :key="option.value"
                  >
                    {{ option.title }}
                  </el-radio>
                </el-radio-group>
              </template>

              <template v-else-if="item.type === 'checkbox'">
                <el-checkbox-group
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  class="hg-flex hg-flex-wrap"
                >
                  <el-checkbox
                    v-for="option in item.options"
                    :label="option.value"
                    :key="option.value"
                  >
                    {{ option.title }}
                  </el-checkbox>
                </el-checkbox-group>
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  clearable
                  filterable
                  @change="handleChangeSelect($event, item.field)"
                  @clear="handleClear"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>

              <template v-else-if="item.type === 'cascader'">
                <el-cascader
                  :options="item.options"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  clearable
                  filterable
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-cascader>
              </template>

              <template v-else-if="item.type === 'treeSelect'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  clearable
                >
                  <el-option style="height: auto">
                    <el-tree
                      :data="item.options"
                      highlight-current
                      check-on-click-node
                      :props="{ label: 'title', children: 'children' }"
                    />
                  </el-option>
                </el-select>
              </template>

              <template
                v-else-if="
                  item.type === 'datepicker' ||
                  item.type === 'datetimerange' ||
                  item.type === 'date' ||
                  item.type === 'datetime' ||
                  item.type === 'daterange'
                "
              >
                <el-date-picker
                  style="width: 100%"
                  :type="item.type"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
              <!-- 后续完善 -->
              <template v-else-if="item.type === 'editor'">
                <el-col :span="24">
                  <hy-editor
                    v-bind="item.otherOptions"
                    v-model:value="modelValue[`${item.field}`]"
                    @update:modelValue="handleValueChange($event, item.field)"
                  />
                </el-col>
              </template>
              <template v-else-if="item.type === 'upload'">
                <hy-upload
                  v-bind="item.otherOptions"
                  v-model:value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IFormItem } from '../types'
import type { ElForm } from 'element-plus'

import HyEditor from '@/base-ui/editor'
import HyUpload from '@/base-ui/upload'

export default defineComponent({
  components: {
    HyEditor,
    HyUpload
  },
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({})
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue', 'changeSelect', 'changeInput', 'changeClear'],
  setup(props, { emit }) {
    type FormInstance = InstanceType<typeof ElForm>
    const formRef = ref<FormInstance>()
    const otherFormRef = ref<FormInstance>()
    // 更新表单数据
    const handleValueChange = (value: any, field: string) => {
      console.log(value, field)
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    // 事件处理
    // 1. 监听用户enter事件
    const handleKeyUp = () => emit('changeInput')
    // 2. 监听用户enter回车事件
    const handleClear = () => emit('changeClear')
    // 3. 监听用户选中事件
    const handleChangeSelect = (item: any, field: string) =>
      emit('changeSelect', {
        value: item,
        field: field
      })
    return {
      formRef,
      otherFormRef,
      handleKeyUp,
      handleClear,
      handleValueChange,
      handleChangeSelect
    }
  }
})
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 10px;
}
</style>
<style>
.el-form--label-top .el-form-item__label {
  padding: 0 !important;
  line-height: 30px !important;
}
</style>
