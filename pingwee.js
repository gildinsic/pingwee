#!/home/monitor/.nvm/versions/node/v10.7.0/bin/node

var fs = require('fs')
fs.writeFileSync('/run/monitor/monitor.pingwee.pid',process.pid)

const uuid = require('uuid/v4')

var common = require('../common/lib')

var redis = require("redis")
var db = redis.createClient()

var express = require('express')
var app = express()

var https = require('https')
var server = require('../common/whttps')(https,fs,app)

server.setTimeout(10000);

var io = require('socket.io')(server,{pingTimeout:63000});


var nets = {}

var nets00 = { }
var nets24 = { }
var nets32 = { }

var users    = {}
var sessions = {}

var ready = false

var connected = 0

var users24 = {}


var events = require('events');
var watcher = new events.EventEmitter();

function newuser(user) {
  const usr = user.replace(' ','-').replace('@','.')
  const ctx = require('../context/'+user+'/'+usr)
  return { ctx:ctx, sessions:[] }
}

function context(user,session) {
  var newsession = false
  var xuser = users[user]
  if(!xuser) {
    newsession = true
    xuser = users[user] = newuser(user);
    if(!xuser.ctx) { return null; }
  }
  var xsessions = xuser.sessions
  if(newsession || !xsessions.includes(session)) {
    xsessions.push(session);
  }
  return xuser.ctx;
}


// TODO add screen for resolution

const iotrace = true

io.on('connection', function(socket) {
  connected += 1
  socket.on('disconnecting', function (reason) {
    iotrace && console.log('WEBSOCKET DISCOING',socket.id,reason)
  });
  socket.on('disconnect', function (reason) {
    iotrace && console.log('WEBSOCKET DISCO',socket.id,reason)
    connected -= 1
  });
  socket.on('error', function (error) {
    iotrace && console.log('WEBSOCKET ERROR',socket.id,error)
  });
  socket.on('session',function(user,session,screen) {
    iotrace && console.log('WEBSOCKET SESSION',socket.id,user,session,screen)
    const ctx = context(user,session)
    if(!ctx) { return socket.emit('noctx'); }
    const ctx24 = ctx.nets24
    if(!ctx24 || ctx24.length==0) { return socket.emit('nonets'); }
    var tab = { }
    for(var i in ctx24) {
      const ip = ctx24[i]
      socket.join(ip)
      tab[ip] = nets[ip]
      if(!users24[ip]) users24[ip] = { }
      if(!users24[ip][user]) users24[ip][user] = []
      users24[ip][user].push(session)
    }
    socket.emit('nets24',tab);
  })
})


app.all('*',function(req,res,next) {
  if(!ready) { return res.status(503).send('retry later'); }
  next()
})
app.all('*',function (req, res, next) {
  if(req.hostname==="your.server.fr") { return next() ; }
  return res.redirect('https://yourdoc.fr')
})
app.use(function (req, res, next) {
  res.locals.secure = req.secure
  res.locals.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.locals.host = req.hostname
  res.locals.server = req.hostname
  res.locals.port = server.address().port
  res.locals.redirect = 'http:\/\/'+req.hostname
  next()
})
app.use(function (req, res, next) {
  if(req.headers['user-agent'].indexOf('Chrome')>0) { return next() ; }
  console.log('ua chrome')
  return res.redirect(res.locals.redirect)
})
app.use(function (req, res, next) {
  if(req.secure) { return next(); }
  return res.redirect(res.locals.redirect)
})
app.use(function (req, res, next) {
  if(req.client.authorized) { return next(); }
  console.log('auth')
  return res.redirect(res.locals.redirect)
})

const public = __dirname+'/public'

app.get('/favicon.ico', function(req, res) {
  res.sendFile(public+'/favicon.ico')
})
app.get('/404', function(req, res) {
  res.sendFile(public+'/404.html')
})
app.get('/503', function(req, res) {
  res.sendFile(public+'/503.html')
})
app.get('/maintenance', function(req, res) {
  res.sendFile(__dirname+'/public/maintenance.html')
})

app.use('/js' ,express.static(public))
app.use('/img',express.static(public))
app.use('/css',express.static(public))
app.use('/pic',express.static(__dirname+'/../pictos2'))




var session = require('express-session')
app.use(session({ secret: 'YourSecret', saveUninitialized: true, resave: false }))

app.use(function (req, res, next) {
  const cert = req.socket.getPeerCertificate();
  res.locals.user = cert.subject.CN
  res.locals.session = req.session.id
  next()
})


const norm = 30

function dostatsping(x) {

  const last = x.ip.lastIndexOf('.')
  const prefix = x.ip.substring(0,last)+'.0'

  // your ip
  const ipx = (x.ip==='11.22.33.44')

  var net00 = nets00

  var net24 = nets24[prefix]
  if(!net24) net24 = nets24[prefix] = { }

  var net32 = nets32[x.ip]
  if(!net32) net32 = nets32[x.ip] = { }

  if(!net00.ping) {
    net00.ping = { min:norm, moy:norm, max:norm, var:0, mvar:0, count:0, tcount:0 }
  }
  if(!net24.ping) {
    net24.ping = { min:norm, moy:norm, max:norm, var:0, mvar:0, count:0, tcount:0 }
  }
  if(!net32.ping) {
    net32.ping = { min:norm, moy:norm, max:norm, var:0, mvar:0, count:0, tcount:0 }
  }

  net00.uptime = process.uptime()

  net00.last = x
  net24.last = x
  net32.last = x

  net00.ping.tcount += 1
  net24.ping.tcount += 1
  net32.ping.tcount += 1

  const allcount = net00.ping.count
  const netcount = net24.ping.count
  const ipcount  = net32.ping.count

  if(x.rtt && x.rtt<1000 && !x.error) {

  net00.ping.count = allcount+1
  net24.ping.count = netcount+1
  net32.ping.count = ipcount+1

  net00.ping.min = Math.min(net00.ping.min,x.rtt)
  net00.ping.max = Math.max(net00.ping.max,x.rtt)

  net24.ping.min = Math.min(net24.ping.min,x.rtt)
  net24.ping.max = Math.max(net24.ping.max,x.rtt)

  net32.ping.min = Math.min(net32.ping.min,x.rtt)
  net32.ping.max = Math.max(net32.ping.max,x.rtt)

  net00.ping.moy  = (net00.ping.moy*allcount+x.rtt)/net00.ping.count
  net00.ping.var  = Math.abs(net00.ping.moy-x.rtt)
  net00.ping.mvar = (net00.ping.mvar*allcount+net00.ping.var)/net00.ping.count

  net24.ping.moy  = (net24.ping.moy*netcount+x.rtt)/net24.ping.count
  net24.ping.var  = Math.abs(net24.ping.moy-x.rtt)
  net24.ping.mvar = (net24.ping.mvar*netcount+net24.ping.var)/net24.ping.count

  net32.ping.moy  = (net32.ping.moy*ipcount+x.rtt)/net32.ping.count
  net32.ping.var  = Math.abs(net32.ping.moy-x.rtt)
  net32.ping.mvar = (net32.ping.mvar*ipcount+net32.ping.var)/net32.ping.count
  }

  return { ip:net32.ping, net:net24.ping, all:net00.ping, last:x }
}

function dostatstcp(x) {

  const last = x.ip.lastIndexOf('.')
  const prefix = x.ip.substring(0,last)+'.0'

  // your ip
  const ipx = (x.ip==='11.22.33.44')

  var net00 = nets00

  var net24 = nets24[prefix]
  if(!net24) { return; }

  var net32 = nets32[x.ip]
  if(!net32) { return; }

  if(!net00.tcp) {
    net00.tcp = { min:norm, moy:norm, max:norm, var:0, mvar:0, count:0, tcount:0 }
  }
  if(!net24.tcp) {
    net24.tcp = { min:norm, moy:norm, max:norm, var:0, mvar:0, count:0, tcount:0 }
  }
  if(!net32.tcp) {
    net32.tcp = { min:norm, moy:norm, max:norm, var:0, mvar:0, count:0, tcount:0 }
  }

  net00.tcp.tcount += 1
  net24.tcp.tcount += 1
  net32.tcp.tcount += 1

  const allcount = net00.tcp.count
  const netcount = net24.tcp.count
  const ipcount  = net32.tcp.count

  if(x.rtt && x.rtt<1000 && !x.error) {

  net00.tcp.count = allcount+1
  net24.tcp.count = netcount+1
  net32.tcp.count = ipcount+1

  net00.tcp.min  = Math.min(net00.tcp.min,x.rtt)
  net00.tcp.max  = Math.max(net00.tcp.max,x.rtt)

  net24.tcp.min  = Math.min(net24.tcp.min,x.rtt)
  net24.tcp.max  = Math.max(net24.tcp.max,x.rtt)

  net32.tcp.min  = Math.min(net32.tcp.min,x.rtt)
  net32.tcp.max  = Math.max(net32.tcp.max,x.rtt)

  net00.tcp.moy  = (net00.tcp.moy*allcount+x.rtt)/net00.tcp.count
  net00.tcp.var  = Math.abs(net00.tcp.moy-x.rtt)
  net00.tcp.mvar = (net00.tcp.mvar*allcount+net00.tcp.var)/net00.tcp.count

  net24.tcp.moy  = (net24.tcp.moy*netcount+x.rtt)/net24.tcp.count
  net24.tcp.var  = Math.abs(net24.tcp.moy-x.rtt)
  net24.tcp.mvar = (net24.tcp.mvar*netcount+net24.tcp.var)/net24.tcp.count

  net32.tcp.moy  = (net32.tcp.moy*ipcount+x.rtt)/net32.tcp.count
  net32.tcp.var  = Math.abs(net32.tcp.moy-x.rtt)
  net32.tcp.mvar = (net32.tcp.mvar*ipcount+net32.tcp.var)/net32.tcp.count
  }

  return { ip:net32.tcp, net:net24.tcp, all:net00.tcp, last:x }
}




watcher.on('dostatsping2',function(msg) {
  var x;
  try {
    x = JSON.parse(msg)
  } catch(e) {
    return console.log('bad ping parse',msg,e)
  }
  const res = dostatsping(x)
  if(typeof res == 'undefined') { return; }
  if(!res) { return; }
  io.sockets.emit('ping',res)
})
watcher.on('dostatstcp2',function(msg) {
  var x;
  try {
    x = JSON.parse(msg)
  } catch(e) {
    return console.log('bad tcp parse',e)
  }
  const res = dostatstcp(x)
  if(typeof res == 'undefined') { return; }
  if(!res) { return; }
  io.sockets.emit('tcp',res)
})




function network24(ip,tag,rtr,norm) {
  return nets[ip] = { tag:tag, rtr:rtr, norm:norm }
}

var sub = redis.createClient()
sub.on("message", function (channel, message) {
  if(channel==='monitor' && message==='minutely') {
    console.log(new Date().toISOString(),'monitor')
    io.sockets.emit('minutely')
  } else
  if(channel==="network24") {
    const tab = message.split(' ')
    if(tab.length!=4) { return; }
    const ip = tab[0];
    const tag = tab[1];
    const rtr = tab[2];
    const norm = tab[3]
    const noip  = !common.ip24.test(ip)
    const notag = !common.tags.test(tag)
    const nortr = !common.rtrs.test(rtr)
    if(noip || notag || nortr) { return; }
    nets[ip] = { tag:tag, rtr:rtr, norm:norm }
    ready = true
  } else
  if(channel==="ping2") {
    if(!ready) return
    watcher.emit('dostatsping2',message)
  } else
  if(channel==="tcp2") {
    if(!ready) return
    watcher.emit('dostatstcp2',message)
  }
});
sub.subscribe("monitor");
sub.subscribe("network24");
sub.subscribe("ping2");
sub.subscribe("tcp2");


var handlebars = require("express-handlebars")
app.engine('hbs',handlebars({}))
app.set('view engine','hbs')


app.get('/', function(req, res) {
  res.render('index',res.locals)
})
app.get('/prefix', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(nets24))
})
app.get('/ip', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(nets32))
})
app.get('/ip/:ip', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const ip = nets32[req.params.ip]
  console.log('req',req.params.ip)
  const str = JSON.stringify(ip)
  if(typeof str== 'undefined')  { return res.status(404).send('too bad'); }
  console.log('req',req.params.ip,'['+str+']')
  res.send(str)
})
server.listen(3001, function() {
  console.log('Listen 3001');
})


watcher.on('networks',function() {
  db.publish('monitor','networks')
})

db.on('connect', function() {
  console.log('DB connected');
  setTimeout(function() { watcher.emit('networks'); },100)
});

db.on("error",function(err) {
  console.log("--------------------------error redis",err)
})

