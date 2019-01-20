/**
 * 注册和登录
 */
//导包
const express = require('express')
const path = require('path')
//创建路由对象
const accountRouter = express.Router()
//导入控制器模块
const accountController = require(path.join(__dirname, '../controllers/accountController'))
//处理请求
accountRouter.get('/register', accountController.getRegisterPage)
accountRouter.post('/register',accountController.register)
//导出
module.exports = accountRouter;