var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var a1 = new Array(8);
var flagChecker = new Array(8);
var img = new Image();
img.src = "sprites/bum.png";
var flag = new Image();
flag.src = "sprites/red.png";
var flagun = new Image();
flagun.src = "sprites/redun.png";
var reload = new Image();
reload.src = "sprites/okGhoomer.jpg";
var logo = new Image();
logo.src = "sprites/logo.jpg";
var timeO;
var gameState = 'menu';
var checked;
var flagsrem;
function startGame()
{
    checked = 0;
    flagsrem = 10;
    var today = new Date();
    timeO = today.getHours()*3600 + today.getMinutes()*60 + today.getSeconds(); 
    ctx.beginPath();
    ctx.rect(0, 0, 500, 500);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
    console.log("REACHED");
    for (var i = 0; i < a1.length; i++) {
        a1[i] = new Array(8);
        flagChecker[i] = new Array(8);
        
    }
    
    for(i = 1; i <= 8; i++)
    {
        for(j = 1; j<=8; j++)
        {
            ctx.beginPath();
            ctx.rect(50*i, 50*j, 45, 45);
            ctx.fillStyle = "#FF0000";
            ctx.fill();
            ctx.closePath();
            a1[i-1][j-1] = 0;
            flagChecker[i-1][j-1] = 0;
        }
    }
    
    for(k = 1; k <= 10; k++)
    {
     i = parseInt((Math.random())*7);
     console.log(i);
     j = parseInt((Math.random())*7);
     console.log(j);
     if(a1[i][j] >= 100)
     {
         k--;
     }
     else
     {
        a1[i][j] = 100;
        console.log(a1[i][j]);
        try{a1[i+1][j-1]++;}catch(e){//kuch nai karega ja.
        }
        try{a1[i+1][j]++;}catch(e){//kuch nai karega ja.
        }
        try{a1[i-1][j]++;}catch(e){//kuch nai karega ja.
        }
        try{a1[i][j+1]++;}catch(e){//kuch nai karega ja.
        }
        try{a1[i][j-1]++;}catch(e){//kuch nai karega ja.
        }
        try{a1[i+1][j+1]++;}catch(e){//kuch nai karega ja.
        }
        try{a1[i-1][j+1]++;}catch(e){//kuch nai karega ja.
        }
        try{a1[i-1][j-1]++;}catch(e){//kuch nai karega ja.
        }    
     }
    }
    ctx.beginPath();
    ctx.drawImage(flagun, 400, 450, 45, 45);  
    ctx.closePath();
    ctx.beginPath();
    ctx.drawImage(reload, 350, 450, 45, 45);  
    ctx.closePath();
}
function startMenu()
{  
    ctx.beginPath();
    ctx.drawImage(logo, 150, 50, 200, 200);  
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(100, 275, 300, 50);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();

    

    ctx.beginPath();
    ctx.font = "40px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText('Start', 200, 312.5);
    ctx.closePath();
    gameState = "menu";
}

function success()
{
    var today = new Date();
    var timenow = today.getHours()*3600 + today.getMinutes()*60 + today.getSeconds();
    var timediff = timenow - timeO;
    ctx.beginPath();
    ctx.font = "40px Arial";
    ctx.fillStyle = "#ffffff";
    
    var highscore = window.localStorage.getItem('highscore');
    if(highscore == null)
    {
        ctx.fillText("New Record!!!", 50,40);
        window.localStorage.setItem('highscore', timediff);
    }
    else if(parseInt(highscore) > timediff)
    {
        ctx.fillText("New Record!!!", 50,40);
        window.localStorage.setItem('highscore', timediff);
    }
    else
    {
        var mint = parseInt(highscore/60);
        var sec = highscore%60;
        ctx.fillText("Best was " + mint + " : " + sec , 50,40);
    }
    
    
}

function endGame()
{
    ctx.font = "40px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Oopsies!!!", 100,40);
}


window.requestAnimationFrame(function clocker()
{
    if(gameState === 'playing' || gameState === 'playingRight' )
    {
        ctx.beginPath();
        ctx.rect(370, 0, 130, 40);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
        var today = new Date();
        var timenow = today.getHours()*3600 + today.getMinutes()*60 + today.getSeconds();
        var timediff = timenow - timeO;
        ctx.beginPath();
        ctx.font = "40px Arial";
        ctx.fillStyle = "#ffffff";
        var mint = parseInt(timediff/60);
        var sec = timediff%60;
        ctx.fillText(mint + " : " + sec, 370,40);
       
    }
    window.requestAnimationFrame(clocker);
});






canvas.addEventListener("mousedown", function(e) 
{ 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left; 
    let y = event.clientY - rect.top;  
    var ix = parseInt((x - 1)/50);
    console.log(ix);
    var jx = parseInt((y - 1)/50);
    console.log(jx);
    
    switch(gameState)
    {
    
     case 'menu' :
         if(x >= 100 && x <= 400 && y >= 275 && y <= 325)
         {
             startGame();
             gameState = 'playing';             
         }

         break;
        
    
     case 'playing' :
        if(x >= 400 && x <= 445 && y >= 450 && y <= 495)
        {
            gameState = 'playingRight';
            ctx.beginPath();
            ctx.drawImage(flag, 400, 450, 45, 45);    
            ctx.closePath();
        }
        if(x >= 350 && x <= 395 && y >= 450 && y <= 495)
        {
            startGame();
        }
        if(ix <= 8 && jx <=8 && ix >= 1 && jx >= 1)
        {
            if(a1[ix - 1][jx - 1] >= 1000)
            {
                //dont do nothing
            }
            else if(a1[ix - 1][jx - 1] >= 100)
            {
                for(ix = 1; ix <= 8; ix++)
                {
                    for(jx = 1; jx <= 8; jx++)
                    {
                        if(a1[ix - 1][jx - 1] >= 1000)
                        {
                        //dont do nothing
                        }
                        else if(a1[ix - 1][jx - 1] >= 100)
                        {
                            console.log("Babe re!!!");
                            ctx.beginPath();
                            ctx.rect(50*ix, 50*jx, 45, 45);
                            ctx.fillStyle = "#000000";
                            console.log("ithe");
                            ctx.fill();
                            ctx.closePath();
                            ctx.drawImage(img, 50*ix, 50*jx, 45, 45);
                            gameState = "failure";
                            endGame();
                        }
                        else
                        {
                            ctx.beginPath();
                            ctx.rect(50*ix, 50*jx, 45, 45);
                            ctx.fillStyle = "#000000";
                            console.log("tithe");
                            ctx.fill();
                            ctx.font = "45px Arial";
                            ctx.fillStyle = "#ffffff"
                            ctx.fillText(a1[ix - 1][jx - 1], 10 + 50*ix,40 + 50*jx);
                            ctx.closePath();
                            
                        }
                    }
                }
            }
            else
            {
                ctx.beginPath();
                ctx.rect(50*ix, 50*jx, 45, 45);
                ctx.fillStyle = "#000000";
                console.log("tithe");
                ctx.fill();
                ctx.font = "45px Arial";
                ctx.fillStyle = "#ffffff"
                ctx.fillText(a1[ix - 1][jx - 1], 10 + 50*ix,40 + 50*jx);
                ctx.closePath();
                a1[ix - 1][jx - 1] = 1000
                checked++;
                if(checked == 54)
                {
                    gameState = "success";
                    success();
                }
            }
        
        }
        break;
        case 'playingRight' :
            if(x >= 350 && x <= 395 && y >= 450 && y <= 495)
            {
                gameState = 'playing';
                startGame(); 

            }
            if(ix <= 8 && jx <=8 && ix >= 1 && jx >= 1)
            {
                if(a1[ix - 1][jx - 1] >= 1000)
                {
                //dont do nothing
                }
                else if(flagChecker[ix - 1][jx - 1] == 0)
                {
                    if(flagsrem == 0)
                    {
                        break;
                    }
                    ctx.beginPath();
                    ctx.rect(50*ix, 50*jx, 45, 45);
                    ctx.fillStyle = "#000000";
                    console.log("ithe");
                    ctx.fill();
                    ctx.closePath();
                    ctx.drawImage(flag, 50*ix, 50*jx, 45, 45);
                    flagChecker[ix - 1][jx - 1] = 1;
                    flagsrem--;
                    break;
                }
                else
                {
                    
                    ctx.beginPath();
                    ctx.rect(50*ix, 50*jx, 45, 45);
                    ctx.fillStyle = "#FF0000";
                    ctx.fill();
                    ctx.closePath();
                    flagChecker[ix - 1][jx - 1] = 0;
                    flagsrem++;
                    
                    break;
                }
                
            }
            if(x >= 400 && x <= 445 && y >= 450 && y <= 495)
            {
                gameState = 'playing';
                ctx.beginPath();
                ctx.drawImage(flagun, 400, 450, 45, 45);    
                ctx.closePath();
            }
            break;

        case 'failure' :
            if(x >= 350 && x <= 395 && y >= 450 && y <= 495)
            {
                startGame();
                gameState = 'playing';
            }
            break;

        case 'success':
            if(x >= 350 && x <= 395 && y >= 450 && y <= 495)
            {
                startGame();
                gameState = 'playing';
            }
            break;
            
    }
    
}); 

    