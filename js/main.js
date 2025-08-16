'use strict'
var gElCanvas
var gCtx
var gIsMemeDownloaded = false

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
function drawText(text,size,color,font,textAlign,i) {
    var x
     if(textAlign === 'center') x = gElCanvas.width/2
     else if(textAlign === 'left') x = 5
     else x = gElCanvas.width - 5
    gCtx.beginPath()
    gCtx.font = size+'px '+font
    const metrics = gCtx.measureText(text)
    var textWidth
    textWidth = metrics.width
     const textHeight = size
      var startX
      if(textAlign === 'center') startX = x - textWidth/2
      else if(textAlign === 'left') startX = x
      else startX = x - textWidth
      var startY 
      if(!getMeme().lines[i].startY){
        if(i === 0) startY = 10
        else if(i === 1) startY = gElCanvas.height - textHeight
        else startY = gElCanvas.height/2-textHeight/2
      }
      else startY = getMeme().lines[i].startY
      addLocation(startX,startY,i)
      addHeightandWidth(textHeight,textWidth,i)
    if(i === getMeme().selectedLineIdx && !gIsMemeDownloaded){
      drawFrame(startX,startY,textWidth,textHeight)
    }
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color
    gCtx.fillStyle = color
    gCtx.textAlign = textAlign
    gCtx.textBaseline = 'middle'
    var y = startY + textHeight/2
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
     
}
function drawImg(elImg){
     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}
function toggleMenu() {
            document.body.classList.toggle('menu-open');
        }
function drawFrame(startX,startY,textWidth,textHeight){
  gCtx.beginPath()
      gCtx.strokeStyle = 'black';
      gCtx.lineWidth = 2;
      gCtx.roundRect(startX-10,startY-10, textWidth+20, textHeight+20,50);
      gCtx.fillStyle = 'rgba(255,255,255,0.5)'
      gCtx.fill()
}
function goToGallery(){
const editor = document.querySelector('.editor-section')
editor.style.display = 'none'
const gallery = document.querySelector('.gallery-container')
gallery.style.display = 'grid'
}        