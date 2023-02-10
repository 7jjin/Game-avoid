const canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

//size
canvas.width = window.innerWidth -100;
canvas.height = window.innerHeight -100;

// 배경 화면
ctx.fillStyle = '#12bbFF';
ctx.fillRect(0,0,canvas.width, canvas.height);

// ctx.fillStyle = 'black';
// ctx.fillRect(10,10,50,50);

let image1 = new Image();
image1.src = "zhsks.jpg";

let image2 = new Image();
image2.src = "demo.png";

// 캐릭터 Object
let character = {
    x: 10,      // x좌표
    y: 200,     // y좌표
    width: 50,  // 캐릭터 넓이
    height: 50, // 캐릭터 높이
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(image1,this.x,this.y,this.width,this.height);  // 이미지 가져오기
    }
}
character.draw();   // 주인공 생성

// 이미지 load후 draw
function drawOnImage(image,x,y,w,h){
    image.onload = function(){
        ctx.drawImage(image,x,y,w,h);
    }
}

//악당들
class villain{
    constructor(){
        this.x = 500;
        this.y = Math.floor((Math.random()*1000))+1; //100~1000사이 숫자 램덤
        this.width = 50;
        this.height = 50;
    }
    draw() {
        if(this.y<=100) this.y += 200;
        else if(this.y >= canvas.height -100) this.y -=500;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(image2,this.x,this.y,this.width,this.height);
    }
}
let v1 = new villain();
v1.draw();      // 악당들 생성

// 충돌 함수
function checkCollision(character,villain){
    let collsion = false;
    if(
        (
            (villain.x<character.x && character.x <= villain.x +50)||(villain.x<= character.x +50 && character.x +50 <= villain.x +50)
        )&&
        (
            (villain.y<character.y && character.y <= villain.y +50)||(villain.y<= character.y +50 && character.y +50 <= villain.y +50)
        )
    )
    {
        collsion = true;
    }
    if(collsion){
        ctx.fillStyle = "blue";
        ctx.fillRect(villain.x-50,villain-50,villain.width+100, villain.height+100)
        ctx.fillStyle="yellow";
        ctx.fillRect(character.x-50,character.y-50,character.width+100, character.height+100)
        cancelAnimationFrame(animation);
    }
}



// 주인공 이동하기
let timer = 0;
let villains =[];
let animation;
let up,down,left,right;
function frameAnimation(){
    animation = requestAnimationFrame(frameAnimation)
    timer++;

    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = '#12bbFF';
    ctx.fillRect(0,0,canvas.width,canvas.height);


    if(timer % 30 ===0){
        let villainNew = new villain();
        villains.push(villainNew);
    }
    villains.forEach((object,index,array)=>{
        if(object.x<0){
            array.splice(index,1);
        }
        object.x-=2;

        checkCollision(character, object);

        object.draw();
    })
    if(up){
        up=false;
        character.y -= 7;
    }
    if(down){
        down = false;
        character.y +=7;
    }
    if(left){
        left=false;
        character.x -= 7;
    }
    if(right){
        right = false;
        character.x +=7;
    }


    character.draw(); 
    if(timer ===5000) cancelAnimationFrame(animation);
}
frameAnimation();

document.addEventListener("keydown",function(e){
    console.log(e.code);
    if(e.code==="ArrowUp"){
        up=true;
    }else if(e.code==="ArrowDown"){
        down = true;
    }else if(e.code ==="ArrowLeft"){
        left = true;
    }else if(e.code==="ArrowRight"){
        right = true;
    }
})