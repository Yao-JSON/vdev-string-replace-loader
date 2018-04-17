
function replaceFun (source, options, Info, ctx) {
  const { flags, strict, ctxPath } = options;
  let { replace } = options;
  const { resourcePath } = ctx;
  if(ctxPath) {
    const regPath = flags ?  new RegExp(ctxPath, flags) : new RegExp(ctxPath);
    if(!regPath.test(resourcePath)) {
      return source
    }
  }

  const search = (
    flags === null
      ? options.search
      : new RegExp(options.search, flags)
  )

  for (let k in Info) {
    replace = replace.replace(`[${k}]`, Info[k]);
  }
  if (strict && (search === null || replace === null)) {
    throw new Error('Replace failed (strict mode) : options.search and options.replace are required')
  }

  const newSource = source.replace(search, replace)

  if (strict && (newSource === source)) {
    throw new Error('Replace failed (strict mode) : ' + options.search + ' → ' + options.replace)
  }

  return newSource
}

module.exports = replaceFun
