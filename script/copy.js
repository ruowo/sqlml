const fs = require('fs')
const fse = require('fs-extra')

let list = [
  ['vue/dist/vue.js', 'static/vendor/vue/vue.js'],
  ['vue-router/dist/vue-router.js', 'static/vendor/vue-router/vue-router.js'],
  ['vuetify/dist/vuetify.js', 'static/vendor/vuetify/vuetify.js'],
  ['vuetify/dist/vuetify.css', 'static/vendor/vuetify/vuetify.css'],
  ['material-design-icons-iconfont/dist/material-design-icons.css', 'static/vendor/material-iconfont/material-design-icons.css'],
  ['material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.woff2', 'static/vendor/material-iconfont/fonts/MaterialIcons-Regular.woff2'],
]

list.forEach(it => {
  let [src, dist] = it
  fse.outputFile(dist, fs.readFileSync(require.resolve(src)) , err => {
    if (err) return console.error(err)
    console.log(`${src} => ${dist}`)
  })
})
