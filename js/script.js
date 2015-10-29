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

    if(ev == 'right') nx+=10;
    else if(ev == 'left') nx=nx-10;
    else if(ev == 'up') ny=ny-10;
    else if(ev == 'down') ny+=10;


    ctx.fillRect(snake_array[0].x,snake_array[0].y,count,count);
    ctx.clearRect(snake_array[snake_array.length-1].x,snake_array[snake_array.length-1].y,count,count);



    // //Move snake
    var tail = snake_array.pop();
    tail.x = nx;
    tail.y = ny;
    snake_array.unshift(tail);


    if ((food.x == snake_array[0].x)&&(food.y == snake_array[0].y)){
        console.log('omnomnom');
        snake_array.push(food.x,food.y);
    }

    if ((snake_array[0].x == width) || (snake_array[0].y == height)){
        console.log('game over');
    }

    setTimeout(loop, 200);


}

function draw(x,y){
    ctx.fillRect(x*count, y*count, count, count);
};


function food(){
    ctx.fillStyle = 'green';
    var food={
        x : Math.floor(Math.random()*(width - count)),
        y : Math.floor(Math.random()*(height - count))
    };
    ctx.fillRect(food.x, food.y, 10, 10);
};

function snikers(){
    for (var i=0; i<length; i++){
        snake_array.push({x:i,y:0});
        draw(snake_array[i].x,snake_array[i].y);
    }
};

function update() {
    for(var i = 0; i < snake_array.length; i++) {
        ctx.clearRect(snake_array[i].x,snake_array[i].y,10,10);
    }
    for(var i = 0; i < snake_array.length; i++) {

        var s = snake_array[i];
        draw(s.x, s.y);
    }
}

init();

