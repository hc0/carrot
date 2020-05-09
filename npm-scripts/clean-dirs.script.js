'use strict';

var fs = require('fs');
var rimraf = require('rimraf');
var path = require('path');
var dist = path.resolve('./dist');
console.log(dist);
rimraf(dist, fs, function cb() {
  console.log('dist目录已清空');
});

