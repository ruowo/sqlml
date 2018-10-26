
class Sqlml {
  constructor (data = {}) {
    ensures(data, {
      groups: [],
      sqls: [],
      sqlml: 1,
    })
    this.data = data
  }
  addGroup (name, title) {
    this.data.groups.push({name, title})
  }
}

function ensure(obj, name, value) {
  if (!obj[name]) {
    obj[name] = value
  }
}

function ensures(obj, maps) {
  Object.keys(maps).forEach(name => ensure(obj, name, maps[name]))
}

let sql = new Sqlml()

console.log(sql)
