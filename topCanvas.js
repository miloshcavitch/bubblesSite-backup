var elTiempo = new Date();
var topCanvas = document.getElementById('top-canvas');
var topctx = topCanvas.getContext('2d');

var oppositeCornerDX = -0.2;
var oppositeCornerDY = -0.2;
var topEmitter = {x: topCanvas.width +1000, y: topCanvas.height+ 500};//before it was -100, 30
var particles = [];
var topParticle = function(){
  this.x = topEmitter.x;
  this.y = topEmitter.y;
  this.dx = 5 - Math.random() * 10;
  this.dy = 5 - Math.abs(this.dx);
  if (Math.random() <= 0.5){
    this.dy *= -1;
  }
  this.ddx = 0.3 - Math.random() * 0.6;
  this.ddy = 0.3 - Math.random() * 0.6;
  this.size = 1 + Math.random() * 1.5;
  this.dSize = 0.5 + Math.random() * 0.3;
  this.alpha = 0.45;
  this.draw = function(){
    this.dx += this.ddx;

    this.x += this.dx;
    this.dy += this.ddy + oppositeCornerDY;
    this.y += this.dy;
    this.size += this.dSize;
    this.alpha -= 0.005;
    topctx.beginPath();
    topctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    topctx.fillStyle = 'white'
    topctx.globalAlpha = this.alpha;
    topctx.fill();
  }
}
var updateTopParticles = function(){
  particles.push(new topParticle);
  for (var i = 0; i < particles.length; i++){
    particles[i].draw();
    if (particles[i].alpha <= 0.05){
      particles[i].alpha = 0.05;
    }
    if (particles[i].size > 400){
      particles[i].size = 400;
    }
    if (particles[i].x >= topCanvas.width +1000 || particles[i].x <= -1000){
      particles.splice(i, 1);
    }
    if (particles[i].y >= topCanvas.height + 1000 || particles[i].y <= -1000){
      particles.splice(i, 1);
    }
  }
  topctx.globalAlpha = 1;
}

var color = 0;
var destinationColor = Math.floor(Math.random() * 360);
var testWindowSize = function(){
  if (topCanvas.width != window.innerWidth){
    topCanvas.width = window.innerWidth;
    topEmitter.x = topCanvas.width + 100;
    $('#itemTitle').css("left", topCanvas.width/4)
    updateBounds();
  }
  if (topCanvas.height != window.innerHeight){
    topCanvas.height = window.innerHeight;
    topEmitter.y = topCanvas.height + 30;
    updateBounds();
  }
}

var updateTopCanvas = function(){
  topctx.clearRect(0,0,topCanvas.width,topCanvas.height);
  topctx.fillStyle = "hsl(" + color + ", 100%, 20%)";
  topctx.fillRect(0,0,topCanvas.width,topCanvas.height);

  updateTopParticles();
}
//////////////////////////////////
/////////////////////////////////
var lastCircleChange = elTiempo.getTime();
var timeInterval = 5000;
var circles = [];
var tL = $('#itemTitle').offset();
var circleBounds = {xLeft: topCanvas.width/5, xRight: topCanvas.width - topCanvas.width/5, yTop: tL.top, yBottom: topCanvas.height - topCanvas.height/5};
var updateBounds = function(){
  var lastWidth = circleBounds.xRight - circleBounds.xLeft;
  circleBounds.xLeft = topCanvas.width/5;
  circleBounds.xRight = topCanvas.width - topCanvas.width/5;
  var newWidth = circleBounds.xRight - circleBounds.xLeft
  var titleLoc = $('#itemTitle').offset()
  circleBounds.yTop = titleLoc.top - 100;
  circleBounds.yBottom = circleBounds.yTop + 300;
  var newHeight = circleBounds.yBottom - circleBounds.yTop;
  desiredCircleArea = (newHeight * newWidth)/1000;
  circles.forEach(function(c){//maintains responsiveness
    c.x = c.x * (newWidth/lastWidth);
  })

}
var WindowCircle = function(){
  this.x = (Math.random() * (circleBounds.xRight -circleBounds.xLeft)) + circleBounds.xLeft;
  this.y = (Math.random() * (circleBounds.yBottom - circleBounds.yTop)) + circleBounds.yTop;
  var maxSize = desiredCircleArea/10;
  this.finalSizeX =  Math.random() * 75;
  if (this.x + this.finalSizeX > circleBounds.xRight - this.finalSizeX){
    this.x = circleBounds.xRight - this.finalSizeX;
  }
  this.finalSizeY = Math.random() * 75;
  if (this.y + this.finalSizeY > circleBounds.yBottom - this.finalSizeY){
    this.y = circleBounds.yBottom - this.finalSizeY;
  }
  this.currentSizeX = 0;
  this.currentSizeY = 0;
  this.growthSpeedX = this.finalSizeX / 30;
  this.growthSpeedY = this.finalSizeY / 30;
  this.draw = function(){
    topctx.beginPath();
    topctx.fillStyle = 'black';
    topctx.arc(this.x,this.y,this.currentSizeX,0,Math.PI * 2);
    topctx.fill();
    //topctx.fillRect(this.x,this.y,this.currentSizeX,this.currentSizeY);
    topctx.closePath();
  }
}
for (var i = 0; i < 70; i++){
  circles.push(new WindowCircle());
}

var desiredCircleArea = 400;//to be changed l8r
var rePopulateCircles = function(){
  var circleArea = 0;
  var i = 0;
  while (circleArea < desiredCircleArea){
    circles.push(new WindowCircle());
    circleArea += circles[i].finalSizeX;
    i++
  }
  console.log("Final Count: " + circleArea);

}

var activeMode = function(){
  changeOverUp();
}
var changeOverDown = function(){
  sendOut();
  for (var i = 0; i < circles.length; i++){
    if (circles[i].currentSizeX > 0 ){
      circles[i].currentSizeX -= circles[i].growthSpeedX;
      circles[i].currentSizeY -= circles[i].growthSpeedY;
    }
    if (circles[i].currentSizeX <= 0){
      circles.splice(i, 1);
    }
  }
  if (circles.length === 0){
    sendIn();
    activeMode = function(){
      tweenOver();
    }
  }
}
var tweenOver = function(){
  setTimeout(function(){
    rePopulateCircles();
    activeMode = function(){
      changeOverUp()
    }
  }, 100);
}
var frameUpCount = 0;
var changeOverUp = function(){
  destinationColor = Math.floor(Math.random() * 180);//gonna change this to be a better color blend
  frameUpCount++;
  circles.forEach(function(c){
    if (c.currentSizeX > c.finalSizeX){
      c.currentSizeX = c.finalSizeX;
      c.currentSizeY = c.finalSizeY;
    } else {
      c.currentSizeX += c.growthSpeedX;
      c.currentSizeY += c.growthSpeedY;
    }
  });
  if (frameUpCount === 30){
    lastCircleChange = elTiempo.getTime();
    activeMode = function(){
      checkTimer(elTiempo.getTime());
    }
    frameUpCount = 0;
  }
}

var checkTimer = function(millis){
  if (millis >= lastCircleChange + timeInterval){
    sendOut();
    activeMode = function(){
      changeOverDown();
    }
  }
}

var renderBubbles = function(){
  circles.forEach(function(c){
    c.draw();
  });
}
var checkColor = function(){
  if (Math.abs(color - destinationColor ) > 10){
    color+= 5;
  }
  if (color >= 360){
    color = 360 - color;
  }
}
var update = function(){
  elTiempo = new Date();
  activeMode();
  testWindowSize();
  checkColor();
  updateTopCanvas();
  renderBubbles();
}

setInterval(update, 25);
