var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = 200,
    height = 200,
    count = 10,
    speed = 200,
    length = 1,
    snake_array = [],
    food=[],
    fps=30,
    speedRequestId,
    requestId,
    ev;

canvas.width = width;
canvas.height = height;
canvas.style.border = '1px solid black';

var requestAnimationFrame = window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.oRequestAnimationFrame ||
                            window.msRequestAnimationFrame ||
                            window.requestAnimationFrame;
var cancelRequestAnimationFrame  = window.cancelRequestAnimationFrame ||
                            window.webkitCancelRequestAnimationFrame ||
                            window.mozCancelRequestAnimationFrame ||
                            window.oCancelRequestAnimationFrame ||
                            window.msCancelRequestAnimationFrame;

function init(){
    ev = 'right';
    createSnake();
    createFood();
    requestId = requestAnimationFrame(loop);
};

function loop() {
    var nx = snake_array[0].x;
    var ny = snake_array[0].y;

    var keys={
        '37' : 'left',
        '38' : 'up',
        '39' : 'right',
        '40' : 'down'
    }
    document.addEventListener('keydown', function(e) {
        var key = e.which;
        ev = keys[key];
    }, false);

    if(ev == 'right') nx++;
    else if(ev == 'left') nx--;
    else if(ev == 'up') ny--;
    else if(ev == 'down') ny++;

    clearSnake();

    var tail = snake_array.pop();
    tail.x = nx;
    tail.y = ny;
    snake_array.unshift(tail);

    for (var i=1; i < snake_array.length; i++){
        if((snake_array[i].x == snake_array[0].x)&&(snake_array[i].y == snake_array[0].y)){
            gameOver();
            return false;
        }
    }
    if ((food.x/count == snake_array[0].x)&&(food.y/count == snake_array[0].y)){
        snake_array.push(food);
        createFood();
    }
    if ((snake_array[0].x > width/count) || (snake_array[0].y > height/count) || (snake_array[0].y < 0)|| (snake_array[0].x <0)){
        gameOver();
        return false;
    }

    update();

    speedRequestId = setTimeout(function() {
        requestId = requestAnimationFrame(loop);
    }, speed);
    speedRequestId;
}

function draw(x,y){
    ctx.fillStyle = 'black';
    ctx.fillRect(x*count, y*count, count, count);
};


function createFood(){
    ctx.fillStyle = 'green';
    food={
        x : Math.floor(Math.floor((Math.random()*(width - count+1)+ count))/count)*count,
        y : Math.floor(Math.floor((Math.random()*(height - count+1) + count))/count)*count
    };
    ctx.fillRect(food.x, food.y, count, count);
};

function createSnake(){
    for (var i=0; i<length; i++){
        snake_array.push({x:i,y:0});
        draw(snake_array[i].x,snake_array[i].y);
    }
};

function clearSnake(){
    for (var i=0; i < snake_array.length; i++){
        ctx.clearRect(snake_array[i].x*count,snake_array[i].y*count, count, count);
    }
};

function update() {
    ctx.fillStyle = 'black';
    for (var i=0; i < snake_array.length; i++){
        draw(snake_array[i].x,snake_array[i].y);
    }
}

function gameOver(){
    ctx.clearRect(0,0, width, height);
    clearInterval(speedRequestId);
    cancelRequestAnimationFrame(requestId);
    ctx.strokeStyle = "black";
    ctx.font = "bold 20pt Arial";
    ctx.textAlign = 'center';
    ctx.fillText("Game Over", width/2, height/2);
    ctx.font = "10pt Arial";
    ctx.fillText("Click on canvas", width/2, height-10);
    canvas.setAttribute("class", "over");
    var over = document.getElementsByClassName('over');
    over[0].addEventListener('click', function listener(e){
        console.log('play');
        e.preventDefault();
        this.removeAttribute('class');
        ctx.clearRect(0,0, width, height);
        snake_array = [];
        init();
        this.removeEventListener('click', listener, false);
    }, false);
}

init();

