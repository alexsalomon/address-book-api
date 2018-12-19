const Joi = require('joi')

module.exports = {
  // POST /contacts
  addContact: {
    options: {
      allowUnknownBody: false,
    },
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().optional(),
    },
    headers: {
      authorization: Joi.string().required(),
    },
  },
}
