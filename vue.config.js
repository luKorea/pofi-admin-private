/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:30
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-18 17:14:14
 * @Description: file content
 * @FilePath: /pofi-admin/vue.config.js
 */
const path = require('path')
module.exports = {
  // 1.配置方式一: CLI提供的属性
  outputDir: './build',
  // publicPath: './',
  devServer: {
    proxy: {
      '^/api': {
        // http://152.136.185.210:5000
        // http://tcms.pofiart.com
        target: 'https://pe-cms.pofiart.com',
        changeOrigin: true
      }
    }
  },
  // 2.配置方式二: 和webpack属性完全一致, 最后会进行合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components'
  //     }
  //   }
  // }
  // 项目优化方案
  //去除生产环境的 productionSourceMap
  productionSourceMap: false,
  configureWebpack: (config) => {
    ;(config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
      components: '@/components'
    }),
      (config.optimization.splitChunks = {
        minChunks: 3,
        name: 'vendor'
      })
  },
  chainWebpack: (config) => {
    config.module.rule('javascript/auto').test(/\.mjs$/)
  }
  // 3.配置方式三:
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
  //  资源优化部分
}
