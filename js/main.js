'use strict'
var gElCanvas
var gCtx

function onInit(){
gElCanvas = document.querySelector('canvas')
gCtx = gElCanvas.getContext('2d')
resizeCanvas()
const editor = document.querySelector('.editor-section')
editor.style.display = 'none'
renderGallery()
}

function resizeCanvas(){
  const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.clientHeight
    gCtx.fillStyle = "white";
gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);  
}
function drawText(text,size,color,y,i) {
    const x = gElCanvas.width/2
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = size+'px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    if(i === getMeme().selectedLineIdx){
      const metrics = gCtx.measureText(text);
      const textWidth = metrics.width;
      const textHeight = size;
      const startX = x - textWidth/2
      const startY = y - metrics.actualBoundingBoxAscent
      gCtx.strokeStyle = 'black';
      gCtx.lineWidth = 2;
      gCtx.strokeRect(startX,startY, textWidth, textHeight);
    }
}
function drawImg(elImg){
     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}
function toggleMenu() {
            document.body.classList.toggle('menu-open');
        }
        