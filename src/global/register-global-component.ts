/*
 * @Author: korealu
 * @Date: 2022-02-16 09:59:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-17 10:43:49
 * @Description: file content
 * @FilePath: /pofi-admin/src/global/register-global-component.ts
 */
import { App } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'
import PageDialog from '@/components/page-dialog'
import PageCountry from '@/components/page-country'
import PageImage from '@/base-ui/image'

const components: any[] = [
  PageContent,
  PageSearch,
  PageModal,
  PageDialog,
  PageCountry,
  PageImage
]

export function registerGlobalComponents(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
