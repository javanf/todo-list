var express = require('express')

var query = require('./pool')
var sql = require('./sql')
var moment = require('moment')
var bodyParser = require("body-parser")
var utils = require('./utils')

var jwt    = require('jsonwebtoken'); // 使用jwt签名

var app = express()

app.set('superSecret', 'todolist'); // 设置 app 的密码--用来生成签名的密码

app.use(bodyParser.urlencoded({    
  extended: true
}));

app.use(bodyParser.json())

let sendError = (res, message, code = 500) => {
  res.status(500).send({
    code: code,
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

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection',function(socket) {
  console.log('一个用户已进入')
  // 接收数据
  socket.on('update-task', function (params) {
    console.log(params)               
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
        console.log('[UPDATE_TASK_LIST ERROR]:', err.message)
      }
      query(sql.SELECT_TASK_GROUP, (err, result, fields) => {
        if (err) {
          console.log('[SELECT_TASK_GROUP ERROR]:', err.message)
        }
        // 发送数据
        // socket.emit('update-task-callback', result); 
        io.emit('update-task-callback', result);
      })
    })
  });
});


/**
 * 用户登录
 */
app.post('/user/login', (req, res) => {
  const params = req.body;
  console.log(params)
  if(!params.username){
    sendError(res, '用户名称不能为空')
    return
  }
  if(!params.password){
    sendError(res, '密码名称不能为空')
    return
  }
  let username = params.username
  let password = params.password
  let cliendIp = utils.getClientIp(req)
  let csql = eval('`'+sql.USER_LOGIN+'`');
  console.log('[SQL:]', csql);
  query(csql, (err, result, fields) => {
    if (err) {
      console.log('[SELECT ERROR]:', err.message)
      return sendError(res, err.message)
    }
    result = JSON.stringify(result);
    result = JSON.parse(result);
    if(!result.length){
      return sendError(res, '用户信息错误')
    }
    result.map(item=>{
      delete item.password
    })
    let user = result[0];
    var token = jwt.sign(user, app.get('superSecret'), {
      expiresIn : 60*60*24// 授权时效24小时
    });
    user.token = token;
    res.header('x-token', token);

    res.send(user)
  })
})


/**
 * 用户注册
 */
app.post('/user/register', (req, res) => {
  const params = req.body;
  console.log(params)
  if(!params.username){
    sendError(res, '用户名称不能为空')
    return
  }
  if(!params.password){
    sendError(res, '密码名称不能为空')
    return
  }
  if(params.password !== params.password2){
    sendError(res, '两次密码必须相同')
    return
  }
  let username = params.username
  let password = params.password
  let ip = utils.getClientIp(req)
  let date = moment().format('YYYY-MM-DD HH:mm:ss');
  let csql = eval('`'+sql.USER_REGISTER+'`');
  console.log('[SQL:]', csql);
  query(csql, (err, result, fields) => {
    if (err) {
      console.log('[SELECT ERROR]:', err.message)
      return sendError(res, err.message)
    }
    res.send(result)
  })
})

var apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-token'];
  if (token) {      
    // 解码 token (验证 secret 和检查有效期（exp）)
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        sendError(res, 'token已过期', 1000)    
      } else {
        // 如果验证通过，在req中写入解密结果
        req.decoded = decoded;  
        next(); //继续下一步路由
      }
    });
  } else {
    // 没有拿到token 返回错误 
    sendError(res, '请传入token')
  }
})


// 获取所有任务
apiRoutes.get('/task/get-task-list', (req, res) => {
  query(sql.SELECT_TASK_GROUP, (err, result, fields) => {
    if (err) {
      console.log('[SELECT ERROR]:', err.message)
      return sendError(res, err.message)
    }
    res.send(result)
  })
})

/**
 * 添加任务分组
 */
apiRoutes.post('/task/create-task-group', (req, res) => {
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
      return sendError(res, err.message)
    }
    res.send(result)
  })
})

/**
 * 新增/更新任务
 */
apiRoutes.post('/task/update-task', (req, res) => {
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
      return sendError(res, err.message)
    }
    res.send(result)
  })
})


app.use('/', apiRoutes);

http.listen(3000, () => {
  console.log('Server running at 3000 port')
})