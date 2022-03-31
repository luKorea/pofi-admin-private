import hyRequest from '@/service'

// 获取跳转链接
export function getJumpLink(data: any) {
  return hyRequest.post<any>({
    url: '/cms/jump/getJump',
    data: data,
    showLoading: false
  })
}

// 解密链接
export function decryptUrl(data: any) {
  return hyRequest.post<any>({
    url: '/cms/jump/jump2Vo',
    data: data
  })
}
