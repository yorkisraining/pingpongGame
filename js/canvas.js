var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
}

var pingpong= {};
pingpong.Keys = {};

var ball;
var paddleLeft;
var paddleRight;

var lastTime,
	deltaTime;
	
var scoreRight;
var scoreLeft;

var cxt = document.getElementById('canvas').getContext('2d');

$(function() {
	//初始化
	game();
	
	//记录pressedkyes数组里某键状态是按下还是放开
	//按下为true, 放开false
	$(document).keydown(function(e) {
		pingpong.Keys[e.which] = true;
	});
	$(document).keyup(function(e) {
		pingpong.Keys[e.which] = false;
	});
	
	var reset = document.getElementById("resetbtn");
	reset.onclick = function() {
		window.location.reload(true);
	}
});

function game() {
	var btn = document.getElementById("btn");
	btn.onclick = function() {
		btn.style.display = 'none';
		init();
		gameloop();
	}
}

function init() {
	//清空画布
	cxt.clearRect(0, 0, 1200, 600);
	//画球
	ball = new ballObj();
	ball.init();
	ball.draw();
	//画球拍
	paddleLeft = new paddleLeftObj();
	paddleLeft.init();
	paddleLeft.draw();
	paddleRight = new paddleRightObj();
	paddleRight.init();
	paddleRight.draw();
	
	
	scoreLeft = 0;
	
	scoreRight = 0;
	score();
}

function gameloop() {
	window.requestAnimationFrame(gameloop);
	var now = Date.now()
	deltaTime = now - lastTime;
	lastTime = now;
	if (deltaTime > 40) {
		deltaTime = 40;
	}
	
	ball.move();
	ball.draw();
	paddleLeft.move();
	paddleLeft.draw();
	paddleRight.move();
	paddleRight.draw();
}

//ball
var ballObj = function() {
	this.x;
	this.y;
	this.r;
	this.speed;
	this.direcX;
	this.direcY;
}

ballObj.prototype.init = function() {
	cxt.clearRect(0, 0, 1200, 600);
	this.x = 600;
	this.y = 350;
	this.r = 20;
	this.speed = 8;
	this.direcX = 1;
	this.direcY = -1;
}

ballObj.prototype.draw = function() {
	cxt.save();
	cxt.fillStyle = '#FFBBBB';
	cxt.beginPath();
	cxt.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
	cxt.closePath();
	cxt.fill();
	cxt.restore();
}

ballObj.prototype.move = function() {
	cxt.clearRect(this.x-this.r, this.y-this.r, this.r*2, this.r*2);
	this.x += this.speed * this.direcX;
	this.y += this.speed * this.direcY;
	
	//四周碰撞检测
	//左
	if (this.x - this.r < 0) {
		//玩家左失败
		scoreRight += 1;
		score();
		//重置
		ball.init();
		paddleLeft.init();
		paddleRight.init();
		this.direcX = 1;
	}
	//右
	if (this.x + this.r > 1200) {
		//玩家右失败
		scoreLeft += 1;
		score();
		//重置
		ball.init();
		paddleLeft.init();
		paddleRight.init();
		this.direcX = -1;
		
	}
	//上
	if (this.y - this.r < 0) {
		this.direcY = 1;
	}
	//下
	if (this.y + this.r > 600) {
		this.direcY = -1;
	}
	
	//左拍子碰撞检测
	if (this.x - this.r < paddleLeft.x + paddleLeft.w && this.x - this.r > paddleLeft.x       ) {
		if (this.y + this.r > paddleLeft.y && this.y - this.r < paddleLeft.y + paddleLeft.h)
		this.direcX = 1;
	}
	//右拍子碰撞检测
	if (this.x + this.r > paddleRight.x && this.x + this.r < paddleRight.x + 50) {
		if (this.y + this.r > paddleRight.y && this.y - this.r < paddleRight.y + paddleRight.h)
		this.direcX = -1;
	}
}


//paddleLeft
var paddleLeftObj = function() {
	this.x;
	this.y;
	this.w;
	this.h;
}

paddleLeftObj.prototype.init = function() {
	cxt.clearRect(0, 0, 1200, 600);
	this.x = 200;
	this.y = 200;
	this.w = 50;
	this.h = 200;
}

paddleLeftObj.prototype.draw = function() {
	cxt.save();
	cxt.fillStyle = '#BBBBFF';
	cxt.beginPath();
	cxt.rect(this.x, this.y, this.w, this.h);
	cxt.closePath();
	cxt.fill();
	cxt.restore();
}

paddleLeftObj.prototype.move = function() {
	cxt.clearRect(this.x, this.y, this.w, this.h);
	if (pingpong.Keys[KEY.W]) {
		this.y -= 6;
	}
	if (pingpong.Keys[KEY.S]) {
		this.y += 6;
	}
}

//paddleRight
var paddleRightObj = function() {
	this.x;
	this.y;
	this.w;
	this.h;
}

paddleRightObj.prototype.init = function() {
	cxt.clearRect(0, 0, 1200, 600);
	this.x = 1000;
	this.y = 200;
	this.w = 50;
	this.h = 200;
}

paddleRightObj.prototype.draw = function() {
	cxt.save();
	cxt.fillStyle = '#BBBBFF';
	cxt.beginPath();
	cxt.rect(this.x, this.y, this.w, this.h);
	cxt.closePath();
	cxt.fill();
	cxt.restore();
}

paddleRightObj.prototype.move = function() {
	cxt.clearRect(this.x, this.y, this.w, this.h);
	if (pingpong.Keys[KEY.UP]) {
		this.y -= 6;
	}
	if (pingpong.Keys[KEY.DOWN]) {
		this.y += 6;
	}
}

function score() {
	var scoreL = document.getElementById("scorel");
	var scoreR = document.getElementById("scoreR");
	scoreL.innerHTML = scoreLeft;
	scoreR.innerHTML = scoreRight;
	scoreL.style.fontFamily = '微软雅黑';
	scoreR.style.fontFamily = '微软雅黑';
}
