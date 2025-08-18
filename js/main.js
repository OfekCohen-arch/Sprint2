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
const memesSection = document.querySelector('.memes-section')
memesSection.style.display = 'none'
renderGallery()
}

function resizeCanvas(){
  const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.clientHeight
    gCtx.fillStyle = "white";
gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);  
}
function toggleMenu() {
            document.body.classList.toggle('menu-open');
        }

function goToGallery(){
const editor = document.querySelector('.editor-section')
editor.style.display = 'none'
const gallery = document.querySelector('.gallery-container')
gallery.style.display = 'grid'
const memesSection  = document.querySelector('.memes-section')
memesSection.style.display = 'none'
renderGallery()
}   
function showMemes(){
const editor = document.querySelector('.editor-section')
editor.style.display = 'none' 
const gallery = document.querySelector('.gallery-container')
gallery.style.display = 'none'
const memesSection  = document.querySelector('.memes-section')
memesSection.style.display = 'grid'
renderMemes()
}     