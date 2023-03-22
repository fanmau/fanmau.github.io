const express = require('express')
const { createServer } = require('http')

const PORT = process.env.PORT || 3000
const app = express()

app.get('*.html', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html')
  next()
})

app.use(express.static('public'))


app.all('*', (req, res) => {
  return handle(req, res)
})

const server = createServer(app)

server.listen(PORT, (err) => {
 if (err) throw err
 console.log(`> Ready on port ${PORT}...`)
})