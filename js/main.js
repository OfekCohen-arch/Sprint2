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
    gCtx.strokeStyle = color
    gCtx.fillStyle = color
    gCtx.font = size+'px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    const metrics = gCtx.measureText(text);
      const textWidth = metrics.width;
      const textHeight = size;
      const startX = x - textWidth/2
      const startY = y - metrics.actualBoundingBoxAscent
      addLocation(startX,startY,i)
      addHeightandWidth(textHeight,textWidth,i)
    if(i === getMeme().selectedLineIdx){
      gCtx.strokeStyle = 'black';
      gCtx.lineWidth = 2;
      gCtx.strokeRect(startX-5,startY-5, textWidth+10, textHeight+10);
    }
}
function drawImg(elImg){
     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}
function toggleMenu() {
            document.body.classList.toggle('menu-open');
        }
        