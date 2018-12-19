const express = require('express')
const validate = require('express-validation')
const routesUtil = require('../../util/routes.util')
const AuthServices = require('../auth/auth.services')
const ContactsController = require('./contact.controller')
const ContactValidation = require('./contact.validation')

const router = new express.Router()

// Authorization middleware
const authenticate = AuthServices.authenticate

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
router.post(
  '/',
  validate(ContactValidation.addContact),
  authenticate,
  routesUtil.controllerHandler(
    ContactsController.addContact,
    req => [req.userId, req.body],
  ),
)

module.exports = router
