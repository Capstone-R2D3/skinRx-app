const express = require('express')
const morgan = require('morgan')
const app = express()
const http = require('http')
const server = http.createServer(app);
const { db } = require('./models/index')
 
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/api/products', require('./api/products')) 

app.use((err, req, res, next) => {
  console.error(err, typeof next)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

 
const PORT = 8080
 
async function startServer() {
 
       await db.sync({force: true})
       server.listen(PORT, () => {
           console.log(`server listening on port ${PORT}`)
       })  
}
 
startServer()


module.exports = app
