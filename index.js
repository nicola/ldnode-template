const ldnode = require('ldnode')
const express = require('express')
const fs = require('fs')
const https = require('https')

const PORT = process.env.PORT || 8443
const KEY = process.env.KEY || './certs/key.pem'
const CERT = process.env.CERT || './certs/cert.pem'
const options = {
  key: fs.readFileSync(KEY),
  cert: fs.readFileSync(CERT)
}

var app = express()
var solid = ldnode({
  webid: true,
  idp: true,
  defaultApp: false,
  root: './data'
})

app.use('/', solid)

https.createServer(options, app).listen(PORT, () => {
  console.log('Ldnode has started')
})
