const fs = require('node:fs')
const path = require('node:path')
const serverMod = require('./server')
let appExt 
before( async () => {
  try {
    appExt = await serverMod.apiServe()   
  } catch (error) {
    console.log('failed to create server')
  }
  if (appExt.server && appExt.server.address) {
    const addr = appExt.server.address()
    if (addr && typeof addr === 'object' && 'port' in addr) {
      global.host = `http://localhost:${addr.port}`
      return
    }
  }
  throw new Error('failed to set up host')
})

after( (done) => {
  if (appExt.server) {
    appExt.server.close(done)
    return
  }

  throw new Error('failed to set up server')
})

fs.readdirSync(path.join(__dirname, '..','test')).forEach((file) => {
  require(path.join(__dirname, '..','test', file))
})