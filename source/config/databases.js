'use strict'

const mongoose = require('mongoose')
const firebase = require('firebase-admin')
const logger = require('../util/logger')
const config = require('./settings')

async function init() {
  try {
    await mongodbInit()
    await firebaseInit()
  } catch (err) {
    logger.error(err)
  }
}

function mongodbInit() {
  mongoose.set('debug', config.db.mongo.debug)

  // Fix deprecated warnings
  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)
  mongoose.set('useNewUrlParser', true)

  mongoose.connect(config.db.mongo.url)
  mongoose.connection.on('error', err => {
    if (err) {
      throw err
    }
  })
}

async function firebaseInit() {
  await firebase.initializeApp({
    credential: firebase.credential.cert({
      privateKey: config.db.firebase.privateKey,
      clientEmail: config.db.firebase.clientEmail,
    }),
    databaseURL: config.db.firebase.url,
  })
}

module.exports = { init }
