
var ready = false

const sp = '&nbsp;'

function $(x) { return document.getElementById(x); }





var xerrors = $('errors')
xerrors.appendChild( xerrors.all          = div('all','',''))
xerrors.appendChild( xerrors.errors       = div('errors','',''))
xerrors.appendChild( xerrors.emfile       = div('emfile','',''))
xerrors.appendChild( xerrors.etimedout    = div('etimedout','',''))
xerrors.appendChild( xerrors.enetunreach  = div('enetunreach','',''))
xerrors.appendChild( xerrors.ehostunreach = div('ehostunreach','',''))
xerrors.appendChild( xerrors.econnreset   = div('econnreset','',''))
xerrors.appendChild( xerrors.econnrefused = div('econnrefused','',''))

xerrors.all.cnt          = 0
xerrors.errors.cnt       = 0
xerrors.emfile.cnt       = 0
xerrors.etimedout.cnt    = 0
xerrors.enetunreach.cnt  = 0
xerrors.ehostunreach.cnt = 0
xerrors.econnreset.cnt   = 0
xerrors.econnrefused.cnt = 0







var xtcp          = $('tcp')
xtcp.innerHTML    = "<div class=http><div class=value>XXXXX</div><div class=error>ERRRR</div></div>"
xtcp.innerHTML   += "<div class=https><div class=value>YYYYY</div><div class=error>ERRRR</div></div>"

xtcp.style.top    = '0px'
xtcp.style.left   = '0px'
xtcp.style.width  = '200px'
xtcp.style.height = '200px'

xtcp.onmouseover = function(e) {
}



document.onmousemove = function(e) {
  document.xy = { x:e.pageX, y:e.pageY }
}
document.onkeydown = function(evt) {
  document.ctdn = (evt.ctrlKey && evt.keyCode==17)
  console.log('evt',evt)
}
document.onkeyup = function(evt) {
  document.ctdn = (evt.ctrlKey && evt.keyCode==17)
  console.log('evt',evt)
}


var nets24 = null;


const sticky24 = []
const sticky32 = []

const values = {
  min:'min',
  moy:'moy',
  max:'max',
  var:'var',
  last:'last',
  norm:'norm',
//  replay:'replay',
}

function div(x,html,id) {
  var elt = document.createElement('div')
  elt.className = elt.xclassName = x
  if(html) { elt.innerHTML = html; }
  if(id) elt.id = id
  return elt
}



var xmode       = $('mode')
xmode.value     = values.last
xmode.innerHTML = values.last

const xwait     = $('wait')
const xclear    = $('clear')
const xheader   = $('header')


var xsummary = $('summary')
xsummary.className = 'none'

function buildSummary() {

  xsummary.appendChild(xsummary.tcnt = div('summ tcnt','',''))
  xsummary.tcnt.appendChild(document.createElement('div'))
  xsummary.tcnt.appendChild(document.createElement('div'))
  xsummary.tcnt.firstChild.innerHTML = 0
  xsummary.tcnt.lastChild.innerHTML  = 0

  xsummary.appendChild(xsummary.icon = div('icon' ,sp,''))
  xsummary.appendChild(xsummary.tag  = div('tag'  ,sp,''))
  xsummary.appendChild(xsummary.net  = div('net'  ,sp,''))
  xsummary.appendChild(xsummary.rtr  = div('rtr'  ,sp,''))
  xsummary.appendChild(xsummary.ip   = div('ip'   ,sp,''))

  xsummary.appendChild(xsummary.cnt = div('summ cnt','',''))
  xsummary.cnt.appendChild(document.createElement('div'))
  xsummary.cnt.appendChild(document.createElement('div'))
  xsummary.cnt.firstChild.innerHTML  = 'Echantillon'
  xsummary.cnt.lastChild.innerHTML   = 0

  xsummary.appendChild(xsummary.last = div('summ last','',''))
  xsummary.last.appendChild(document.createElement('div'))
  xsummary.last.appendChild(document.createElement('div'))
  xsummary.last.firstChild.innerHTML = 'Dernier'
  xsummary.last.lastChild.innerHTML  = sp

  xsummary.appendChild(xsummary.min  = div('summ min' ,'',''))
  xsummary.min.appendChild(document.createElement('div'))
  xsummary.min.appendChild(document.createElement('div'))
  xsummary.min.firstChild.innerHTML  = 'Minimum'
  xsummary.min.lastChild.innerHTML   = 0

  xsummary.appendChild(xsummary.moy  = div('summ moy' ,'',''))
  xsummary.moy.appendChild(document.createElement('div'))
  xsummary.moy.appendChild(document.createElement('div'))
  xsummary.moy.firstChild.innerHTML  = 'Moyenne'
  xsummary.moy.lastChild.innerHTML   = 0

  xsummary.appendChild(xsummary.max  = div('summ max' ,'',''))
  xsummary.max.appendChild(document.createElement('div'))
  xsummary.max.appendChild(document.createElement('div'))
  xsummary.max.firstChild.innerHTML  = 'Maximum'
  xsummary.max.lastChild.innerHTML   = 0

  xsummary.appendChild(xsummary.var  = div('summ var' ,'',''))
  xsummary.var.appendChild(document.createElement('div'))
  xsummary.var.appendChild(document.createElement('div'))
  xsummary.var.firstChild.innerHTML  = 'Variation'
  xsummary.var.lastChild.innerHTML   = 0

  xsummary.appendChild(xsummary.mvar = div('summ mvar','',''))
  xsummary.mvar.appendChild(document.createElement('div'))
  xsummary.mvar.appendChild(document.createElement('div'))
  xsummary.mvar.firstChild.innerHTML = 'Ecart-type'
  xsummary.mvar.lastChild.innerHTML  = 0

  xsummary.appendChild(xsummary.err  = div('summ err' ,'',''))
  xsummary.err.appendChild(document.createElement('div'))
  xsummary.err.appendChild(document.createElement('div'))
  xsummary.err.firstChild.innerHTML  = sp
  xsummary.err.lastChild.innerHTML   = sp
}

buildSummary()



function clearSummary() {

  xsummary.className     = ' none'
  xsummary.tag.innerHTML = sp
  xsummary.net.innerHTML = sp
  xsummary.rtr.innerHTML = sp
  xsummary.ip.innerHTML  = sp

  xsummary.cnt.lastChild.innerHTML  = sp
  xsummary.last.lastChild.innerHTML = sp
  xsummary.min.lastChild.innerHTML  = sp
  xsummary.moy.lastChild.innerHTML  = sp
  xsummary.max.lastChild.innerHTML  = sp
  xsummary.var.lastChild.innerHTML  = sp
  xsummary.mvar.lastChild.innerHTML = sp
  xsummary.err.firstChild.innerHTML = sp
  xsummary.err.lastChild.innerHTML  = sp
}

function showAllSummary() {

  var net = xnetworks

  const error = (net.last && net.last.error)
  var str = ' x00'+(error?' error':' noerror')
  xsummary.className      = net.tag + str

  xsummary.tag.innerHTML  = sp
  xsummary.net.innerHTML  = sp
  xsummary.rtr.innerHTML  = sp

  if(!net.ping || !net.ping.min) {
  xsummary.className     += ' none'
  return
  }

  xsummary.cnt.lastChild.innerHTML  = net.ping.count
  if(net.pingcount==0) {
  xsummary.className     += ' zero'
  }

  if(net.last)
  xsummary.last.lastChild.innerHTML = net.last.rtt+' ms'

  xsummary.min.lastChild.innerHTML  = net.ping.min
  xsummary.moy.lastChild.innerHTML  = net.ping.moy.toFixed(1)
  xsummary.max.lastChild.innerHTML  = net.ping.max

  xsummary.var.lastChild.innerHTML  = net.ping.var.toFixed(1)
  xsummary.mvar.lastChild.innerHTML = net.ping.mvar.toFixed(1)

  xsummary.err.firstChild.innerHTML = error?net.last.error.message:sp
  xsummary.err.lastChild.innerHTML  = error?net.last.rtt+' ms':sp
}

function showNetSummary(net) {

  var ping = net.ping
  if(!ping) {
    xsummary.className += ' none'
    return
  }

  const error = (ping.last && ping.last.error)
  var str = ' x24'+(error?' error':' noerror')
  xsummary.className = net.me.tag + str

//  console.log('snetsum',net)
//  console.log('snetsum2',net.me)

  xsummary.tag.innerHTML  = net.me.tag
  xsummary.net.innerHTML  = net.xid
  xsummary.rtr.innerHTML  = net.me.rtr

  xsummary.cnt.lastChild.innerHTML  = ping.count

  xsummary.last.lastChild.innerHTML = ping.last.rtt+' ms'

  xsummary.min.lastChild.innerHTML  = ping.min
  xsummary.moy.lastChild.innerHTML  = ping.moy.toFixed(1)
  xsummary.max.lastChild.innerHTML  = ping.max

  xsummary.var.lastChild.innerHTML  = ping.var.toFixed(1)
  xsummary.mvar.lastChild.innerHTML = ping.mvar.toFixed(1)

  xsummary.err.firstChild.innerHTML = error?ping.last.error.message:sp
  xsummary.err.lastChild.innerHTML  = error?ping.last.rtt+' ms':sp
}

function showIPSummary(ip) {

  var ping = ip.ping
  if(!ping) {
    xsummary.className += ' none'
    return
  }

  const error = (ping.last && ping.last.error)
  var str = ' x32'+(error?' error':' noerror')
  xsummary.className = ip.net.tag + str

  xsummary.tag.innerHTML = ip.net.tag
  xsummary.net.innerHTML = ip.parentNode.xid
  xsummary.rtr.innerHTML = ip.net.rtr
  xsummary.ip.innerHTML  = ip.id

  xsummary.cnt.lastChild.innerHTML  = ping.count

  xsummary.last.lastChild.innerHTML = ping.last.rtt+' ms'

  xsummary.min.lastChild.innerHTML  = ping.min
  xsummary.moy.lastChild.innerHTML  = ping.moy.toFixed(1)
  xsummary.max.lastChild.innerHTML  = ping.max

  xsummary.var.lastChild.innerHTML  = ping.var.toFixed(1)
  xsummary.mvar.lastChild.innerHTML = ping.mvar.toFixed(1)

  xsummary.err.firstChild.innerHTML = error?ping.last.error.message:sp
  xsummary.err.lastChild.innerHTML  = error?ping.last.rtt+' ms':sp
}






var xnetworks  = $('networks')



var joined24 = {}


var nets24 = []
var nets32 = []

function buildip32(ip,j) {

  const net32 = div('net32 ip'+j,'',ip+'.'+j)
  net32.me = ip+'.0/24'

  var eping = div('ping','','')
  var etcp  = div('tcp','','')

  net32.eping = eping
  net32.etcp  = etcp

  net32.appendChild(eping)
  net32.appendChild(etcp)

  net32.onclick = function(e) {
    const idx = sticky32.indexOf(this.id)
    if(idx!=-1) { sticky32.splice(idx,1); } else { sticky32.push(this.id); }
    e.stopPropagation()
  }
  net32.onmouseenter = function(e) {
    showIPSummary(this)
    e.stopPropagation()
  }
  net32.onmouseleave = function(e) {
    e.stopPropagation()
  }
  return net32
}
function buildNetTab(net) {
  net.tab = []
  for(var j=0; j<256; j++) {
    var net32 = buildip32(net.id,j)
    net32.net = net.me
    net.appendChild(net32)
    net.tab.push(net32)
    nets32.push(net32)
  }
}
function buildNet(ip) {

  const net = div('net24','',ip.slice(0,-2))

  net.xid = ip+'/24'
  net.me = nets24[ip]

//  console.log('bnet',net)
//  console.log('bnet',net.me)

  const name = div('name',net.me.tag,'')
  net.appendChild(name)

  buildNetTab(net)

  const count = div('count',sp,'')
  net.count = count
  net.appendChild(count)

  const lcount = div('count',sp,'')
  net.lcount = lcount
  net.appendChild(lcount)

  const pin = div('pin','X','')
  pin.onclick = function(elt) {
    return function(e) {
      elt.className += ' off'
      e.stopPropagation()
    }
  }(net)

  net.appendChild(pin)

  net.onclick = function(e) {
    const idx = sticky24.indexOf(this.id)
    if(idx!=-1) { sticky24.splice(idx,1); } else { sticky24.push(this.id); }
    e.stopPropagation()
  }
  net.onmouseenter = function(e) {
    showNetSummary(this)
    e.stopPropagation()
  }
  net.onmouseleave = function(e) {
    showAllSummary()
    e.stopPropagation()
  }

  return net
}
function buildNets(nets) {
  nets24 = nets
  //console.log('nets',nets)
  if(!nets) return
  for(var ip in nets) {
    const net = nets[ip]
    //console.log('Build nets :',ip,net)
    if(!ip24.test(ip)) { continue; }
    //console.log('Build nets2 :',ip,net)
    var elt = buildNet(ip)
    if(!elt) { continue; }
    xnetworks.appendChild(elt)
  }
}









xclear.innerHTML = "<i class='fa fa-sync fa-lg'/>"

xclear.onclick = function() {
  socket.emit('session',user,session)
  xnetworks.innerHTML = ''
}

xmode.onclick = function() {
  switch(this.value) {
  case values.min:  this.value = values.max;  break;
  case values.max:  this.value = values.moy;  break;
  case values.moy:  this.value = values.var;  break;
  case values.var:  this.value = values.last; break;
  case values.last: this.value = values.norm; this.nets32 = nets32; break;
  case values.norm: this.value = values.min;  break;
  default: this.value = values.last;
  }
  this.innerHTML = this.value
}





const screen = null

const ip24 = /^(?:(?:1?\d{1,2}|2[0-4]\d|25[0-5])\.){3}0/

socket.on('connect',function() {
  //console.log('Socket connected is :',socket.id,screen)
  socket.emit('session',user,session,screen)
  xnetworks.innerHTML = ''
})
socket.on('nets24',function(nets) {
  console.log('Socket nets24 :',nets)
  if(!nets) return
  new Promise(function(resolve,reject) {
    resolve(0)
  }).then(function(result) {
    buildNets(nets,)
    setTimeout(function() {
      xwait.className = 'connected';
      ready = true
    },10*000)
  })
})
socket.on('disconnect',function() {
  console.log('disconnected',Date.now())
  xwait.className = sp;
  ready = false
})


function viewstatus(status) {
  var v = 'grey'
  switch(status) {
    case 0: v = 'grey';    break;
    case 1: v = 'green';   break;
    case 2: v = 'orange1'; break;
    case 3: v = 'orange2'; break;
    case 4: v = 'orange3'; break;
    case 5: v = 'red';     break;
    default: break;
  }
  return v
}

function rttstatus(rtt,ref) {
  if(rtt > 16*ref) { return 5; }
  if(rtt >  8*ref) { return 4; }
  if(rtt >  4*ref) { return 3; }
  if(rtt >  2*ref) { return 2; }
  return 1;
}

function pingstatus(elt) {
    //console.log('pingstatus',elt)
    const last = elt.ping.last
    if(last && last.error && last.error.name==='RequestTimedOutError') { return 0; }
    if(last && last.error) { return 5; }
    switch(xmode.value) {
    case values.min:  return rttstatus(last.rtt ,elt.ping.min)
    case values.max:  return rttstatus(last.rtt ,elt.ping.max)
    case values.moy:  return rttstatus(last.rtt ,elt.ping.moy)
    case values.var:  return rttstatus(elt.ping.var,elt.ping.mvar)
    case values.last: return rttstatus(last.rtt ,elt.prev)
    case values.norm: return rttstatus(last.rtt ,elt.norm)
    default: break;
    }
  return 5;
}
function tcpstatus(elt) {
    //console.log('tcpstatus',elt)
    if(!elt.tcp) return 0
    const last = elt.tcp.last
// yourip
    if(last.error && last.ip==="11.22.33.44") console.log('tcpstatus',elt,last.error)
//    if(last && last.error && last.error.name==='RequestTimedOutError') { return 0; }
    if(last && last.error) { return 0; }
    switch(xmode.value) {
    case values.min:  return rttstatus(last.rtt ,elt.tcp.min)
    case values.max:  return rttstatus(last.rtt ,elt.tcp.max)
    case values.moy:  return rttstatus(last.rtt ,elt.tcp.moy)
    case values.var:  return rttstatus(elt.tcp.var,elt.tcp.mvar)
    case values.last: return rttstatus(last.rtt ,elt.prev)
    case values.norm: return rttstatus(last.rtt ,elt.norm)
    default: break;
    }
  return 5;
}

function dopingipstatus(elt,x,last) {
  if(!elt) { return; }
  if(!x || !last) { return; }
  elt.ping = x
  elt.ping.last = last
  elt.ping.moy = parseFloat(x.moy)
}
function dopingnetstatus(net,x,last) {
  if(!net) { return; }
  if(!x || !last) { return; }
  net.ping = x
  net.ping.last = last
  net.ping.moy = parseFloat(x.moy)
  net.count.innerHTML = x.count
  net.lcount.innerHTML = x.tcount
}
function dopingallstatus(elt,x,last) {
  if(!elt) { return; }
  if(!x || !last) { return; }
  elt.ping = x
  elt.ping.last = last
  elt.ping.moy = parseFloat(x.moy)
}



function dotcpipstatus(elt,x,last) {
  if(!elt) { return; }
  if(!x || !last) { return; }
  elt.tcp = x
  elt.tcp.last = last
  elt.tcp.moy = parseFloat(x.moy)
}
function dotcpnetstatus(net,x,last) {
  if(!net) { return; }
  if(!x || !last) { return; }
  net.tcp = x
  net.tcp.last = last
  net.tcp.moy = parseFloat(x.moy)
  //net.count.innerHTML = x.count
  //net.tcount.innerHTML = x.tcount
}
function dotcpallstatus(elt,x,last) {
  if(!elt) { return; }
  if(!x || !last) { return; }
  elt.tcp = x
  elt.tcp.last = last
  elt.tcp.moy = parseFloat(x.moy)
}


var cnt = 0

function dopingstatus(elt,x,xx,xxx,last) {
//yourip
  if(elt.id==="11.22.33.44") {
    //console.log('dopingstatus',elt.id,x,xx,xxx,last);
  }
  xsummary.tcnt.firstChild.innerHTML = xxx.tcount
  xsummary.tcnt.lastChild.innerHTML  = xxx.count

  dopingipstatus(elt,x,last)
  dopingnetstatus(elt.parentNode,xx,last)
  dopingallstatus(xnetworks,xxx,last)

  const status = viewstatus(pingstatus(elt))
  //elt.className = elt.xclassName+' '+status
  elt.eping.className = 'ping '+status

  graphDataPing(pingGraph,xnetworks.ping)
  graphDataVar(varGraph,xnetworks.ping)
}
function dotcpstatus(elt,x,xx,xxx,last) {
// yourip
  if(elt.id==="11.22.33.44") {
    //console.log('dotcpstatus',elt.id,x,xx,xxx,last);
  }
  dotcpipstatus(elt,x,last)
  dotcpnetstatus(elt.parentNode,xx,last)
  dotcpallstatus(xnetworks,xxx,last)

  if(last.error) {
    var eelt
    switch(last.error) {
    case 'EMFILE':       eelt = errors.emfile       ; break
    case 'ETIMEDOUT':    eelt = errors.etimedout    ; break
    case 'ENETUNREACH':  eelt = errors.enetunreach  ; break
    case 'EHOSTUNREACH': eelt = errors.ehostunreach ; break
    case 'ECONNRESET':   eelt = errors.econnreset   ; break
    case 'ECONNREFUSED': eelt = errors.econnreset   ; break
    default: console.log('---------------------')
    }
    errors.errors.innerHTML = errors.errors.cnt++
    eelt.innerHTML = eelt.cnt++
  }
  errors.all.innerHTML = errors.all.cnt++

  const status = viewstatus(tcpstatus(elt))
  //elt.className = elt.xclassName+' '+status
  elt.etcp.className = 'tcp '+status

  switch(last.port) {
  case  80: graphDataTcp80(tcp80Graph,xnetworks.tcp); break;
  case 443: graphDataTcp443(tcp443Graph,xnetworks.tcp); break;
  default:
  }
}



socket.on('ping',function(x) {
  if(typeof x == 'undefined') { return console.log('really bad ping',x); }
  if(!ready || !x.all || !x.net || !x.ip) { return; }
  if(!x.last || !x.last.ip) { return; }
  //if(x.last.ip=="185.24.185.114") { console.log('ping',x); }
  //console.log('ping',x.last.ip)
  const ip = x.last.ip
  dopingstatus($(ip),x.ip,x.net,x.all,x.last)
})
socket.on('tcp',function(x) {
  if(typeof x == 'undefined') { return console.log('really bad tcp',x); }
  if(!ready || !x.all || !x.net || !x.ip) { return; }
  if(!x.last || !x.last.ip) { return; }
  //if(x.last.ip=="185.24.185.114") { console.log('tcp',x); }
  //console.log('tcp',x)
  const ip = x.last.ip
  dotcpstatus($(ip),x.ip,x.net,x.all,x.last)
})




var minutes = 0

socket.on('minutely',function() {
  if(!ready) { return; }
  console.log('Minutes',minutes++)
})

socket.on('noctx',function() {
  console.log('noctx')
})
socket.on('nonets',function() {
  console.log('nonets')
})
socket.on('nonet',function(pfx) {
  console.log('nonet',pfx)
})

