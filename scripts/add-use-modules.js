#!/usr/bin/env node
const fs = require('fs').promises
const path = require('path')
const mkdirp = require('mkdirp')

const plugins = [
  'actions/index',
  'actions/drag',
  'actions/drop',
  'actions/resize',
  'actions/gesture',
  'auto-scroll/index',
  'auto-start/index',
  'dev-tools/index',
  'inertia/index',
  'modifiers/index',
  'pointer-events/index',
  'reflow/index',
]

Promise.all(plugins.map(async modulePath => {
  const [scopePath] = modulePath.split('/')
  const packagePath = path.join('@interactjs', scopePath)
  const pluginPath = path.join('@interactjs', modulePath)
  const dest = `${path.join(packagePath, 'use', path.relative(packagePath, pluginPath))}.ts`
  const destDir = path.dirname(dest)
  const importPath = path.relative(destDir, pluginPath)

  mkdirp.sync(destDir)

  await fs.writeFile(dest, `
    import interact, { init } from '@interactjs/interact'
    import plugin from '${importPath}'

    if (typeof window === 'object' && !!window) {
      init(window)
    }

    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production' && !(interact as any).__warnedUseImport) {
      (interact as any).__warnedUseImport = true
      // eslint-disable-next-line no-console
      console.warn('[interact.js] The "@interactjs/*/use" packages are not quite stable yet. Use them with caution.')
    }

    interact.use(plugin)\n`.replace(/^ {4}/mg, '').trimLeft())

  console.log(`wrote ${dest}`)
}))
