#!/bin/bash
###
 # @Author: korealu
 # @Date: 2022-03-08 15:23:56
 # @LastEditors: korealu 643949593@qq.com
 # @LastEditTime: 2022-07-04 09:54:09
 # @Description: file content
 # @FilePath: /h5-active-v2/push.sh
###
baseball=$(
  cd $(dirname $0) || exit
  pwd
)
cd "$baseball" || exit
git add .
npm run commit
git push origin pc
git push pofi pc
# git push pofi-create
