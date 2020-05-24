const express = require('express')
const app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = process.env.PORT || 5000

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`))

// create a GET route
app.get('/login', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' })
});
app.post('/login', (req, res) => {
  const username=req.body.username
  const password=req.body.password
  if (username==='admin' && password==='1234'){
    res.sendStatus(200)
  } else{
    res.sendStatus(401)
  }
  console.log(req.body)
  
});
// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const router = jsonServer.router('db.json')
// const middlewares = jsonServer.defaults()

// server.use(middlewares)
// server.use((req, res, next) => {
//  if (isAuthorized(req)) { // add your authorization logic here
//    next() // continue to JSON Server router
//  } else {
//    res.sendStatus(401)
//  }
// })
// server.use(router)
// server.listen(3000, () => {
//   console.log('JSON Server is running')
// })