import hyRequest from '@/service'

// 获取用户基本信息
export function getFeedbackUserInfo(data: any) {
  return hyRequest.post<any>({
    url: '/cms/userInfo/querUser',
    data: data
  })
}
// 获取历史聊天记录
export function getFeedbackHistoryInfo(data: any) {
  return hyRequest.post<any>({
    url: '/cms/feedback/getHistory',
    data: data
  })
}
// 回复用户信息
export function sendFeedbackInfo(data: any) {
  return hyRequest.post<any>({
    url: '/cms/feedback/handle',
    data: data,
    showLoading: false
  })
}

// 设置用户问题tag
export function setFeedbackQuestionTag(data: any) {
  return hyRequest.post<any>({
    url: '/cms/feedback/updateTag',
    data: data,
    showLoading: false
  })
}
