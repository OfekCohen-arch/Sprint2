'use strict'
var gElCanvas
var gCtx

function onInit(){
gElCanvas = document.querySelector('canvas')
gCtx = gElCanvas.getContext('2d')
resizeCanvas()
var img = new Image()
img.src = 'img/meme-imgs (square)/2.jpg'
renderMeme('goede morgen',img)
}

function resizeCanvas(){
  const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.clientHeight
    gCtx.fillStyle = "white";
gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);  
}
function drawText(text, x=gElCanvas.width/2, y=30) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'blue'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}
function drawImg(elImg){
     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}