import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'
// 存储 侧边栏第一个菜单，登录后默认打开
let firstMenu: any = null
// 将用户拥有的权限路由进行映射
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
          const component = menu.component ? menu.component.split('/') : []
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

// 面包屑
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// 处理用户刷新页面后侧边栏菜单选中，以及面包屑
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.children && menu.children.length > 0) {
      const findMenu = pathMapToMenu(menu.children, currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.title })
        breadcrumbs?.push({ name: findMenu.title })
        return findMenu
      }
    } else if (menu.url === currentPath) {
      return menu
    }
  }
}

// 获取用户按钮权限
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

// 获取菜单所有ID
const ids: any[] = []
export function getMenuAllID(menuList: any): any {
  for (const menu of menuList) {
    if (menu.children && menu.children.length > 0) {
      getMenuAllID(menu.children)
    } else {
      ids.push(menu.id)
    }
  }
}

// 获取菜单叶子节点
export function menuMapLeafKeys(menus: any) {
  const leftKeys: number[] = []
  const userHasMenu = JSON.parse(menus)
  // getMenuAllID(menuList)
  for (const menu of userHasMenu) {
    leftKeys.push(menu)
  }
  console.log(leftKeys, 'userMenu')
  // const _recurseGetLeaf = (menuList: any[]) => {
  //   for (const menu of menuList) {
  //     if (menu.children) {
  //       _recurseGetLeaf(menu.children)
  //     } else {
  //       leftKeys.push(menu.id)
  //     }
  //   }
  // }
  // _recurseGetLeaf(menuList)

  return leftKeys
}

// 获取菜单叶子节点
// export function menuMapLeafKeys(menuList: any[]) {
//   const leftKeys: number[] = []
//   const _recurseGetLeaf = (menuList: any[]) => {
//     for (const menu of menuList) {
//       if (menu.children) {
//         _recurseGetLeaf(menu.children)
//       } else {
//         leftKeys.push(menu.id)
//       }
//     }
//   }
//   _recurseGetLeaf(menuList)
//   return leftKeys
// }
export { firstMenu }
