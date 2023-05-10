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
    'rollup:options': (ctx, option) => {
      ;(option.output as OutputOptions[]).push({
        name: 'index',
        dir: ctx.options.outDir,
        format: 'iife',
        exports: 'auto',
        preferConst: true,
        externalLiveBindings: false,
        freeze: false,
      })
    },
  },
})
