'use strict'

const fs = require('mz/fs')
const mongoose = require('mongoose')
const firebase = require('firebase-admin')
const config = require('./settings')

function init() {
  mongodbInit()
  firebaseInit()
}

function mongodbInit() {
  mongoose.set('debug', config.db.mongo.debug)

  // Fix deprecated warnings
  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)
  mongoose.set('useNewUrlParser', true)

  mongoose.connect(`mongodb://${config.db.mongo.host}:${config.db.mongo.port}/${config.db.mongo.name}`)
  mongoose.connection.on('error', err => {
    if (err) {
      throw err
    }
  })
}

async function firebaseInit() {
  try {
    const file = await fs.readFile(config.db.firebase.keyFilePath)
    const firebaseKey = JSON.parse(file)
    firebase.initializeApp({
      credential: firebase.credential.cert(firebaseKey),
      databaseURL: config.db.firebase.url,
    })
  } catch (err) {
    throw err
  }
}

module.exports = { init }
