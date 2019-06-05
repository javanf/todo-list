var express = require('express')

var query = require('./pool')
var sql = require('./sql')

var app = express()

app.get('/get-task-list', (req, res) => {
  query(sql.SELECT_TODOLIST_TABLE, (err, result, fields) => {
    if (err) {
      console.log('[SELECT ERROR]:', err.message)
    }
    res.send(result)
  })
})

app.post('/update-task-list', (req, res) => {
  query(sql.UPDATE_TODOLIST_TABLE, (err, result, fields) => {
    if (err) {
      console.log('[SELECT ERROR]:', err.message)
    }
    res.send(result)
  })
})

app.listen(3000, () => {
  console.log('Server running at 3000 port')
})