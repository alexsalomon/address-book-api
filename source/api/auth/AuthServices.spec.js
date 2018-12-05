/* eslint-env mocha */
'use strict'

const HttpStatus = require('http-status')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
const jwt = require('jsonwebtoken')
const factories = require('../../../test/factories')
const APIError = require('../../services/errors')
const AuthServices = require('./AuthServices')

const expect = chai.expect
chai.use(dirtyChai)
chai.use(chaiAsPromised)

let request
const passError = err => {
  if (err) {
    throw err
  }
}

describe('auth : AuthServices', () => {
  describe('verifyToken()', () => {
    beforeEach(() => {
      sinon.stub(jwt, 'verify')
      request = {
        ...factories.authRequest(),
      }
    })

    afterEach(() => {
      jwt.verify.restore()
    })

    it('should add the userId to the request object if token is valid', () => {
      const expectedId = 'testuserid'
      jwt.verify.resolves({ id: expectedId })

      AuthServices.verifyToken(request, '', passError).then(() => {
        expect(request.userId).to.equal(expectedId)
      })
    })

    it('should throw an error if request is unauthorized', () => {
      const expectedId = 'testuserid'
      jwt.verify.resolves({ id: expectedId })
      request.headers = {}

      const promise = AuthServices.verifyToken(request, '', passError)
      expect(promise).to.be.eventually.rejected()
        .and.be.an.instanceOf(APIError)
        .and.have.property('status', HttpStatus.UNAUTHORIZED)
    })

    it('should throw an error if request verification fails', () => {
      jwt.verify.rejects()

      const promise = AuthServices.verifyToken(request, '', passError)
      expect(promise).to.be.eventually.rejected()
        .and.be.an.instanceOf(APIError)
        .and.have.property('status', HttpStatus.UNAUTHORIZED)
    })
  })

  describe('createToken()', () => {
    it('should return an authentication token', () => {
      const expectedToken = 'tokenexample'
      sinon.stub(jwt, 'sign').resolves(expectedToken)
      AuthServices.createToken('userid').then(token => {
        expect(token).to.equal(expectedToken)
      })
    })
  })
})
