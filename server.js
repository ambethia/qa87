const app = require('express')()
const pgp = require('pg-promise')()
const cors = require('cors')
const db = pgp('postgres://localhost:5432/adventure-time');

app.use(cors())

app.get('/characters', (req, res) => {
  db.any('SELECT id, name FROM characters')
    .then((data) => {
      res.json(data)
    })
})

app.get('/characters/:id', (req, res) => {
  const id = req.params.id
  db.oneOrNone('SELECT * FROM characters WHERE id = $1', [id])
    .then((data) => {
      res.json(data)
    })
})

app.listen(3000, () => {
  console.log('Algebraeic!')
})
