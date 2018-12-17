/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const sinon = require('sinon')
const factories = require('../../../test/factories')
const User = require('../user/user')
const AuthController = require('./auth.controller')
const AuthServices = require('./auth.services')

const expect = chai.expect
chai.use(dirtyChai)
let defaultUser

describe('auth : AuthController', () => {
  beforeEach(() => {
    defaultUser = new User(factories.validUser())
  })

  describe('register()', () => {
    beforeEach(() => {
      sinon.stub(User, 'create')
      sinon.stub(AuthServices, 'createToken')
    })

    afterEach(() => {
      User.create.restore()
      AuthServices.createToken.restore()
    })

    it('should return an object with an authentication token', () => {
      const user = factories.validUser()
      const expectedToken = 'tokenexample'
      User.create.resolves(user)
      AuthServices.createToken.resolves(expectedToken)

      AuthController.register(user.email, user.password).then(res => {
        expect(User.create.called).to.be.true()
        expect(AuthServices.createToken.called).to.be.true()
        expect(res.token).to.equal(expectedToken)
      })
    })
  })

  describe('login()', () => {
    beforeEach(() => {
      sinon.stub(User, 'findOne')
      sinon.stub(User.prototype, 'isPasswordValid')
      sinon.stub(AuthServices, 'createToken')
    })

    afterEach(() => {
      User.findOne.restore()
      User.prototype.isPasswordValid.restore()
      AuthServices.createToken.restore()
    })

    it('should return auth object on sucesssful login', () => {
      const expectedToken = 'tokenexample'
      User.findOne.resolves(defaultUser)
      User.prototype.isPasswordValid.resolves(true)
      AuthServices.createToken.resolves(expectedToken)

      AuthController.login(defaultUser.email, defaultUser.password).then(res => {
        expect(res.token).to.equal(expectedToken)
      })
    })
  })
})
