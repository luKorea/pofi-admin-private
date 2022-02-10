import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.children && menu.children.length > 0) {
        _recurseGetRoute(menu.children)
      } else {
        const route = allRoutes.find((route) => {
          const component = menu.component.split('/')
          if (menu.name === 'resource_index') {
            // 特殊路由处理，后续前端命名
            menu['url'] = '/' + 'resource' + '/' + component[0]
          } else {
            menu['url'] = '/' + component[0] + '/' + menu.path
          }
          // TODO 判断路由是否相等，相等的动态设置路由meta参数，用于后面缓存操作
          if (route.path === menu.url) route.meta = menu.meta
          return route.path === menu.url
        })
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// /main/system/role  -> type === 2 对应menu
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.length === 0) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else {
      return menu
    }
  }
}

// export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
//   const breadcrumbs: IBreadcrumb[] = []

//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         breadcrumbs.push({ name: menu.name, path: menu.url })
//         breadcrumbs.push({ name: findMenu.name, path: findMenu.url })
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }

//   return breadcrumbs
// }

// // /main/system/role  -> type === 2 对应menu
// export function pathMapToMenu(userMenus: any[], currentPath: string): any {
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)

  return leftKeys
}

export { firstMenu }
