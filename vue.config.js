/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:30
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-24 10:37:51
 * @Description: file content
 * @FilePath: /pofi-admin/vue.config.js
 */
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // 1.配置方式一: CLI提供的属性
  outputDir: './build',
  // publicPath: './',
  devServer: {
    proxy: {
      '^/api': {
        // http://152.136.185.210:5000
        // http://tcms.pofiart.com 测试服
        // https://pe-cms.pofiart.com 预发布服
        target: 'https://tcms.pofiart.com',
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
    const plugins = [] // 打包优化
    if (isProduction) {
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] //移除 console
            }
          }
        })
      )
    }
    ;(config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
      components: '@/components'
    }),
      (config.optimization.splitChunks = {
        // 打包优化
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
