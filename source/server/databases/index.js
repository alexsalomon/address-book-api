const mongooseInit = require('./mongoose.databases')
const firebaseInit = require('./firebase.databases')

module.exports = () => Promise.all([
  mongooseInit(),
  firebaseInit(),
])
