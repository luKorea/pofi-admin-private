import hyRequest from '@/service'

export const mapResourceInfo = (unityType: any) => {
  return hyRequest.post<any>({
    url: `/cms/mold/searchMold/byUnityType?unityType=${unityType}`,
    showLoading: true
  })
}
