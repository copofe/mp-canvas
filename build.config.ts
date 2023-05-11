import { OutputOptions } from 'rollup'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  rollup: {
    inlineDependencies: true,
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
  declaration: true,
  hooks: {
    'rollup:build'(ctx, r) {
      let x = r.write
      r.write = async function (outputOptions) {
        function replaceCjs(str: string) {
          if (str.endsWith('.cjs')) {
            return str.replace(/^(.*)\.cjs$/, '$1.js')
          }
          return str
        }

        if (typeof outputOptions.entryFileNames === 'function') {
          const ofn = outputOptions.entryFileNames
          outputOptions.entryFileNames = function (chunkInfo) {
            const res = ofn(chunkInfo)
            return replaceCjs(res)
          }
        } else if (typeof outputOptions.entryFileNames === 'string') {
          outputOptions.entryFileNames = replaceCjs(
            outputOptions.entryFileNames,
          )
        }
        return x.call(null, outputOptions)
      }
    },
  },
})
