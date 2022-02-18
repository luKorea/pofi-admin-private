<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:30:54
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-18 11:15:10
 * @Description: file content
 * @FilePath: /pofi-admin/src/components/page-modal/src/page-modal.vue
-->
<template>
  <div class="page-modal">
    <el-drawer
      v-model="dialogVisible"
      direction="rtl"
      size="50%"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
    >
      <template #title>
        <div class="modal-title">
          <span>{{ modalConfig?.title }}</span>
          <span class="dialog-footer">
            <el-button size="mini" @click="dialogVisible = false"
              >取 消</el-button
            >
            <el-button size="mini" type="primary" @click="handleConfirmClick">
              确 定
            </el-button>
          </span>
        </div>
      </template>
      <template #default>
        <div style="padding: 0 20px">
          <hy-form
            ref="pageFormRef"
            v-bind="modalConfig"
            v-model="formData"
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

import HyForm from '@/base-ui/form'
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
    // 公共化处理，传入不同的action名字，请求不用页面数据
    operationName: {
      type: Object,
      default: () => ({
        editName: 'system/editPageDataAction',
        createName: 'system/createPageDataAction'
      })
    }
  },
  emits: ['editClick', 'addClick'],
  setup(props, { emit }) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    // 获取表单组件，监听表单是否填写完整
    const pageFormRef = ref<InstanceType<typeof HyForm>>()
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
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
          console.log(formData.value, props.otherInfo)
          // 针对多选国家特殊数据进行处理
          if (formData.value.regionName) {
            const region = formData.value.regionName.toString()
            const areaIds = formData.value.regionName.toString()
            formData.value = {
              ...formData.value,
              region,
              areaIds
            }
            console.log(formData.value, '用户数据')
          }
          // if (Object.keys(props.defaultInfo).length) {
          //   console.log(formData.value, '这是树木')
          //   // 编辑
          //   store
          //     .dispatch(props.operationName.editName, {
          //       pageName: props.pageName,
          //       editData: {
          //         ...props.defaultInfo,
          //         ...formData.value,
          //         ...props.otherInfo
          //       }
          //     })
          //     .then((res) => {
          //       successTip(res)
          //       dialogVisible.value = false
          //     })
          //     .catch((err) => {
          //       dialogVisible.value = true
          //       errorTip(err)
          //     })
          // } else {
          //   // 新建
          //   console.log('新建用户')
          //   store
          //     .dispatch(props.operationName.createName, {
          //       pageName: props.pageName,
          //       newData: { ...formData.value, ...props.otherInfo }
          //     })
          //     .then((res) => {
          //       successTip(res)
          //       dialogVisible.value = false
          //     })
          //     .catch((err) => {
          //       dialogVisible.value = true
          //       errorTip(err)
          //     })
          // }
        } else return false
      })
    }
    return {
      pageFormRef,
      dialogVisible,
      formData,
      handleConfirmClick
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
