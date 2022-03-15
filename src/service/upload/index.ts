import hyRequest from '../index'

//  获取oss凭证
export const getOssToken = (paramData: any) => {
  return hyRequest.post<any>({
    url: '/cms/oss/file/getToken',
    data: { ossType: paramData },
    showLoading: false
  })
}
