const pad = document.querySelector(".pad")
const game = document.querySelector("#game")
const ball = document.querySelector(".ballContainer")
const cells = document.querySelector(".cells");

const cell = document.querySelectorAll(".cell")
const cellCoords = []

pad.style.position = "absolute";
pad.style.left = "450px";
pad.style.bottom ="50px";

ball.style.position = "absolute";
ball.style.bottom = "80px";
ball.style.left = "450px";


let padMoveAmount = 10;
let ballMoveAmountY = 10;
let ballMoveAmountX = 10;
let ballReleased = false;
let movingInterval;
let isCollision = false;
let gameSpeed = 50;


const gameLeftPos = game.getBoundingClientRect().left;
const gameRightPos = game.getBoundingClientRect().right;
const gameTopPos = game.getBoundingClientRect().top;
const gameBottomPos = game.getBoundingClientRect().bottom;


function movePad(e)
{

    const padLeftPos = pad.getBoundingClientRect().left;
    const padRightPos = pad.getBoundingClientRect().right;
 
    switch(e.key)
    {

        case "ArrowLeft": 
            if(padLeftPos<=gameLeftPos)
            {
                break;
            }
            pad.style.left = parseInt(pad.style.left) - padMoveAmount + "px";

            if(!ballReleased)
            {
                ball.style.left= parseInt(ball.style.left) - padMoveAmount+"px";
            }
            break;

        case "ArrowRight":
            if(padRightPos>=gameRightPos)
            {
                break;
            }
            pad.style.left = parseInt(pad.style.left) + padMoveAmount + "px";

            if(!ballReleased)
            {
                ball.style.left = parseInt(ball.style.left) + padMoveAmount+"px";
            }
            
            break;
    }
    
}

function ballMove(e)
{

    switch(e.key)
    {
        case " ":

        ballReleased = true;
        movingInterval = setInterval(collisionCheck,gameSpeed)
        console.log("space")
        break;
    }

}


function collisionCheck()
{
    let ballLeft = parseInt(ball.style.left)
    let padLeft = parseInt(pad.style.left) 


    function wallCollision()
    {
        if(ball.getBoundingClientRect().top<=gameTopPos)
        {
            clearInterval(movingInterval)
            isCollision = true;
            ballMoveAmountY = -10;
            movingInterval = setInterval(collisionCheck,gameSpeed) 
        }
        if(ball.getBoundingClientRect().right>=gameRightPos)
        {
            clearInterval(movingInterval)
            isCollision = true;
            ballMoveAmountX = -10;
            movingInterval = setInterval(collisionCheck,gameSpeed) 
        }
        if(ball.getBoundingClientRect().left<=gameLeftPos)
        {
            clearInterval(movingInterval)
            isCollision = true;
            ballMoveAmountX = 10;
            movingInterval = setInterval(collisionCheck,gameSpeed) 
        }
    }

    function padCollision()
    {
        if(ballLeft<padLeft+150 && ballLeft>padLeft-150 && parseInt(pad.style.bottom) == (parseInt(ball.style.bottom)))
        {
            clearInterval(movingInterval)
            isCollision = true;
            ballMoveAmountY = ballMoveAmountY*-1;
            movingInterval = setInterval(collisionCheck,gameSpeed) 
        }
        //disappar ball when fail
        if(ball.getBoundingClientRect().bottom>game.getBoundingClientRect().bottom)
        {
            ball.style.display = "none";
            clearInterval(movingInterval)
        }
    }

    function cellCollision()
    {

        
        cellCoords.forEach(coord =>
            {
                if(ball.getBoundingClientRect().x >= coord.left && ball.getBoundingClientRect().x <= coord.right && ball.getBoundingClientRect().y >=  coord.top && ball.getBoundingClientRect().y <= coord.bottom && coord.hitted==false )
                {
                    console.log(coord)
                    coord.hitted = true;
                    let current = cellCoords.indexOf(coord)
                    console.log(cell[current])
                    cell[current].style.opacity = 0;
                    ballMoveAmountY = ballMoveAmountY * -1;
                }
            })

    }
    
    wallCollision();
    padCollision();
    cellCollision();
    
    
    ball.style.bottom = parseInt(ball.style.bottom) + ballMoveAmountY +"px";
    ball.style.left = parseInt(ball.style.left)+ ballMoveAmountX+"px"
}


function getCellsCoords()
{
    cell.forEach(el=>
        {
            cellCoords.push({"bottom": `${el.getBoundingClientRect().bottom}`,"left": `${el.getBoundingClientRect().left}`, "top": `${el.getBoundingClientRect().top}`,
            "right": `${el.getBoundingClientRect().right}`, "hitted": false})
        })

        console.log(cellCoords)
}


window.addEventListener("load", getCellsCoords)
window.addEventListener('keydown', movePad)
window.addEventListener("keydown", ballMove);


