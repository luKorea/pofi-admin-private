#!/bin/bash
###
 # @Author: korealu
 # @Date: 2022-03-08 15:23:56
 # @LastEditors: Please set LastEditors
 # @LastEditTime: 2022-03-24 17:58:08
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
git push origin -u master
# git push pofi
# git push pofi-create
