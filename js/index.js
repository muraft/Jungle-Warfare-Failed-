window.onload = function(){start()};
  //var map=[canvas.width][canvas.height]
  var player={
    x : 0,
    y : 0,
    width : 10,
    height : 10, 
    speed : 10
  } 

function start()
{
  canvas = document.getElementById("gamescreen")
  ctx = canvas.getContext("2d")
  
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
  
  //Mendeteksi tombol mana yang ditekan dan menggerakan objek player
  if(direction=="left" && player.x!=0)
  {
    player.x-=player.speed
  }
  else if(direction=="up" && player.y!=0)
  {
    player.y-=player.speed
  }
  else if(direction=="right" && player.x<canvas.width-player.speed)
  {
    player.x+=player.speed;
  }
  else if(direction=="down" && player.y<canvas.height-player.speed)
  {
    player.y+=player.speed
  }
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
