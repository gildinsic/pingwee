
const color = {
  black: 'rgb(0, 0, 0)',
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};



var pingDatasetDer = {
  label: 'Dernier PING',
  fill: false,
  showLine: false,
  lineTension: 0,
  borderWidth: 0,
  pointRadius: 0.8,
  pointBorderColor: color.black,
  pointBackgroundColor: color.grey,
  data: [ ],
}
var pingDatasetMoy = {
  label: 'Moyenne PING',
  fill: false,
  showLine: true,
  lineTension: 0,
  pointRadius: 0,
  borderWidth: 0.3,
  borderColor: color.blue,
  data: [ ],
}
var pingDatasetVar = {
  label: 'Variation PING',
  fill: false,
  showLine: true,
  pointRadius: 0,
  borderWidth: 0.4,
  borderColor: color.red,
  data: [ ],
}
var xAxePing = [{
  display: false,
  scaleLabel: { display:false, labelString: 'Ping' },
}]
var yAxePing = [{
  display: true,
  scaleLabel: { display: true, labelString: 'RTT' },
  gridLines: { display:false },
  drawTicks: false,
  ticks: { min:0, max:80 }
}]
var pingConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [ pingDatasetDer, pingDatasetMoy, pingDatasetVar ],
  },
  options: {
    title: { display: false },
    animation: { duration: 0 },
    responsiveAnimationDuration: 0,
    responsive: true,
    maintainAspectRatio: false,
    tooltips: { enabled: false },
    scales: { xAxes: xAxePing, yAxes: yAxePing },
    elements: { point: { pointStyle: 'circle' } },
  }
}
var pingMod = 0
function graphDataPing(elt,x) {
  if(x.last.error) { return; }
  if(x.last.rtt>=1000) { return; }
  pingMod = pingMod+1
  if(pingMod!=4) { return; }
  pingMod = 0
  var data = pingConfig.data
  const rotate = (data.labels.length>1000)
  data.labels.push(0)
  data.datasets[0].data.push(x.last.rtt)
  data.datasets[1].data.push(x.moy)
  data.datasets[2].data.push(x.var)
  if(rotate) {
  data.labels.shift()
  data.datasets[0].data.shift()
  data.datasets[1].data.shift()
  data.datasets[2].data.shift()
  }
  elt.update();
}







var xAxeTcp = [{
  display: false,
  scaleLabel: { display:false, labelString: 'TCP' },
}]
var yAxeTcp = [{
  display: true,
  scaleLabel: { display: false, labelString: 'RTT' },
  gridLines: { display:false },
  drawTicks: false,
  ticks: { min:0, max:80 }
}]



var tcpDatasetDer80 = {
  label: 'Dernier TCP 80',
  fill: false,
  showLine: false,
  lineTension: 0,
  borderWidth: 0,
  pointRadius: 0.8,
  pointBorderColor: color.black,
  //pointBackgroundColor: color.grey,
  data: [ ],
}
var tcpDatasetMoy80 = {
  label: 'Moyenne TCP 80',
  fill: false,
  showLine: true,
  lineTension: 0,
  pointRadius: 0,
  borderWidth: 0.3,
  borderColor: color.blue,
  data: [ ],
}
var tcpDatasetVar80 = {
  label: 'Varition TCP 80',
  fill: false,
  showLine: true,
  pointRadius: 0,
  borderWidth: 0.4,
  borderColor: color.red,
  data: [ ],
}
var tcp80Config = {
  type: 'line',
  data: {
    labels: [],
    datasets: [ tcpDatasetDer80, tcpDatasetMoy80, tcpDatasetVar80 ],
  },
  options: {
    title: { display: false },
    animation: { duration: 0 },
    responsiveAnimationDuration: 0,
    responsive: true,
    maintainAspectRatio: false,
    tooltips: { enabled: false },
    scales: { xAxes: xAxeTcp, yAxes: yAxeTcp },
    elements: { point: { pointStyle: 'circle' } },
  }
}
var tcpMod80 = 0
function graphDataTcp80(elt,x) {
  if(x.last.error) { return; }
  if(x.last.rtt>=1000) { return; }
  tcpMod80 = tcpMod80+1
  if(tcpMod80!=4) { return; }
  tcpMod80 = 0
  var data = tcp80Config.data
  const rotate = (data.labels.length>1000)
  data.labels.push(0)
  data.datasets[0].data.push(x.last.rtt)
  data.datasets[1].data.push(x.moy)
  data.datasets[2].data.push(x.var)
  if(rotate) {
  data.labels.shift()
  data.datasets[0].data.shift()
  data.datasets[1].data.shift()
  data.datasets[2].data.shift()
  }
  elt.update();
}




var tcpDatasetDer443 = {
  label: 'Dernier TCP 443',
  fill: false,
  showLine: false,
  lineTension: 0,
  borderWidth: 0,
  pointRadius: 0.8,
  pointBorderColor: color.black,
  //pointBackgroundColor: color.grey,
  data: [ ],
}
var tcpDatasetMoy443 = {
  label: 'Moyenne TCP 443',
  fill: false,
  showLine: true,
  lineTension: 0,
  pointRadius: 0,
  borderWidth: 0.3,
  borderColor: color.blue,
  data: [ ],
}
var tcpDatasetVar443 = {
  label: 'Varition TCP 443',
  fill: false,
  showLine: true,
  pointRadius: 0,
  borderWidth: 0.4,
  borderColor: color.green,
  data: [ ],
}
var tcp443Config = {
  type: 'line',
  data: {
    labels: [],
    datasets: [ tcpDatasetDer443, tcpDatasetMoy443, tcpDatasetVar443 ],
  },
  options: {
    title: { display: false },
    animation: { duration: 0 },
    responsiveAnimationDuration: 0,
    responsive: true,
    maintainAspectRatio: false,
    tooltips: { enabled: false },
    scales: { xAxes: xAxeTcp, yAxes: yAxeTcp },
    elements: { point: { pointStyle: 'circle' } },
  }
}
var tcpMod443 = 0
function graphDataTcp443(elt,x) {
  if(x.last.error) { return; }
  if(x.last.rtt>=1000) { return; }
  tcpMod443 = tcpMod443+1
  if(tcpMod443!=4) { return; }
  tcpMod443 = 0
  var data = tcp443Config.data
  const rotate = (data.labels.length>1000)
  data.labels.push(0)
  data.datasets[0].data.push(x.last.rtt)
  data.datasets[1].data.push(x.moy)
  data.datasets[2].data.push(x.var)
  if(rotate) {
  data.labels.shift()
  data.datasets[0].data.shift()
  data.datasets[1].data.shift()
  data.datasets[2].data.shift()
  }
  elt.update();
}






var varDataset = {
  label: 'Variation',
  fill: false,
  showLine: true,
  pointRadius: 0,
  borderWidth: 0.5,
  borderColor: 'rgba(255,255,255,1)',
  data: [ ],
}
var xAxeVar = [{
  display: false,
  scaleLabel: { display:false, labelString: 'Temps' },
}]
var yAxeVar = [{
  display: true,
  scaleLabel: { display: true, labelString: 'RTT' },
  gridLines: { display:false },
  drawTicks: false,
  ticks: { min:0, max:200 }
}]
var varConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [ varDataset ],
  },
  options: {
    title: { display: false },
    legend: { display: false },
    animation: { duration: 0 },
    responsiveAnimationDuration: 0,
    responsive: true,
    maintainAspectRatio: false,
    tooltips: { enabled: false },
    scales: { xAxes: xAxeVar, yAxes: yAxeVar },
    elements: { point: { pointStyle: 'circle' } },
  }
}
var varMod = 0
function graphDataVar(elt,x) {
  if(x.last.error) { return; }
  if(x.last.rtt>=1000) { return; }
  varMod = varMod+1
  if(varMod!=4) { return; }
  varMod = 0
  var data = varConfig.data
  const rotate = (data.labels.length>10000)
  data.labels.push(0)
  data.datasets[0].data.push(x.var)
  if(rotate) {
  data.labels.shift()
  data.datasets[0].data.shift()
  }
  elt.update();
}




window.onload = function() {
  var ctx;

  ctx = $('pinggraph').getContext('2d');
  window.pingGraph = new Chart(ctx,pingConfig);

  ctx = $('tcp80graph').getContext('2d');
  window.tcp80Graph = new Chart(ctx,tcp80Config);

  ctx = $('tcp443graph').getContext('2d');
  window.tcp443Graph = new Chart(ctx,tcp443Config);

  ctx = $('variation').getContext('2d');
  window.varGraph = new Chart(ctx,varConfig);
}




