var pingpong= {};
pingpong.pressedKeys = {};
pingpong.ball = {
	speed: 5,
	x: 150,
	y: 100,
	r: 15,
	direcX: 1,
	direcY: 1
}

$(function() {
	//设置定时器，每30毫秒调用
	pingpong.timer = setInterval(gameloop, 30);
	
	//记录pressedkyes数组里某键状态是按下还是放开
	//按下为true, 放开false
	$(document).keydown(function(e) {
		pingpong.pressedKeys[e.which] = true;
	});
	$(document).keyup(function(e) {
		pingpong.pressedKeys[e.which] = false;
	});
	
});

function gameloop() {
	movePaddles();
	moveBall();
}

var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83,
}

function movePaddles() {
	var top;
	if(pingpong.pressedKeys[KEY.UP]) {
		top = parseInt($('#paddleB').css('top'));
		$('#paddleB').css('top', top-5);
	}
	if(pingpong.pressedKeys[KEY.DOWN]) {
		top = parseInt($('#paddleB').css('top'));
		$('#paddleB').css('top', top+5);
	}
	if(pingpong.pressedKeys[KEY.W]) {
		top = parseInt($('#paddleA').css('top'));
		$('#paddleA').css('top', top-5);
	}
	if(pingpong.pressedKeys[KEY.S]) {
		top = parseInt($('#paddleA').css('top'));
		$('#paddleA').css('top', top+5);
	}
}

function moveBall() {
	var bgH = parseInt($('#playground').height());
	var bgW = parseInt($('#playground').width());
	var ball = pingpong.ball;
	
	//检测球台边缘
	//底边
	if (ball.y + ball.speed * ball.direcY + ball.r > bgH) {
		ball.direcY = -1;
	}
	//顶边
	if (ball.y + ball.speed * ball.direcY + ball.r < 0) {
		ball.direcY = 1;
	}
	//右边
	if (ball.x + ball.speed * ball.direcX + ball.r > bgW) {
		// 玩家B丢分
		// 重置
		ball.x = 150;
		ball.y = 100;
		ball.direcX = -1;
		$('#ball').css({
			'left': ball.x,
			'top': ball.y
		})
	}
	//左边
	if (ball.x + ball.speed * ball.direcX + ball.r < 0) {
		// 玩家A丢分
		// 重置
		ball.x = 150;
		ball.y = 100;
		ball.direcX = 1;
		$('#ball').css({
			'left': ball.x,
			'top': ball.y
		})
	}
	//改变x，y
	ball.x += ball.speed * ball.direcX;
	ball.y += ball.speed * ball.direcY;
	
	//检测球拍
	//左边
	var paddleAX = parseInt($('#paddleA').css('left')) + parseInt($('#paddleA').css('width'));
	var paddleAYbtm = parseInt($('#paddleA').css('top')) + parseInt($('#paddleA').css('height'));
	var paddleAYtop = parseInt($('#paddleA').css('top'));
	if (ball.x + ball.speed*ball.direcX < paddleAX) {
		if (ball.y + ball.speed * ball.direcY <= paddleAYbtm && ball.y + ball.speed * ball.direcY >= paddleAYtop) {
			ball.direcX = 1;
		}
	}
	//右边
	var paddleBX = parseInt($('#paddleB').css('left'));
	var paddleBYbtm = parseInt($('#paddleB').css('top')) + parseInt($('#paddleB').css('height'));
	var paddleBYtop = parseInt($('#paddleB').css('top'));
	if (ball.x + ball.speed*ball.direcX > paddleBX) {
		if (ball.y + ball.speed * ball.direcY <= paddleBYbtm && ball.y + ball.speed * ball.direcY >= paddleBYtop) {
			ball.direcX = -1;
		}
	}
	
	//move it
	$('#ball').css({
		'left': ball.x,
		'top': ball.y
	});
}
