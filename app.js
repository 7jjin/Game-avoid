const canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

//size
canvas.width = window.innerWidth-20 ;
canvas.height = window.innerHeight-20;

// 배경 화면
ctx.fillStyle = '#12bbFF';
ctx.fillRect(0,0,canvas.width, canvas.height);

let image1 = new Image();
image1.src = "zhsks.jpg";

let image2 = new Image();
image2.src = "demo.png";

// 이미지 load후 draw
function drawOnImage(image,x,y,w,h){
    image.onload = function(){
        ctx.drawImage(image,x,y,w,h);
    }
}

// 캐릭터 Object
let character = {
    x: 10,      // x좌표
    y: canvas.height/2,     // y좌표
    width: 50,  // 캐릭터 넓이
    height: 50, // 캐릭터 높이
    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(image1,this.x,this.y,this.width,this.height);  // 이미지 가져오기
    }
}




//악당들
class villain{
    constructor(){
        this.x = canvas.width;      // 악당 나오는 위치
        this.y = Math.floor((Math.random()*1000)); //100~1000사이 숫자 램덤
        this.width = 50;
        this.height = 50;
    }
    draw() {
        if(this.y<=100) this.y += 200;
        else if(this.y >= canvas.height -100) this.y -=500;
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(image2,this.x,this.y,this.width,this.height);
    }
}


// 충돌 함수
function checkCollision(character,villain){
    let collsion = false;
    if(
        (
            (villain.x<character.x && character.x <= villain.x +50)
            ||
            (villain.x<= character.x +50 && character.x +50 <= villain.x +50)
        )&&
        (
            (villain.y<character.y && character.y <= villain.y +50)
            ||
            (villain.y<= character.y +50 && character.y +50 <= villain.y +50)
        )
    )
    {
        collsion = true;
    }
    if(collsion){
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
    timer++;        //1초에 60증가

    ctx.fillRect(0,0,canvas.width,canvas.height);

    // 악당이 생성되는 빈도 수
    if(timer % 60 ===0){
        let villainNew = new villain();
        villains.push(villainNew);
    }
    villains.forEach((item)=>{
        item.x-=2;    // 적이 다가오는 속도
        
        checkCollision(character, item);

        item.draw();
    })
    if(up){
        up=false;
        character.y -= 20;
    }
    if(down){
        down = false;
        character.y +=20;
    }
    if(left){
        left=false;
        character.x -= 20;
    }
    if(right){
        right = false;
        character.x +=20;
    }
    // 주인공 속도
    character.draw(); 
    if(timer ===3600) cancelAnimationFrame(animation);  // 1분동안 실행 후 멈춤
}
frameAnimation();


document.addEventListener("keydown",function(e){
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