<!--
 * @Author: korealu
 * @Date: 2022-02-14 14:09:43
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-14 14:09:44
 * @Description: file content
 * @FilePath: /pofi-admin/src/base-ui/upload/src/demo.vue
-->
<template>
  <hy-upload
    ref="upload"
    :tips="'支持文件格式：.rar .zip .doc .docx .pdf ，单个文件不能超过1mb'"
    :action="'/file-admin/file/uploadViolation'"
    :fileName="'file'"
    :fileList="attachmentList"
    @success-callback="fileChange"
    @remove-callback="fileChange"
  />
  <button @click="clearFileList">清空已经上传过的文件</button>
</template>
<script>
import { defineComponent, reactive, toRefs, ref } from 'vue'

import HyUpload from './upload.vue'
export default defineComponent({
  components: {
    HyUpload
  },
  setup() {
    const uploadRef = ref()
    const dataMap = reactive({
      attachmentList: [],
      // 上传附件成功
      fileChange: (UploadObject) => {
        const fileList = Object.values(UploadObject)
        dataMap.attachmentList = fileList
      },
      clearFileList() {
        uploadRef.value.clearAll()
      }
    })
    return {
      ...toRefs(dataMap),
      uploadRef
    }
  }
})
</script>
