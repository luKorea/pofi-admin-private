<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:30:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-14 14:13:45
 * @Description: file content
 * @FilePath: /pofi-admin/src/components/page-modal/src/page-modal.vue
-->
<template>
  <div class="page-modal">
    <el-drawer
      v-model="dialogVisible"
      direction="rtl"
      size="85%"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >
      <template #title>
        <div class="modal-title">
          <span>{{ modalConfig?.title }}</span>
          <span class="dialog-footer">
            <el-button
              size="mini"
              v-if="showCancelBtn"
              @click="dialogVisible = false"
              >{{ showCancelText }}</el-button
            >
            <el-button
              v-if="showConfigBtn"
              size="mini"
              type="primary"
              @click="handleConfirmClick"
            >
              确 定
            </el-button>
            <!-- 新增自定义按钮，用于单页面中操作走不同请求操作, 增加延展性 -->
            <slot
              name="otherModalHandler"
              :row="{
                data: formData,
                ref: pageFormRef
              }"
            ></slot>
          </span>
        </div>
      </template>
      <template #default v-if="dialogVisible">
        <div style="padding: 0 20px; margin-bottom: 40px">
          <slot
            name="titleWrapper"
            :row="{
              data: formData,
              ref: pageFormRef
            }"
          ></slot>
          <hy-form
            ref="pageFormRef"
            v-bind="modalConfig"
            v-model="formData"
            @changeSelect="handleChangeSelect"
          ></hy-form>
          <slot></slot>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { successTip, errorTip } from '@/utils/tip-info'

import HyForm from '@/base-ui/form'
import md5 from 'md5'
export default defineComponent({
  name: 'PageModal',
  components: {
    HyForm
  },
  props: {
    modalConfig: {
      type: Object,
      default: () => ({})
    },
    // 默认点击当前项取到的值
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    },
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    // 公共化处理，传入不同的action名字，请求不用页面数据
    operationName: {
      type: Object,
      default: () => ({
        editName: 'system/editPageDataAction',
        createName: 'system/createPageDataAction'
      })
    },
    showCancelText: {
      type: String,
      default: '取消'
    },
    showConfigBtn: {
      type: Boolean,
      default: true
    }
  },
  emits: ['editClick', 'addClick', 'changeSelect'],
  setup(props, { emit }) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    // 获取表单组件，监听表单是否填写完整
    const pageFormRef = ref<InstanceType<typeof HyForm>>()
    // 监听defaultInfo值得变化，动态修改表单字段得值
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          if (item.type === 'checkbox') {
            formData.value[item.field] = []
          } else formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定按钮的逻辑
    const store = useStore()
    console.log(store)
    const handleConfirmClick = () => {
      const formRef = pageFormRef.value?.formRef
      formRef?.validate((valid: any) => {
        if (valid) {
          if (formData.value.pwd) {
            formData.value.pwd = md5(formData.value.pwd)
          }
          if (Object.keys(props.defaultInfo).length) {
            console.log(
              formData.value,
              '表单中的数据',
              props.otherInfo,
              '其他数据'
            )
            // 编辑
            store
              .dispatch(props.operationName.editName, {
                pageName: props.pageName,
                editData: {
                  // ...props.defaultInfo,
                  ...formData.value,
                  ...props.otherInfo
                }
              })
              .then((res) => {
                successTip(res)
                dialogVisible.value = false
              })
              .catch((err) => {
                dialogVisible.value = true
                errorTip(err)
              })
          } else {
            // 新建
            console.log('新建用户')
            store
              .dispatch(props.operationName.createName, {
                pageName: props.pageName,
                newData: { ...formData.value, ...props.otherInfo }
              })
              .then((res) => {
                successTip(res)
                dialogVisible.value = false
              })
              .catch((err) => {
                dialogVisible.value = true
                errorTip(err)
              })
          }
        } else return false
      })
    }
    // 表单事件监听
    const handleChangeSelect = (item: any) => {
      emit('changeSelect', item)
    }
    return {
      pageFormRef,
      dialogVisible,
      formData,
      handleConfirmClick,
      handleChangeSelect
    }
  }
})
</script>

<style>
.el-drawer__body {
  overflow: auto !important;
}
.el-drawer__header {
  margin-bottom: 0 !important;
  padding-bottom: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #dcdfe6;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
}
</style>
<style scoped lang="less">
.page-modal {
  .modal-title {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    color: #fff;
  }
}
</style>

<style>
.el-drawer__header {
  background: linear-gradient(90deg, #a9c9ff, #ffbbec);
  padding: 10px 20px;
}
</style>
