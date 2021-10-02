window.onload = function(){start()};
  var gameObject=[], numberOfGameObjects=1;
  var bullet=[], bulletNum=0;
  var player={
    x : 0,
    y : 0,
    width : 10,
    height : 10, 
    speed : 10,
    speed : 10,
    ammo : 10, 
    weapon : "pistol",
    canFire : true,
  } 
  
  var moveLeft, moveUp, moveRight, moveDown;

function start()
{
  canvas = document.getElementById("gamescreen")
  ctx = canvas.getContext("2d")
  
  player.x=canvas.width/2;
  player.y=canvas.height/2;
  
  gameObject[0]=
  {
    x: 150,
    y: 100,
    width : 50,
    height : 10,
    collision : true
  }
  gameObject[1]=
  {
    x: 150,
    y: 110,
    width : 10,
    height : 40,
    collision : true
  }
  
  collisionCheck(player);
  
  setInterval(game, 1)
} 

function move(direction)
{
  var button=document.getElementById(direction)
  button.style.backgroundColor="white";
  button.style.color="black"
  setTimeout(()=>
  {
  button.style.backgroundColor="black";
  button.style.color="white";
  }, 250);
  
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
  else if(direction=="shoot" && player.canFire)
  {
    fire("fromPlayer",player.weapon);
  }
  
  collisionCheck(player);

  return;
}

function collisionCheck(subject)
{
  moveLeft = true;
  moveUp = true;
  moveRight = true;
  moveDown = true;
  
  for(i=0;i<=numberOfGameObjects;i++)
  {
    if(subject.x<subject.width || gameObject[i].x+gameObject[i].width==subject.x && subject.y>=gameObject[i].y && subject.y<gameObject[i].y+gameObject[i].height && gameObject[i].collision)
    {
      moveLeft=false;
    }
    if(subject.y<subject.height ||  gameObject[i].y+gameObject[i].height==subject.y && subject.x>=gameObject[i].x && subject.x<gameObject[i].x+gameObject[i].width && gameObject[i].collision)
    {
      moveUp=false;
    }
    if(subject.x>=canvas.width-subject.width ||  gameObject[i].x == subject.x+subject.width && subject.y>=gameObject[i].y && subject.y<gameObject[i].y+gameObject[i].height && gameObject[i].collision)  
    {
      moveRight=false;
    }
    if(subject.y>=canvas.width-subject.width || gameObject[i].y==subject.y+subject.height && subject.x>=gameObject[i].x && subject.x<gameObject[i].x+gameObject[i].width && gameObject[i].collision)
    {
      moveDown=false;
    }
  } 
  debug();
}

function bulletMaker(subject, type)
{
  switch(type)
  {
    case "pistol" :
      {
        this.speed = 0.5;
        this.colour = "yellow";
        this.x = player.x+player.width;
        this.y = player.y+player.height/2;
        this.width = 5;
        this.height = 2;
      }
  }
}

function fire(subject, weapontype)
{
  
  switch(subject)
  {
    case "fromPlayer" :
      if(player.ammo!=0)
      {
        bullet[bulletNum] = new bulletMaker("fromPlayer" , weapontype);
        bulletNum+=1;
        console.log(bullet[bulletNum-1])
      }
      break;
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
  ctx.fillStyle="red"
  printGameObject();
  printHuman();
  printBullet();
  debug();
}

function printMap()
{
  ctx.fillStyle="green"
  ctx.fillRect(0,0,canvas.width,canvas.height)
}

function printGameObject()
{
  for(i=0;i<=numberOfGameObjects;i++)
  {
    ctx.fillRect(gameObject[i].x,gameObject[i].y,gameObject[i].width,gameObject[i].height)
  }
}

function printHuman()
{
  drawHuman(player.x,player.y,player.width,player.height,"player")
}

function drawHuman(x, y, width, height, type)
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
  ctx.fillRect(head.x,head.y,head.width,head.height);
  ctx.fillStyle = "#145bcc";
  ctx.fillRect(body.x,body.y,body.width, body.height);
  ctx.fillStyle= "#996305";
  ctx.fillRect(leg.x,leg.y,leg.width,leg.height)
}

function printBullet()
{
  for(i=0;i<bulletNum;i++)
  {
    ctx.fillStyle=bullet[i].colour;
    ctx.fillRect(bullet[i].x,bullet[i].y,bullet[i].width,bullet[i].height);
    bullet[i].x+=bullet[i].speed;
  }
}

function debug()
{
  var debugBox=document.getElementById("debugbox");
  debugBox.innerHTML=
  "<b>Player position</b> <br>"+
  "X : "+player.x+"<br>"+
  "Y : "+player.y+"<br>"+
  "<b>Player moveable direction</b> <br>"+
  "Left : "+moveLeft+"<br>"+
  "Up : "+moveUp+"<br>"+
  "Right : "+moveRight+"<br>"+
  "Down : "+moveDown
} 