var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var a1 = new Array(8);
var img = new Image();
img.src = "sprites/bum.png";
for (var i = 0; i < a1.length; i++) {
    a1[i] = new Array(8);
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
    }
}

for(k = 1; k <= 10; k++)
{
 i = parseInt((Math.random())*7);
 console.log(i);
 j = parseInt((Math.random())*7);
 console.log(j);
 if(a1[i][j] == 100)
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

canvas.addEventListener("mousedown", function(e) 
{ 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left; 
    let y = event.clientY - rect.top;  
    var ix = parseInt((x - 1)/50);
    console.log(ix);
    var jx = parseInt((y - 1)/50);
    console.log(jx);
    if(ix <= 8 && jx <=8 && ix >= 1 && jx >= 1)
    {
        if(a1[ix - 1][jx - 1] >= 100)
        {
            for(ix = 1; ix <= 8; ix++)
            {
                for(jx = 1; jx <= 8; jx++)
                {
                    if(a1[ix - 1][jx - 1] >= 100)
                    {
                        ctx.beginPath();
                        ctx.rect(50*ix, 50*jx, 45, 45);
                        ctx.fillStyle = "#000000";
                        console.log("ithe");
                        ctx.fill();
                        ctx.closePath();
                        ctx.drawImage(img, 50*ix, 50*jx, 45, 45);
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
            ctx.beginPath();
            ctx.rect(50*ix, 50*jx, 45, 45);
            ctx.fillStyle = "#000000";
            console.log("ithe");
            ctx.fill();
            ctx.closePath();
            ctx.drawImage(img, 50*ix, 50*jx, 45, 45);
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
    
}); 

    