/*
 * @Author: korealu
 * @Date: 2022-02-16 09:59:37
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 11:04:28
 * @Description: file content
 * @FilePath: /pofi-admin/src/global/register-global-component.ts
 */
import { App } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'
import PageDialog from '@/components/page-dialog'

const components: any[] = [PageContent, PageSearch, PageModal, PageDialog]

export function registerGlobalComponents(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
