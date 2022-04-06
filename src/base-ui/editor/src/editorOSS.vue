<template>
  <div
    ref="editorRef"
    class="hy-editor"
    :style="{ width: width ? `${width}px` : '100%' }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, reactive } from 'vue'
import type Editor from 'wangeditor'
import WangEditor from 'wangeditor'
export interface EditorInfo {
  html: string
  text: string
}

import { clientSendFile } from '@/hooks/use-oss-config'
import { watch } from 'vue'
import { useOSSConfig } from '@/hooks/use-oss-config'
import OSS from 'ali-oss'
export default defineComponent({
  components: {},
  props: {
    // 默认显示的文本
    defaultHtmlStr: {
      type: String,
      default: '请输入正文'
    },
    // 数据双向绑定
    value: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 500
    },
    width: {
      type: Number,
      default: 0
    },
    focus: {
      type: Boolean,
      default: false
    },
    // 图片文件名设置,根据不用模块设置不用的名字
    fileTypeName: {
      type: String,
      default: 'help/'
    }
  },
  emits: ['update:value'],

  setup(props, { emit }) {
    const client = ref<any>()
    const editorRef = ref<HTMLDivElement | null>(null)
    const isInitContent = ref<boolean>(false)
    const content = reactive<EditorInfo>({
      html: '',
      text: ''
    })
    const instance = ref<Editor | null>(null)
    // watch(
    //   () => props.value,
    //   () => {
    //     initEditorContent(props.value, false)
    //   }
    // )

    onMounted(() => {
      setClient()
      createWangEditor()
    })

    onBeforeUnmount(() => {
      if (!instance.value) return
      instance.value.destroy()
      instance.value = null
    })

    const setClient = () => {
      useOSSConfig().then((res) => {
        client.value = new OSS({
          region: 'oss-cn-hongkong',
          stsToken: res.securityToken,
          bucket: res.bucketName,
          ...res
        })
      })
    }
    const setEditorValue = () => {
      initEditorContent(props.value, false)
    }
    const uploadOptions = (resultFiles: any, insertFn: any) => {
      setClient()
      if (client.value !== null) {
        console.log(client.value, 'log')
        clientSendFile(
          client.value,
          props.fileTypeName,
          client.value?.options!.fileName,
          resultFiles[0]
        )
          .then((res: any) => {
            console.log(res)
            const url = res.res.requestUrls[0].split('?')[0]
            console.log(res.res.requestUrls[0].split('?')[0], '图片')
            // 后续再改
            insertFn(url)
          })
          .catch((err: any) => {
            console.log(err)
          })
      }
    }
    const createWangEditor = () => {
      instance.value = new WangEditor(editorRef.value)
      setEditorConfig()
      instance.value.create()
      initEditorContent(props.value)
      // create 之后才能初始化
      // initEditorContent(props.defaultHtmlStr)
    }

    const initEditorContent = (htmlStr: string, isFocus = false) => {
      if (!instance.value) return
      // editor.config.focus = isFocus
      // if (!htmlStr) return
      isInitContent.value = true
      const editor: Editor = instance.value as Editor
      editor.txt.html(htmlStr)
    }

    const setEditorConfig = () => {
      if (!instance.value) return
      const editor: Editor = instance.value as Editor
      editor.config.uploadFileName = props.fileTypeName
      editor.config.placeholder = '请输入内容'
      // 一次最多上传图片的数量
      // editor.config.uploadImgMaxLength = 1
      editor.config.customUploadImg = function (
        resultFiles: any,
        insertFn: any
      ) {
        uploadOptions(resultFiles, insertFn)
      }
      // editorRef.value?.addEventListener('blur', function (e) {
      //   e.preventDefault()
      //   emit('update:value', `<div>${content.html}</div>`)
      // })
      editor.config.uploadVideoAccept = ['mp4']
      editor.config.showLinkVideo = true // 隐藏插入网络视频的功能
      // 后续开放
      // editor.config.customUploadVideo = function (
      //   resultFiles: any,
      //   insertFn: any
      // ) {
      //   uploadOptions(resultFiles, insertFn)
      // }
      // 配置触发 onchange 的时间频率，默认为 200ms
      // 设置编辑区域高度为 500px
      editor.config.height = props.height
      // 设计z-index
      editor.config.zIndex = props.zIndex
      // 取消自动 focus
      // editor.config.focus = props.focus
      // 配置 onchange 回调函数
      editor.config.onchangeTimeout = 500 // 修改为 500ms
      editor.config.onchange = function (newHtml: string) {
        content.html = newHtml
        content.text = editor.txt.text()
        if (!isInitContent.value) {
          emit('update:value', content.html)
          // emit('update:value', `<div>${content.html}</div>`)
        }
        isInitContent.value = false
      }
      // 配置菜单栏，删减菜单，调整顺序
      editor.config.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list',
        'todo',
        'justify',
        'quote',
        'emoticon',
        'image',
        'video',
        'table',
        'code',
        'splitLine',
        'undo',
        'redo'
      ]
      console.log(editor.config, 'editor.config')
    }

    return {
      editorRef,
      setEditorValue
    }
  }
})
</script>

<style lang="less" scoped>
.hy-editor {
  text-align: left;
}
</style>

<style>
.w-e-text-container .placeholder {
  z-index: 1;
}
</style>
