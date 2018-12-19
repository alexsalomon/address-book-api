const firebase = require('firebase-admin')

/**
 * Saves a contact to the address book.
 * @param {string} userId The address book owner's user id.
 * @param {Object} contactInfo contact data such as first name, last name, email and phone number.
 * @returns {Object} The added firebase document reference
 */
async function addContact(userId, contactInfo) {
  const database = firebase.database()
  const ref = await database.ref(`/contacts/${userId}`).push(contactInfo)
  return { ref }
}

module.exports = { addContact }
