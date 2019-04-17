'use strict'

// const R = require('ramda')
const errors = require('../utils/errors')
const articles = require('../data/articles')

function getAll() {
  return articles
}

function getById(input) {
  const article = articles.find(item => item.id === Number(input.id))
  // const article = R.find(R.propEq('id', input.id), articles)

  if (!article) {
    throw new errors.NotFoundError()
  }

  return article
}

function create(article) {
  article.id = articles.length + 1
  articles.push(article)
  return article
}

module.exports = {
  getAll,
  getById,
  create,
}
