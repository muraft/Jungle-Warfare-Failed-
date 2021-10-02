window.onload = function(){start()};
  var map;
  var player={
    x : 0,
    y : 0,
    width : 10,
    height : 10, 
    speed : 10,
    ammo : 10
  } 
  
  var moveLeft, moveUp, moveRight, moveDown;

function start()
{
  canvas = document.getElementById("gamescreen")
  ctx = canvas.getContext("2d")
  map = [canvas.width][canvas.height]
  
  player.x=canvas.width/2;
  player.y=canvas.height/2;
  
  setInterval(game, 1)
} 

function move(direction)
{
  //Efek kedip pada tombol yang ditekan
  var button=document.getElementById(direction)
  button.style.backgroundColor="white";
  button.style.color="black"
  setTimeout(()=>
  {
  button.style.backgroundColor="black";
  button.style.color="white";
  }, 250);
  
  collisionCheck();
  
  //Mendeteksi tombol mana yang ditekan dan menggerakan objek player
  if(direction=="left" && moveLeft)
  {
    player.x-=player.speed
  }
  else if(direction=="up" && moveUp)
  {
    player.y-=player.speed
  }
  else if(direction=="right" && moveRight)
  {
    player.x+=player.speed;
  }
  else if(direction=="down" && moveDown)
  {
    player.y+=player.speed
  }
  else if(direction=="fire")
  {
    fire(fromPlayer);
  }
  return;
}

function collisionCheck()
{
  moveLeft = true;
  moveUp = true;
  moveRight = true;
  moveDown = true;
  
  if(player.x<player.speed)
  {
    moveLeft=false;
  }
  if(player.y<player.speed)
  {
    moveUp=false;
  }
  if(player.x>=(canvas.width-player.speed)) 
  {
    moveRight=false;
  }
  if(player.y>=canvas.width-player. speed)
  {
    moveDown=false;
  }
}

function fire(subject)
{
  
}

function game()
{
  renderGame();
}

function renderGame()
{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  printMap();
  printPlayer(player.x,player.y,player.width,player.height);
}

function printMap()
{
  ctx.fillStyle="green"
  ctx.fillRect(0,0,canvas.width,canvas.height)
  console.log(player.x +","+ player.y)
}

function printPlayer(x, y, width, height)
{
  var head = {} ;
  head.y = y;
  head.width = width/3;
  head.x = x+((width-(head.width))/2);
  head.height = height/3;
  
  var body = {}
  body.x = x;
  body.y = head.y+head.height;
  body.width = width;
  body.height = (height-head.height)/1.5;
  
  var leg = {};
  leg.y = body.y+body.height;
  leg.width = width/1.5;
  leg.x = x+((width-(leg.width))/2);
  leg.height = height-head.height-body.height;
  
  ctx.fillStyle = "#f0d792";
  ctx.fillRect(head.x,head.y,head.width,head.height)
  ctx.fillStyle = "#145bcc"
  ctx.fillRect(body.x,body.y,body.width, body.height)
  ctx.fillStyle= "#996305"
  ctx.fillRect(leg.x,leg.y,leg.width,leg.height)
}
