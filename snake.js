

let canvas =  document.querySelector('canvas');

let ctx =  canvas.getContext('2d');

let cellsize = 50 ; //height and width decide krega cell ki

let boardheight = 600 ;
let boardwidth = 1000 ;

let snakeCells = [[0,0]];

let direction = 'right';

let gameover = 'false' ;

let score = 0 ;

let foodcells = generatefood();

 // keydown event is triggered
 
document.addEventListener('keydown',function(event) {
    if(event.key === 'ArrowUp'){ direction = 'up'}
    else if(event.key === 'ArrowDown'){direction = 'down'}
    else if(event.key === 'ArrowLeft'){direction = 'left'}
    else{ direction = 'right'}  
})

let intervalID = setInterval(function(){
    update();
    draw();
} , 100)

//to draw the snake

function draw(){

    if(gameover === true){
        clearInterval(intervalID) // it accepts an id ( konsi id ? - vo id jo setInterval wale function me diya hai )
        ctx.font = '50px monospace';
        ctx.fillStyle = 'white';
        ctx.fillText('GAME OVER !!' , 350 , 300)

        const audio = new Audio();
        audio.src = "./Audio/audio.mp3.mp3";
        audio.play();
        return ;
    }

    ctx.clearRect(0 , 0 , boardwidth , boardwidth);
    for(let cell of snakeCells){

        ctx.fillStyle = 'red';
        ctx.fillRect( cell[0] , cell[1] , cellsize , cellsize);

        ctx.strokeStyle = 'orange'
        ctx.strokeRect(cell[0] , cell[1] , cellsize , cellsize);

    }
    
// draw food
    ctx.fillStyle = 'green'
    ctx.fillRect(foodcells[0] , foodcells[1] , cellsize , cellsize );

//draw  score
    ctx.font =  '20px monospace'
    ctx.fillStyle =  'white'
    ctx.fillText(`score : ${score}`, 20 , 25);

}

//to update the snake

function update() {
  let headX =  snakeCells[snakeCells.length - 1][0];
  let headY =  snakeCells[snakeCells.length - 1][1];

  //let newheadX = headX + cellsize ;
  //let newheadY = headY ;

  let newheadX;
  let newheadY;

  if(direction === 'right'){
     newheadX = headX + cellsize ;
     newheadY = headY ;
     if(newheadX === boardwidth || khagyaKhudko(newheadX , newheadY)){gameover = true}
  }

  else if( direction === 'left'){
     newheadX = headX - cellsize ;
     newheadY = headY ;
     if(newheadX < 0 || khagyaKhudko(newheadX ,newheadY)){gameover = true}
  }

  else if(direction === 'down'){
     newheadX = headX ;
     newheadY = headY + cellsize ;
     if(newheadY === boardheight ||khagyaKhudko( newheadX , newheadY)){gameover = true}
  }

  else{
     newheadX = headX ;
     newheadY = headY - cellsize ;
     if(newheadY < 0 || khagyaKhudko(newheadX , newheadY)){gameover = true}
  }

  snakeCells.push([ newheadX , newheadY]);

  if( newheadX === foodcells[0] &&  newheadY === foodcells[1] ){
     foodcells = generatefood()
     score = score +1 ;
  }

else{ 
    snakeCells.shift();
}

}

function generatefood(){
    return[
        Math.round((Math.random() * (boardwidth-cellsize)) / cellsize)*cellsize , 
        Math.round((Math.random() * (boardheight-cellsize)) / cellsize)*cellsize
    ]
}

function khagyaKhudko(newheadX , newheadY){
    for(let item of snakeCells){
        if(item[0]=== newheadX && item[1] === newheadY){
            return true ;
        }
    }
    return false;
}
