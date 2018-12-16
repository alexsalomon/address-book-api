const firebase = require('firebase-admin')
const logger = require('../../services/logger')
const config = require('../../config')

module.exports = async () => {
  await firebase.initializeApp({
    credential: firebase.credential.cert({
      privateKey: config.db.firebase.privateKey,
      clientEmail: config.db.firebase.clientEmail,
    }),
    databaseURL: config.db.firebase.url,
  })

  logger.debug(`Firebase connected to url: ${config.db.firebase.url}`)
  logger.info('Firebase has been successfully connected.')
}
