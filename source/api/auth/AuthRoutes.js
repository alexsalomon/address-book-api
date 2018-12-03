'use strict'

const express = require('express')
const routesUtil = require('../../util/routesUtil')
const AuthController = require('./AuthController')

const router = new express.Router()

router.post('/register', routesUtil.controllerHandler(
  AuthController.register,
  req => [req.body.email, req.body.password],
))

router.post('/login', routesUtil.controllerHandler(
  AuthController.login,
  req => [req.body.email, req.body.password],
))

module.exports = router
