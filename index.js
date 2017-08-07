"use strict"
var Magnify = require('./magnify')
var Parallax = require('./parallax')

module.exports = function() {
  return {
    magnify: Magnify,
    parallax: Parallax
  }
}
