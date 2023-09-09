const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

app.use(cors())

const sentences = require('./sentences')

app.get('/sentences', (req, res) => {
  res.json(sentences)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
