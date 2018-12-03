'use strict'

const express = require('express')
const routesUtil = require('../../util/routesUtil')
const AuthServices = require('../auth/AuthServices')
const ContactsController = require('./ContactController')

const router = new express.Router()

// Authorization middleware
const verifyToken = AuthServices.verifyToken

router.post('/', verifyToken, routesUtil.controllerHandler(
  ContactsController.addContact,
  req => [req.userId, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  }],
))

module.exports = router
