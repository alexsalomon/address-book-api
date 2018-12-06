const express = require('express')
const routesUtil = require('../../util/routesUtil')
const AuthServices = require('../auth/AuthServices')
const ContactsController = require('./ContactController')

const router = new express.Router()

// Authorization middleware
const verifyToken = AuthServices.verifyToken

/**
 * @api {post} /contacts Add a Contact to the Address Book
 * @apiName PostContact
 * @apiGroup Contact
 *
 * @apiHeader {String} jwt-token Users unique access-key.
  * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0"
 *     }
 *
 * @apiParam {String} firstName The contact's first name.
 * @apiParam {String} lastName The contact's last name.
 * @apiParam {String} email The contact's email.
 * @apiParam {String} phoneNumber The contact's phone number.
 *
 * @apiSuccess {String} ref The firebase document reference for the added contact
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ref": "LSoA0PfAL8VhKRyP4fe"
 *     }
 *
 * @apiError BadRequest A required field was not provided
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "type": "BadRequest",
 *       "error": "Error message"
 *     }
 */
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
