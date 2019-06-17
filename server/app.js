var express = require('express')

var query = require('./pool')
var sql = require('./sql')
var moment = require('moment')
var bodyParser = require("body-parser")

var app = express()

app.use(bodyParser.urlencoded({    
  extended: true
}));

app.use(bodyParser.json())

let sendError = (res, message) => {
  res.status(500).send({
    code: 500,
    message: message
  })
}

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/task/get-task-list', (req, res) => {
  query(sql.SELECT_TASK_GROUP, (err, result, fields) => {
    if (err) {
      console.log('[SELECT ERROR]:', err.message)
    }
    res.send(result)
  })
})

/**
 * 添加任务分组
 */
app.post('/task/create-task-group', (req, res) => {
  const params = req.body;
  console.log(params)
  if(!params.group_title){
    sendError(res, '分组名称不能为空')
    return
  }
  let title = params.group_title
  let date = moment().format('YYYY-MM-DD HH:mm:ss');
  let csql = eval('`'+sql.CREATED_TASK_GROUP+'`');
  console.log('[SQL:]', csql);
  query(csql, (err, result, fields) => {
    if (err) {
      console.log('[SELECT ERROR]:', err.message)
    }
    res.send(result)
  })
})


app.post('/task/update-task', (req, res) => {
  const params = req.body;
  if(!params.group_id){
    sendError(res, '分组id不能为空')
    return
  }
  if(!params.item.title){
    sendError(res, '任务名称不能为空')
    return
  }
  if(!params.item.level && params.item.level!==0){
    sendError(res, '任务等级不能为空')
    return
  }
  let title = params.item.title;
  let description = params.item.description;
  let enclosure = params.item.imgs;
  let level = params.item.level;
  let group_id  = params.group_id;
  let date = moment().format('YYYY-MM-DD HH:mm:ss');
  let id = params.item.id;
  let csql = params.item.id ? eval('`'+sql.UPDATE_TASK_LIST+'`') : eval('`'+sql.CREATED_TASK_LIST+'`');
  console.log('[SQL:]', csql);
  query(csql, (err, result, fields) => {
    if (err) {
      console.log('[SELECT ERROR]:', err.message)
    }
    res.send(result)
  })
})


app.listen(3000, () => {
  console.log('Server running at 3000 port')
})