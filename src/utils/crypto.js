'use strict'

const crypto = require('crypto')
const bcrypt = require('bcrypt')
const config = require('../config')
const util = require('util')
const jwt = require('jsonwebtoken')

const jwtSign = util.promisify(jwt.sign)
const jwtVerify = util.promisify(jwt.verify)

function generateAccessToken(userId) {
  const payload = { userId }
  return jwtSign(payload, config.auth.secret, config.auth.createOptions)
}

function verifyAccessToken(authToken) {
  try {
    return jwtVerify(authToken, config.auth.secret, config.auth.verifyOptions)
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError || err instanceof SyntaxError) {
      return null
    }
    throw err
  }
}

function hashPassword(password) {
  return bcrypt.hash(pepperify(password), config.auth.createOptions)
}

function comparePasswords(plaintext, ciphertext) {
  return bcrypt.compare(pepperify(plaintext), ciphertext)
}

// is this comment section important?
/**
 * Apply system-configured pepper to any given string
 *
 * @param {String} string The string to pepperify
 * @return {String} SHA-1 hash of the input string with pepper applied
 */
function pepperify(string) {
  return crypto
    .createHmac('sha1', config.auth.secret)
    .update(string)
    .digest('hex')
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  hashPassword,
  comparePasswords,
}
