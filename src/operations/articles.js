'use strict'

const errors = require('../utils/errors')
const articleRepo = require('../repositories/articles')

function getAll() {
  return articleRepo.findAll()
}

function getById(input) {
  const article = articleRepo.findById(input.id)

  if (!article) {
    throw new errors.NotFoundError()
  }

  return article
}

function create(article) {
  return articleRepo.create(article)
}

module.exports = {
  getAll,
  getById,
  create,
}
