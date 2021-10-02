window.onload = function(){start()};
player={
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
  setInterval(game, 1)  
} 

function move(direction, e)
{
  //Efek kedip pada tombol yang ditekan
  var button=document.getElementById(direction)
  button.style.backgroundColor="white";
  button.style.color="black"
  setTimeout(function()
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
  printPlayer();
}

function printPlayer()
{
  ctx.clearRect(0,0,300,300);
  ctx.fillRect(player.x,player.y,player.width,player.height)
}
