window.onload = function(){start()};
 
 //Declare some variables that will be used globally
 var canvas, ctx
  var moveLeft, moveUp, moveRight, moveDown;
  var cooldownPercentage, timeBefore, totalTime
  var gameObject=[], numberOfGameObjects=1;
  var bullet=[], bulletNum=0;
  var player=
  {
    player : true, 
    x : 0,
    y : 0,
    width : 10,
    height : 10, 
    speed : 10,
    ammo : 10, 
    activeWeapon: "pistol",
    pistolBullet: 10,
    fireCooldown : 0,
  } 

function start()
{
  //Basic canvas preparation
  canvas = document.getElementById("gamescreen")
  ctx = canvas.getContext("2d")
  
  //Placing the player to the middle of the map when the game started
  player.x=canvas.width/2;
  player.y=canvas.height/2;
  
  //Add some collisions for testing purpose
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
  
  //Checking if there are any collisions near the player
  collisionCheck(player);
  
  //Repeatly run the game function every 0,001 second
  setInterval(game, 1)
} 

//This function will be executed when the user touched one of the game button
function move(direction)
{
  //Add blink effect in the button which touched by the user
  var button=document.getElementById(direction)
  button.style.backgroundColor="white";
  button.style.color="black"
  setTimeout(()=>
  {
  button.style.backgroundColor="black";
  button.style.color="white";
  }, 250);
  
  //Checking which move button direction did the user touch and checking is it permissible to move into that direction
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
  
  //Checking if the player touched the fire button and checking if the weapon used is not in cooldown condition
  else if(direction=="shoot" && player.fireCooldown==0)
  {
    fire(player,player.activeWeapon);
  }
  
  //Check if there are any collisions nearby the player
  collisionCheck(player);

  return;
}

//Function for checking any collisions nearby
function collisionCheck(subject)
{
  //Set all move directions are true(Permissible) as a default condition
  moveLeft = true;
  moveUp = true;
  moveRight = true;
  moveDown = true;
  
  //Checking if there are any collisions nearby the player. If there are any, the move direction toward the collision will be set as false(Impermissible)
  //The loop is for checking the entire game objects and their position, and wether the game objects are collision or not
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
  //Print debug
  debug();
}

//Function when the player or someone want to fire
function fire(subject, weapontype)
{
  //Checking who is wanted to fire
  switch(subject.player)
  {
    //If the subject is the player
    case true :
      //Creating a new bullet[] object
      bullet[bulletNum] = new bulletMaker(subject , weapontype);
      //Adding 1 to the bulletNum, so the next bullet[] object will has different array index
      bulletNum+=1;
      break;
  }
}

//Function that create a bullet[] object
function bulletMaker(subject, type)
{
  //checking the type of the gun
  switch(type)
  {
    //If the gun is pistol, the bullet will set with the pistol bullet specification
    case "pistol" :
      if(subject.pistolBullet!=0 )
      {
      this.speed = 0.5;
      this.colour = "yellow";
      this.x = player.x+player.width;
      this.y = player.y+player.height/2;
      this.width = 5;
      this.height = 2;
      subject.fireCooldown = 100;
      subject.pistolBullet-=1;
      } 
      break;
  }
}

//Function that execute other functions that important for the game
function game()
{
  //Fuction that change game status or variables
  statusChange();
  //Function that display every game object to the canvas screen
  renderGame();
}

function statusChange()
{
  //Call a function that will reduce the guncooldown time
  gunCooldown(player);
}

function gunCooldown(subject)
{
  //If the subject is player, the percentage of cooldown progress will be created
  if(subject==player)
  {
    //If the subject fire cooldown was 0 before, and now it's more than zero
    if(timeBefore==0 && subject.fireCooldown>0)
    {
      //That subject fire cooldown will be the maximum time of the cooldown
      totalTime=subject.fireCooldown
    }
    //Calculating the percentage of cooldown progress (Cooldown time now divided by the maximum time of the cooldown, then multiplied by 100)
    cooldownPercentage=subject.fireCooldown/totalTime*100
  }
  
  //If the cooldown time more than 0, the cooldown time will being reduced until 0
  if(subject.fireCooldown>0)
  {
    subject.fireCooldown-=1;
  }
  //Asign the fire cooldown to the timeBefore, so when thos function executed again, it will know what was the amount of the subject fire cooldown before
  timeBefore=subject.fireCooldown
}

//Function that display every game object to the canvas screen
function renderGame()
{
  //Clear the entire canvas, so when the object reprinted with the new position, its old image won't be shown
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  //Every functions print every different category of game object 
  printStatus();
  printMap();
  printGameObject();
  printHuman();
  printBullet();
  debug();
}

//Print player status to the status UI
function printStatus()
{
  //Showing weapon image based on the player's active weapon
  var weaponInfo = document.getElementById("weaponinfo")
  if(player.activeWeapon=="pistol") 
  {
    weaponInfo.innerHTML=
    "<b> Glock <b> <br>"+
    "<font color='yellow'>"+player.pistolBullet+"</font>";
  } 
  
  //Change the weapon image height based on cooldown progress
  var weaponImage=document.getElementById("weaponimage");
  {
    var imageHeight=100-cooldownPercentage;
    weaponImage.style.height=imageHeight+"%";
  }
}

//Function that print map or game background
function printMap()
{
  ctx.fillStyle="green"
  ctx.fillRect(0,0,canvas.width,canvas.height)
}

//Function that print all thing in the gameObject[]
function printGameObject()
{
  ctx.fillStyle = "brown"
  for(i=0;i<=numberOfGameObjects;i++)
  {
    ctx.fillRect(gameObject[i].x,gameObject[i].y,gameObject[i].width,gameObject[i].height)
  }
}

//Function that print humanoid object
function printHuman()
{
  drawHuman(player.x,player.y,player.width,player.height,"player")
}

//Function that construct human like pixel art
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

//Function that print all the bullet to the screen, and move the bullet position based on the bullet speed
function printBullet()
{
  for(i=0;i<bulletNum;i++)
  {
    ctx.fillStyle=bullet[i].colour;
    ctx.fillRect(bullet[i].x,bullet[i].y,bullet[i].width,bullet[i].height);
    bullet[i].x+=bullet[i].speed;
  }
}

//Function that print debug about the game for testing purpose
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
  "Down : "+moveDown+"<br>"+
  timeBefore+" "+player.fireCooldown
} 