const canvas    = document.querySelector('canvas');
const ctx       = canvas.getContext("2d");
const lineWid   = document.getElementById('lineWidth');
const color     = document.getElementById('color');
const colOps    = Array.from(document.getElementsByClassName('colorOption'));
const modeBtn   = document.getElementById("modeBtn");
const resetBtn  = document.getElementById("resetBtn");
const eraserBtn = document.getElementById("eraserBtn");
const fileBtn   = document.getElementById("file");
const txtBtn    = document.getElementById("text");
const saveBtn   = document.getElementById("save");
const CAN_WID  = 800;
const CAN_HEI  = 800;
canvas.width   = CAN_WID;
canvas.height  = CAN_HEI;
let isPaint    = false;
let isFill     = false;

const colors = [
    "#fad390",
    "#f8c291",
    "#6a89cc",
    "#82ccdd",
    "#b8e994",
    "#f6b93b",
    "#e55039",
    "#4a69bd",
    "#60a3bc",
    "#78e08f",
    "#fa983a",
    "#eb2f06",
    "#1e3799",
    "#3c6382",
    "#38ada9",
    "#e58e26",
    "#b71540",
    "#0c2461",
    "#0a3d62",
    "#079992"
];


ctx.lineWidth   = lineWid.value;
ctx.strokeStyle = color.value;
ctx.lineCap     = 'round';

function paint()
{
    isPaint = true;
}

function quitPaint(){
    isPaint = false;
    ctx.beginPath();
}

function onMouseMove(e){
    if(isPaint){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return;
    }
    
    ctx.moveTo(e.offsetX, e.offsetY);
}

function changeWidth(e){
    ctx.lineWidth = e.target.value;
}

function changeColor(e){
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle   = e.target.value;
}

function onClickColor(e){
    const colorVal  = e.target.dataset.color
    ctx.strokeStyle = colorVal;
    ctx.fillStyle   = colorVal;
    color.value     = colorVal;
}

function fillColor(){
    if(isFill){
        isFill = false;
        modeBtn.innerText = 'fill';
    }else{
        isFill = true;
        modeBtn.innerText = 'draw';
    }
}

function onCanvasClick(e){
    if(isFill){
        ctx.fillRect(0, 0, CAN_WID, CAN_HEI);
    }
}

function reset(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CAN_WID, CAN_HEI);
}

function eraser(){
    modeBtn.innerText = 'draw';
    isFill            = false;
    ctx.strokeStyle = "white";
}

function fileChange(e){
 const file = e.target.files[0];
 const url  = URL.createObjectURL(file);
 const image  = new Image();
 image.src    = url;
 image.onload = function (){
    ctx.drawImage(image, 0, 0, CAN_WID, CAN_HEI);
    fileBtn.value = null;
 };
}

function onCanvasDoubleClick(e){
    const txt       = txtBtn.value;
    if(txt !== ''){
        ctx.save();
        ctx.lineWidth   = 1;
        ctx.font        = "40px serif";
        ctx.fillText(txt, e.offsetX, e.offsetY);
        ctx.restore();
    }
}

function saveClick(){
    const url  = canvas.toDataURL();
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'myPic.png';
    a.click();
}

canvas.addEventListener("mousedown", paint);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", quitPaint);
canvas.addEventListener("mouseleave", quitPaint);
lineWid.addEventListener("change", changeWidth);
color.addEventListener("change", changeColor);
modeBtn.addEventListener("click", fillColor);
resetBtn.addEventListener("click", reset);
eraserBtn.addEventListener("click", eraser);
fileBtn.addEventListener("change", fileChange);
saveBtn.addEventListener("click", saveClick);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onCanvasDoubleClick);

colOps.forEach(color => color.addEventListener("click", onClickColor));
