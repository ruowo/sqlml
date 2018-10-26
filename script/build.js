import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import re from 'rollup-plugin-re'
import json from 'rollup-plugin-json'
import uglify from 'rollup-plugin-uglify'

export default [{
  input: 'src/app.js',
  output: [
    {format: 'iife', file: 'static/assets/app.js'},
  ],
  external: [
    'vue',
    'vue-router',
  ],
  plugins: createPlugins()
}]

function createPlugins () {
  return [
    re({
      defines: {
        IS_REMOVE: true,
      },
      replaces: {
        "process.env.NODE_ENV": `"${process.env.NODE_ENV || ''}"`
      }
    }),
    // {
    //   name: 'stdx-resolve',
    //   resolveId (id, origin) {
    //     if (id.startsWith('vue')) {
    //       return
    //       // return require.resolve(id)
    //     }
    //   }
    // },
    json(),
    vue({
      css: true
    }),
    babel({
      babelrc: false,
      plugins: [
        ['transform-object-rest-spread', { 'useBuiltIns': true }]
      ]
    }),
    resolve({
      module: true
    }),
    commonjs({
      include: [
        'node_modules/**',
        process.env.ENTRYMODULE + '/**',
      ]
    })
  ]  
}
