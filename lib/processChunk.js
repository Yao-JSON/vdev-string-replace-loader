const getOptionsArray = require('./getOptionsArray')
const replace = require('./replace')
const path = require('path');

function getInfo(ctx) {
  const {context, resource, resourcePath, resourceQuery, target } = ctx;
  const name = path.basename(resourcePath).split('.')[0];

  return {
    name,
    target,
    context,
    path: resourcePath
  }

}

function processChunk (source, map) {
  this.cacheable()
  const { context, resource, resourcePath, resourceQuery, target, loadModule, resolve } = this;
  var  obj = {context, resource, resourcePath, resourceQuery, target};

  for(let k in obj) {
    // console.log(k,' : ' ,obj[k]);
  }
  const optionsArray = getOptionsArray(this)
  let newSource = source
  const Info = getInfo(this);
  for (const options of optionsArray) {
    newSource = replace(newSource, options, Info, this)
  }

  this.callback(null, newSource, map)
}

module.exports = processChunk
