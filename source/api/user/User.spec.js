/* eslint-env mocha */
'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const factories = require('../../../test/factories')
const User = require('./User')

const expect = chai.expect
chai.use(dirtyChai)
let defaultUser

describe('user : User', () => {
  beforeEach(() => {
    defaultUser = new User(factories.validUser())
  })

  describe('create()', () => {
    it('should create a user when email and password are valid', () => {
      const validation = defaultUser.validateSync()
      expect(validation).to.not.exist()
    })

    it('should require email and password', () => {
      const user = new User()
      const { errors } = user.validateSync()
      expect(errors.email.properties.type).to.equal('required')
      expect(errors.password.properties.type).to.equal('required')
    })

    it('should require an unique email', () => {
      defaultUser.save(err => {
        expect(err).to.not.exist()
        const user2 = defaultUser
        const validation = user2.validateSync()
        expect(validation.errors.email.properties.type).to.equal('unique')
      })
    })

    it('should require a valid email', () => {
      defaultUser.email = 'notgoodemail'
      const validation = defaultUser.validateSync()
      expect(validation.errors.email).to.exist()
    })

    it('should require a valid password', () => {
      defaultUser.password = '2short'
      const validation = defaultUser.validateSync()
      expect(validation.errors.password).to.exist()
    })

    it('should not be storing password in plain text', () => {
      defaultUser.password = 'password'
      defaultUser.save((err, user) => {
        expect(err).to.not.exist()
        expect(user.password).to.not.equal(defaultUser.password)
      })
    })
  })

  describe('authentication', () => {
    it('should return true for valid password', () => {
      defaultUser.password = 'password'
      defaultUser.save((err, user) => {
        expect(err).to.not.exist()
        expect(user.isPasswordValid(defaultUser.password)).to.equal(true)
      })
    })

    it('should return false for invalid password', () => {
      defaultUser.password = 'passwordmismatch'
      defaultUser.save((err, user) => {
        expect(err).to.not.exist()
        expect(user.isPasswordValid(defaultUser.password)).to.equal(true)
      })
    })
  })
})
