var canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d'),
width = 200,
height = 200,
count = 10,
speed = 500,
length = 5,
snake_array = [],
ev;

function init(){
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = '1px solid black';
    ev = 'right';

    snikers();
    // paintSnake();
    food();

    var requestAnimationFrame = window.mozRequestAnimationFrame||
                                window.msRequestAnimationFrame||
                                window.webkitRequestAnimationFrame;

    requestAnimationFrame(loop);


};

function loop() {

    var nx = snake_array[0].x;
    var ny = snake_array[0].y;

    // console.log(nx, ny);

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
// console.log(ev);
    if(ev == 'right') nx++;
    else if(ev == 'left') nx--; // столбец
    else if(ev == 'up') ny--;// строка
    else if(ev == 'down') ny++;

    ctx.clearRect(snake_array[0].x,snake_array[0].y,10,10);
    ctx.fillRect(snake_array[snake_array.length-1].x,snake_array[snake_array.length-1].y,10,10);

    //Move snake
    var tail = snake_array.pop();
    tail.x = nx;
    tail.y = ny;
    snake_array.unshift(tail);




    requestAnimationFrame(loop);
}

function draw(x,y){
    ctx.fillRect(x*count, y*count, count, count);
};


function food(){
    ctx.fillStyle = 'green'; //apple green
    var x = Math.floor(Math.random()*(width - count));
    var y = Math.floor(Math.random()*(height - count));
    ctx.fillRect(x, y, 10, 10);
};

function snikers(){
    ctx.fillStyle = 'blue';
    for (var i=0; i<length; i++){
        snake_array.push({x:i,y:0});
        draw(snake_array[i].x,snake_array[i].y);
    }
};

function paintSnake() {
    for(var i = 0; i < snake_array.length; i++) {
        ctx.clearRect(snake_array[i].x,snake_array[i].y,10,10);
    }
    for(var i = 0; i < snake_array.length; i++) {
        var s = snake_array[i];
        draw(s.x, s.y);
    }
}

init();

