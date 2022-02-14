<template>
  <div class="upload-container">
    <el-upload
      ref="uploadRef"
      :name="fileName"
      :limit="limit"
      :accept="accept"
      :multiple="true"
      :file-list="defaultFileList"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      class="editor-slide-upload"
      :action="action"
    >
      <el-button size="small" type="primary"> 点击上传 </el-button>
      <template #tip>
        <div class="el-upload__tip">{{ tips }}</div>
      </template>
    </el-upload>
  </div>
</template>

<script>
import { reactive, defineComponent, toRefs, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'Upload',
  props: {
    tips: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 5
    },
    accept: {
      type: String,
      default: ''
    },
    fileName: {
      type: String,
      default: 'file'
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['success-callback', 'remove-callback', 'change-callback'],
  setup(_, ctx) {
    const uploadRef = ref()
    let UploadObject = {}
    const dataMap = reactive({
      defaultFileList: _.fileList,
      dialogVisible: false,
      checkAllSuccess: () => {
        return Object.keys(UploadObject).every(
          (item) => UploadObject[item].hasSuccess
        )
      },
      handleSuccess: (response, file) => {
        const uid = file.uid
        const objKeyArr = Object.keys(UploadObject)
        if (response.retCode !== 0)
          return ElMessage.error(response.retMsg || '请求失败,请重新上传文件!')
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (UploadObject[objKeyArr[i]].uid === uid) {
            UploadObject[objKeyArr[i]].url = response.data.url //附件
            UploadObject[objKeyArr[i]].hasSuccess = true
            // return
          }
        }
        setTimeout(() => {
          ctx.emit('success-callback', UploadObject)
        }, 0)
      },
      handleRemove: (file) => {
        const url = file.url
        const objKeyArr = Object.keys(UploadObject)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (UploadObject[objKeyArr[i]].url === url) {
            delete UploadObject[objKeyArr[i]]
            break
          }
        }
        ctx.emit('remove-callback', UploadObject)
      },
      beforeUpload: async (file) => {
        if (file.size > 1048576) {
          ElMessage.error('单个文件不能超过1mb')
          throw new Error('单个文件不能超过1mb')
        }
        const fileName = file.uid
        let a = document.createElement('a')
        a.href = window.URL.createObjectURL(file)
        UploadObject[fileName] = {
          hasSuccess: false,
          uid: file.uid,
          name: file.name
        }
      },
      handleSubmit() {
        const arr = Object.keys(UploadObject).map((v) => UploadObject[v])
        if (!dataMap.checkAllSuccess()) {
          ElMessage.warning(
            '请等待所有文件上传成功。如果文件上传失败，请手动删除错误文件后，重新上传!'
          )
          return
        }
        ctx.emit('success-callback', arr)
        dataMap.clearAll()
      },
      // 选择文件
      handleExceed(files, fileList) {
        ElMessage.warning(
          `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
            files.length + fileList.length
          } 个文件`
        )
      },
      clearAll() {
        console.log(uploadRef)
        UploadObject = {}
        dataMap.defaultFileList = []
        dataMap.dialogVisible = false
        uploadRef.value.clearFiles()
      },
      // 赋值
      setFileList() {
        if (dataMap.defaultFileList.length == 0) return false
        dataMap.defaultFileList.forEach((item, index) => {
          item.uid = index
          UploadObject[index] = item
        })
      },
      handleChange(file, fileList) {
        ctx.emit('change-callback', fileList)
      }
    })

    onMounted(() => {
      dataMap.setFileList()
      console.log(UploadObject, 'UploadObjec2222')
    })
    return { ...toRefs(dataMap), UploadObject, uploadRef }
  }
})
</script>
