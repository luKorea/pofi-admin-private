<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:30:54
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 18:24:00
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
    >
      <template #title>
        <div class="modal-title">
          <span>{{ modalConfig?.title }}</span>
          <span class="dialog-footer">
            <el-button size="mini" @click="handleCloseClick">取 消</el-button>
            <el-button size="mini" type="primary" @click="handleConfirmClick">
              确 定
            </el-button>
          </span>
        </div>
      </template>
      <template #default>
        <div style="padding: 0 20px">
          <template v-if="modalConfig">
            <hy-form
              ref="pageForm"
              v-bind="modalConfig"
              v-model="formData"
            ></hy-form>
          </template>
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
import { errorTip } from '@/utils/tip-info'

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
    }
  },
  emits: ['editClick', 'addClick'],
  setup(props, { emit }) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    // 获取表单组件，监听表单是否填写完整
    const pageForm = ref<InstanceType<typeof HyForm>>()
    const formRef = pageForm.value?.formRef
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
      console.log(formRef?.validate)
      formRef?.validate((valid: any) => {
        console.log(valid)
        if (valid) {
          dialogVisible.value = false
          if (Object.keys(props.defaultInfo).length) {
            // 编辑
            emit('editClick', { ...formData.value, ...props.otherInfo })
            console.log('编辑用户')
            // store.dispatch('system/editPageDataAction', {
            //   pageName: props.pageName,
            //   editData: { ...formData.value, ...props.otherInfo },
            //   id: props.defaultInfo.id
            // })
          } else {
            // 新建
            console.log('新建用户')
            emit('addClick', { ...formData.value, ...props.otherInfo })
            // store.dispatch('system/createPageDataAction', {
            //   pageName: props.pageName,
            //   newData: { ...formData.value, ...props.otherInfo }
            // })
          }
        } else return false
      })
    }
    const handleCloseClick = () => {
      // TODO 有bug，晚上解决
      dialogVisible.value = false
      formRef?.resetFields()
    }
    return {
      pageForm,
      dialogVisible,
      formData,
      handleConfirmClick,
      handleCloseClick
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
    align-items: center;
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
