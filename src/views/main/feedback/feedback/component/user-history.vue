<template>
  <hy-card :title="'当前用户为：' + userName">
    <template #handler>
      <el-select
        @change="handleChangeTag"
        v-model="selectItem"
        placeholder="请选择"
        size="mini"
      >
        <el-option
          v-for="item in tagList"
          :label="item.title"
          :value="item.value"
          :key="item.value"
        ></el-option>
      </el-select>
    </template>
    <div class="message-wrap" id="chat-room">
      <template v-for="item in list" :key="item.name">
        <div class="item">
          <page-image
            class="avatar"
            style="border-radius: 50%"
            :img-src="item.img"
          ></page-image>
          <div class="user-info">
            <div class="right">
              <div class="name">{{ item.name }}</div>
              <div class="time">{{ item.time }}</div>
            </div>
            <div class="user-message">{{ item.content }}</div>
          </div>
        </div>
      </template>
    </div>
    <template #footer>
      <div class="tim-wrap">
        <div class="tim-message">
          <el-input
            v-model.trim="message"
            placeholder="请输入内容"
            :rows="4"
            type="textarea"
            @keyup.enter="sendData"
          ></el-input>
        </div>
        <div class="tim-send">
          <hy-upload
            :limit="1"
            v-model:value="img"
            filetTypeName="feedback/"
            :showHeight="80"
            :showWidth="80"
          ></hy-upload>
          <el-button
            class="hg-mt-3"
            type="primary"
            size="mini"
            @click="sendData"
            >发送</el-button
          >
        </div>
      </div>
    </template>
  </hy-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick } from 'vue'
import HyCard from '@/base-ui/card/index'
import HyUpload from '@/base-ui/upload'
import { errorTip } from '@/utils/tip-info'

export default defineComponent({
  name: 'feedbackUserHistory',
  components: {
    HyCard,
    HyUpload
  },
  props: {
    tagList: {
      type: Array,
      default: () => []
    },
    userName: {
      type: String,
      default: ''
    },
    userHistory: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['handleSendData', 'changeTag'],
  setup(_, { emit }) {
    const selectItem = ref<any>()
    const message = ref<any>()
    const img = ref<any>()
    const list = ref<any>([
      {
        name: 'korea',
        img: 'http://f3.pofiart.com/yuanyuan.jpg',
        time: new Date().toLocaleString(),
        content: '测试号衬衫付了定金是否离开两款发动机是'
      },
      {
        name: 'korea',
        img: 'http://f3.pofiart.com/yuanyuan.jpg',
        time: new Date().toLocaleString(),
        content: '测试号衬衫付了定金是否离开两款发动机是'
      }
    ])
    // 这里是信息地方
    const sendData = () => {
      if (message.value === '') {
        errorTip('请输入内容')
      } else {
        const data = {
          name: '管理员',
          time: new Date().toLocaleString(),
          content: message.value,
          img: 'https://f3.pofiart.com/base/1638164937055YQjkm.jpg'
        }
        list.value.push(data)
        message.value = ''
        // emit('handleSendData', data)
      }
    }
    watch(list.value, async () => {
      let ele = document.getElementById('chat-room') as HTMLElement
      await nextTick()
      ele.scrollTop = ele.scrollHeight
    })
    // 设置tag
    const handleChangeTag = () => {
      emit('changeTag', selectItem.value)
    }
    return {
      selectItem,
      message,
      img,
      list,
      handleChangeTag,
      sendData
    }
  }
})
</script>

<style scoped lang="less">
.message-wrap {
  width: 100%;
  display: flex;
  // border: 1px solid rgb(220, 223, 230);
  border-radius: 4px;
  height: calc(100vh - 420px);
  min-height: 500px;
  overflow: hidden;
  overflow-y: scroll;
  // padding: 10px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .item {
    display: flex;
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start !important;
      margin-top: 10px;
      .right {
        display: flex;
        align-items: center;
        margin-left: 10px;
        .name {
          font-size: 14px;
          color: #262d3d;
          margin-right: 10px;
        }
        .time {
          font-size: 12px;
          color: #a1abc2;
        }
      }
      .user-message {
        margin-top: 10px;
        min-height: 14px;
        padding: 10px 15px;
        border-radius: 2px 6px 6px 6px;
        color: #222;
        line-height: 20px;
        background-color: #f1f2f5;
        box-sizing: border-box;
        font-size: 14px;
        max-width: 400px;
        word-break: break-word;
        text-align: left;
      }
    }
  }
}
.tim-wrap {
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  .tim-message {
    width: 100%;
    margin-right: 20px;
  }
  .tim-send {
    display: flex;
    flex-direction: column;
  }
}
</style>
