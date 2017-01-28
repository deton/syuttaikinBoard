'use strict';

var url = require('url');

var Default = require('./DefaultService');

module.exports.getThingShadow = function getThingShadow (req, res, next) {
  Default.getThingShadow(req.swagger.params, res, next);
};

module.exports.updateThingShadow = function updateThingShadow (req, res, next) {
  Default.updateThingShadow(req.swagger.params, res, next);
};
