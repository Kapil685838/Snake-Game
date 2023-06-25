let inputDir = {x:0, y:0};
const gameSound = new Audio('music1.mp3');
const foodSound = new Audio('food.mp3');
const moveSound = new Audio('move.mp3');
const gameoverSound = new Audio('gameover.mp3');
let speed = 6; 
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 1, y: 1}
]
food = {x: 6, y: 8};



// Game function : 
function main(currtime){
    window.requestAnimationFrame(main);
    if((currtime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currtime;
    gameEngine();
}

function isCollide(snake){
    // if snake eats himself
    for(let i=1; i<snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if((snake[0].x >= 30 || snake[0].x <=0) || snake[0].y >=30 || snake[0].y <=0){
        return true;
    }
    return false;
}

function gameEngine(){
    // part 1 : updating the snake and array

    if(isCollide(snakeArr)){
        gameoverSound.play();
        gameSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over. Press any key to Start again!");
        snakeArr = [{x:1 , y:1}];
        score = 0;
        speed = 4;
        scoreBox.innerHTML = "Score : " + score;
    }

    // If snake eats food, increase the score and regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        
        let hs = 100;
        for(let i=5; i<=hs; i+=5){
            if(score>=i){
                speed+=2;
            }
        }
        
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Max Score : " + hiscoreval;
        }

        scoreBox.innerHTML = "Score :" + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a = 1;
        let b = 29;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
    }

    // Moving the snake
    for(let i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};  //dot for not getting reference problem, use it as new object.
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y; 

// *******************************************************************************************************************
    // part 2 : display the snake and food

    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((element,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        snakeElement.classList.add('head');
        board.appendChild(snakeElement);
    })

    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}






// ********************************************************************************************************************

// Main logic here


let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Max Score : " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', element =>{
    inputDir = {x:0, y:1} // to start the game
    gameSound.play();
    moveSound.play();
    switch (element.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = +1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = +1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})