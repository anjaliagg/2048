var realBoard=createRealBoard();
var finish=0;
var start=0;
var score=0;
var begin=0;

function createRealBoard()
    {
        var board= new Array(4);
        for(var a=0; a<4; a++)
        {
            board[a]= new Array(4);
        }
        
        for(var i=0; i<4;i++)
        {
            for(var j=0; j<4; j++)
            {
                board[i][j]=0;
            }
        }
        return board;
    }
    
function startTheGame()
    {
        if(begin===0){
            begin=1;
            clickonstart();
        }   
    }

function clickonstart()
    {
        start=1;
        var a= document.getElementById('outerdiv');
        a.style.opacity=0;
        main();
    }

function RandomNumberGenerator(realBoard)
    {   
        var i=0; //i= 0 and 1 coz when game starts, we need two random numbers at two random positions so iterated twice
        while(i<2)
        {
            var randomnumber=Math.floor((Math.random() * 10) + 1); // 90% is 2 and 10% is 4
            if(randomnumber>9)
            {
                randomnumber=4;
            }
            else
            {
                randomnumber=2;
            }
        
            var randomposition= Math.floor(Math.random()*(16));
            console.log('random number '+ i +': '+ randomposition);
            if(realBoard[parseInt(randomposition/4)][randomposition%4]===0)
            {
                realBoard[parseInt(randomposition/4)][randomposition%4]=randomnumber;
                i++;
            }
        }
    }
    
function printBoard(board)
    {
        for(var i =0; i<4; i++)
        {
            //for(var j =0; j<4; j++) loop removed because console.log gives newline after each command
            {
                console.log(board[i][0]+ ' ' + board[i][1]+ ' ' + board[i][2]+ ' ' + board[i][3]);
            }
            // console.log("\n");
        }
    }   

function setBoardOnScreen(realBoard)
    {   console.log("Function called");
        for( var i =0; i<4; i++)
        {
            for(var j =0; j<4; j++)
            {
                if(realBoard[i][j])
                {   
                    console.log("i,j: "+ i+","+j);
                    var divId= (4*i)+j;
                    console.log("divId: "+divId);
                    
                    var a= document.getElementById(divId);
                    
                    console.log("a.id: "+a.id);
                    var value=realBoard[i][j];
                    a.innerHTML="<H1>"+value+"</H1>";
                    console.log("value: "+value);
                    console.log("aclass: "+a.className);
                    a.className="tiles"+ " tile"+value;
                    console.log("a.class: "+a.className);
                }
                else
                {
                    console.log("i,j: "+i+","+j);
                    var divId= (4*i)+j;
                    console.log("divId: "+divId);
                    
                    var a= document.getElementById(divId);
                    
                    console.log("a.id: "+a.id);
                    var value=realBoard[i][j];
                    if(a.childElementCount!=0)
                    a.removeChild(a.childNodes[0]);
                    
                    console.log("value: "+value);
                    console.log("aclass: "+a.className);
                    a.className="tiles";
                    console.log("a.class: "+a.className);
                }
                
            }
        }
    }

function play(realBoard)
    {   console.log("Start ka value: " +start);
        if(start===1)        
        {   console.log("Working_play");
            var a= document.getElementsByTagName('body');
            a[0];
            console.log("Heretoo");
            a[0].addEventListener("keydown", givekeycode);
        }       
    }

function givekeycode(event)
    {
        console.log("WorkingGiveKeycode");
        var choice= event.keyCode;
        console.log("Hi "+choice);
        // console.log(realBoard[0][0]);
        MoverealBoardInThatDirection(realBoard, choice);
        realBoardSum(realBoard,choice);
        generatearandomnumber(realBoard);
        setBoardOnScreen(realBoard);
        getscore();
        var lost= checkfinish(realBoard);
        console.log("Lost: "+ lost);
            if(lost==1)
            {
                start=0;
                var gameover= document.getElementById('outerdiv');
                gameover.style.opacity=1;
                var gameovertext= document.getElementById('textondiv');
                gameovertext.innerHTML="GAME OVER";
            }
            if(finish===1)
            {
                var z= confirm("Hurray! 2048! Want to continue?");
                if(z===1)
                {
                    start=1;
                }
                else if(z===false)
                {                 
                    start=0;
                    console.log("z ka false case....."+ start);
                }
                finish=0;
            }
        
    }

function MoverealBoardInThatDirection(realBoard, keycode)
    {
        if(keycode===38)
        {
            for(var j =0; j<4;j++)
            {
                var a=0;
                for(var i =0; i<4; i++)
                {
                    if (realBoard[i][j]!=0)
                    {
                        realBoard[a++][j]=realBoard[i][j];
                        if(a-1!=i)
                        realBoard[i][j]=0;
                    }
                }
            }
        }
        else if(keycode===40)
        {
            for(var j =0; j<4;j++)
            {
                var a=3;
                for(var i =3; i>=0; i--)
                {
                    if (realBoard[i][j]!=0)
                    {
                        realBoard[a--][j]=realBoard[i][j];
                        if(a+1!=i)
                        realBoard[i][j]=0;
                    }
                }
            }
        }
        else if(keycode===37)
        {
            for(var i =0; i<4;i++)
            {
                var a=0;
                for(var j =0; j<4; j++)
                {
                    if (realBoard[i][j]!=0)
                    {
                        realBoard[i][a++]=realBoard[i][j];
                        if(a-1!=j)
                        realBoard[i][j]=0;
                    }
                }
            }
        }
        else if(keycode===39)
        {
            for(var i =0; i<4;i++)
            {
                var a=3;
                for(var j =3; j>=0; j--)
                {
                    if (realBoard[i][j]!=0)
                    {
                        realBoard[i][a--]=realBoard[i][j];
                        if(a+1!=j)
                        realBoard[i][j]=0;
                    }
                }
            }
        }

    }

function checkZeroLeft(realBoard)
    {
        for(var i =0; i<4; i++)
        {
            for(var j =0; j<4; j++)
            {
                if (realBoard[i][j]==0)
                    return 1;
            }
        }
        return 0;
    }

function RecursiveCall(realBoard, values, x, y)
    {
        var check=0;
        if(x<0||x>3||y<0||y>3)
        {
           return;
        }
        if(values[x][y]==1)
        {
            return check;
        }
        values[x][y]=1;
        if(x<3 && check===0 &&realBoard[x][y]!=realBoard[x+1][y])
        {
            check=RecursiveCall(realBoard, values, x+1, y);
        }
        else if(x<3&&realBoard[x][y]===realBoard[x+1][y])
        {
            check=1;
        }
        if(y<3 && check===0 &&realBoard[x][y]!=realBoard[x][y+1])
        {
            check=RecursiveCall(realBoard, values, x, y+1);
        }
        else if(y<3&&realBoard[x][y]===realBoard[x][y+1])
        {
            check=1;
        }
        return check ;
    }

function checkfinish(realBoard)
    {
        var zeroleft= checkZeroLeft(realBoard);
        if(zeroleft==0)
        {
            var values= new Array(4);
            for(var a=0; a<4; a++)
            {
                values[a]= new Array(4);
            }
            
            for(var i=0; i<4;i++)
            {
                for(var j=0; j<4; j++)
                {
                    values[i][j]=0;
                }
            }
            
            
            var check=RecursiveCall(realBoard, values, 0, 0);
            if(check===0)
            {
                return 1;//lost
            }
            else
            {
                return 0;
            }
        }
        return 0;
    }

function realBoardSum(realBoard, choice)
    {
        if(choice===38)
        {
            for(var j =0; j<4; j++)
            {
                for(var i =0; i<4; i++)
                {
                    if(realBoard[i][j]===0)
                    {
                        break;
                    }
                    if(i!=3&&realBoard[i][j]===realBoard[i+1][j])
                    {   
                        realBoard[i][j]=2*realBoard[i][j];
                        score=score+realBoard[i][j];
                        if(realBoard[i][j]===2048)
                        {
                            finish=1;
                        }
                        realBoard[i+1][j]=0;
                        i++;
                    }
                }
            }
            MoverealBoardInThatDirection(realBoard,38);
        }

        if(choice===40)
        {
            for(var j =0; j<4; j++)
            {
                for(var i =3; i>=0; i--)
                {
                    if(realBoard[i][j]===0)
                    {
                        break;
                    }
                    if(i!=0&&realBoard[i][j]===realBoard[i-1][j])
                    {  
                        realBoard[i][j]=2*realBoard[i][j];
                        score=score+realBoard[i][j];
                        if(realBoard[i][j]===2048)
                        {
                            finish=1;
                        }
                        realBoard[i-1][j]=0;
                        i--;
                    }
                }
            }
            MoverealBoardInThatDirection(realBoard,40);
        }

        if(choice===37)
        {
            for(var i =0; i<4; i++)
            {
                for(var j =0; j<4; j++)
                {
                    if(realBoard[i][j]===0)
                    {
                        break;
                    }
                    if(j!=3&&realBoard[i][j]===realBoard[i][j+1])
                    {  
                        realBoard[i][j]=2*realBoard[i][j];
                        score=score+realBoard[i][j];
                        if(realBoard[i][j]===2048)
                        {
                            finish=1;
                        }
                        realBoard[i][j+1]=0;
                        j++;
                    }
                }
            }
            MoverealBoardInThatDirection(realBoard,37);
        }

        if(choice===39)
        {
            for(var i =0; i<4; i++)
            {
                for(var j =3; j>=0; j--)
                {
                    if(realBoard[i][j]===0)
                    {
                        break;
                    }
                    if(j!=0&&realBoard[i][j]===realBoard[i][j-1])
                    {  
                        realBoard[i][j]=2*realBoard[i][j];
                        score=score+realBoard[i][j];
                        if(realBoard[i][j]===2048)
                        {
                            finish=1;
                        }
                        realBoard[i][j-1]=0;
                        j--;
                    }
                }
            }
            MoverealBoardInThatDirection(realBoard,39);
        }
    }

function generatearandomnumber(realBoard)
    {
        if(checkZeroLeft(realBoard)===1)
        {   var randomnumber=Math.random()*10;
            if(randomnumber<7)
            {
                randomnumber=2;
            }
            else
            {
                randomnumber=4;
            }
            while(1)
            {
                var randomposition=parseInt(Math.random()*16);
                if(realBoard[parseInt(randomposition/4)][randomposition%4]!=0)
                {
                    continue;
                }
                realBoard[parseInt(randomposition/4)][randomposition%4]=randomnumber;
                break;
            }
        }
    }    

function getscore()
    {
        var a= document.getElementById('scorevalue');
        a.innerHTML= score; //parseInt(a.innerHTML.trim(a.innerHTML));
    }

var lost=0;

function main()
    {      
        RandomNumberGenerator(realBoard);
        printBoard(realBoard);
        setBoardOnScreen(realBoard);
        play(realBoard);    
    }