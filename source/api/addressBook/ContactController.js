'use strict'

const HttpStatus = require('http-status')
const firebase = require('firebase-admin')
const APIError = require('../../services/errors')

/**
 * Saves a contact to the address book.
 * @param {string} userId The address book owner's user id.
 * @param {Object} contactInfo contact data such as first name, last name, email and phone number.
 * @returns {Object} The added firebase document reference
 */
async function addContact(userId, contactInfo) {
  validate(contactInfo)
  const database = firebase.database()
  const ref = await database.ref(`/contacts/${userId}`).push(contactInfo)
  return { ref }
}

function validate(contactInfo) {
  if (typeof contactInfo.firstName === 'undefined'
    || typeof contactInfo.lastName === 'undefined'
    || typeof contactInfo.email === 'undefined'
    || typeof contactInfo.phoneNumber === 'undefined') {
    throw new APIError(
      HttpStatus.BAD_REQUEST,
      "'firstName', 'lastName', 'email' and 'phoneNumber' are required fields.",
    )
  }
}

module.exports = { addContact }
