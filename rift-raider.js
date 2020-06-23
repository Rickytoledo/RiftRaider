
let audio = document.getElementById("audio");
let startWindow = document.getElementById("startWindow");
let gameWin = document.getElementById("gameWindow");
let gameOverWindow = document.getElementById("gameOver");
let bStart = document.getElementById("startButton");
let bRestart = document.getElementById("restartButton");
bStart.addEventListener("click", hideStart);
function hideStart(){
	startWindow.style.visibility = "hidden";
    audio.play();
    myMove();
}

function showStart(){
	startWindow.style.visibility="visibile";
}
function showGameOverWindow(){
	gameOverWindow.style.visibility="visible";
}

//player
let ship= null;
function init(){
    ship=document.getElementById("image1");				
    ship.style.position='absolute';
    ship.style.left='700px';
    ship.style.top='500px';
}
function getKeyAndMove(e){				
    let key_code=e.which||e.keyCode;
    switch(key_code){
        case 37: //left arrow key
            moveLeft();
            break;
        case 38: //Up arrow key
            moveUp();
            break;
        case 39: //right arrow key
            moveRight();
            break;
        case 40: //down arrow key
            moveDown();
            break;						
    }
}
function moveLeft(){
    ship.style.left=parseInt(ship.style.left)-25 +'px';
    ship.style.transform = "rotate(-90deg)"
}
function moveUp(){
    ship.style.top=parseInt(ship.style.top)-25 +'px';
    ship.style.transform = "rotate(0deg)"
}

function moveRight(){
    ship.style.left=parseInt(ship.style.left)+25 +'px';
    ship.style.transform = "rotate(90deg)"
}

function moveDown(){
    ship.style.top=parseInt(ship.style.top)+25 +'px';
    ship.style.transform = "rotate(180deg)"
}

function shoot() {
    //let laser = document.querySelector('.laser')
    let laser = document.createElement('div')
    laser.className = 'laser'
    document.querySelector('#enemy').append(laser)
    laser.style.left = Number(ship.style.left.replace('px', '')) + ship.width / 2 +'px'
    laser.style.top = Number(ship.style.top.replace('px', '')) + ship.height / 2 +'px'
    laser.style.transform = "rotate(1000deg)"
    laser.style.padding = "20px"
    laser.style.borderRadius = "18px"
    laser.style.background ="url(images/laser.gif)"
    setTimeout(function() {
        let collide = collision(laser, ship)
        console.log(collide)
        if(collision(laser,ship)) {
            showGameOverWindow();
        }
       laser.remove()
    }, 900);
}




//enemy
function myMove() {
    let container = document.getElementById("body");
    let enemy = document.getElementById("enemy");
    let maxDistToTravel = 1050;
    let pos = -800;
    let end = maxDistToTravel;
    let direction = 1;
    let f = 1;
    const frame = () => { 
        if (pos === end) {
            direction *= -1; // reverses current direction
            end = Math.abs(maxDistToTravel - end); 
        }
        // console.log(enemy, pos)
        pos += direction;
        // enemy.style.top = pos + "px";
       // enemy.style.left = pos - 230;
        f++;
        if(f % 100 === 0) {
            shoot();
        }
        
        
    }
    let id = setInterval(frame, 2);
  }


  window.onload = () => {
    init();
    showStart()
}

function collision(el1, el2) {
    var rect1 = el1.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();
    return !(
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.bottom < rect2.top ||
      rect1.left > rect2.right
    );
}
