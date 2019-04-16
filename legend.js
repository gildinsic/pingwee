var fl = {}

fl.build = function() {

  function e(x) { return "<div class=\"e"+x+" e\"></div>"; }
  function r(x,s) { return "<div class=\"x "+x+"\">"+s+"</div>"; }

  const hx = 'Sur un heure'
  const dx = 'Sur un jour'
  const mx = 'Sur un mois'
  const yx = 'Sur un an'
  const lx = 'Dernier'

  const img   = "<img class=pin src=img/pin.png />"
  const name  = "<div class=name>Réseaux</div>"
  const eyes  = "<div class=eyes>"+e(1)+e(2)+e(3)+e(4)+"</div>"
  const rates = "<div class=rates>"+r('hx',hx)+r('dx',dx)+r('mx',mx)+r('yx',yx)+r('lx',lx)+"</div>"
  const avg   = ""//<div class=avg>Temps moyen</div>"

  const net = document.createElement('div')
  net.innerHTML = img+name+eyes+rates+avg
  net.className = 'net24'
  return net
}

/*
fl.rate = function(networks,x) {
  var nets = []
  const elts = networks.getElementsByClassName(x)
  for(var i=0;i<elts.length;i++) { nets.push(elts[i]); }
  return nets
}
fl.rates = function(legend,networks) {
  const elts = legend.getElementsByClassName('x')
  for(var i=0;i<elts.length;i++) {
    var elt = elts[i]
    elt.networks = this.rate(networks,elt.className.split(' ')[1]);
    elt.onclick = this.toggle(elt)
  }
}
*/

fl.toggle = function(xclass) {
  return function() {
    console.log('toggle1',this.className)
    const idx = xclass.className.indexOf('on')
    for(var i=0;i<xclass.networks.length;i++) {
      const elt = xclass.networks[i]
      console.log('toogle2',idx,i,elt.id,elt.className+'|'+elt.xclassName)
      const cn = elt.xclassName+((idx>0)?'':' on')
      console.log('classname',cn)
      elt.className = cn
      console.log('toogle3',elt.className)
    }
  }
}
fl.prepare = function(legend) {
  console.log('prepare',legend.id)
  legend.classx = legend.getElementsByClassName('x')
  for(var i=0;i<legend.classx.length;i++) {
    const classx = legend.classx[i]
    classx.xclassName = classx.className
    classx.networks = [classx];
    console.log('prepared',classx.className)
    classx.onclick = fl.toggle(classx);
  }
}
fl.new24 = function(legend,net24) {
  console.log('new24',net24.id,legend.classx.length)
  const classx = net24.getElementsByClassName('x')
  for(var i=0;i<legend.classx.length;i++) {
    const elt = classx[i]
    elt.xclassName = elt.className
    console.log('new24 2',elt.id,elt.className,elt.className)
    legend.classx[i].networks.push(elt)
    console.log('nets',i,legend.classx[i].networks.length)
  }
}
