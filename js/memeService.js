'use strict'
var gImgs = [
    {id: 1, url: 'img/meme-imgs (square)/1.jpg', keywords: ['donald', 'trump']},
    {id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords:['dog']},
    {id: 3, url: 'img/meme-imgs (square)/3.jpg', keywords:['dog']},
    {id: 4, url: 'img/meme-imgs (square)/4.jpg', keywords:['dog']},
    {id: 5, url: 'img/meme-imgs (square)/5.jpg', keywords:['dog']},
    {id: 6, url: 'img/meme-imgs (square)/6.jpg', keywords:['dog']},
    {id: 7, url: 'img/meme-imgs (square)/7.jpg', keywords:['dog']},
    {id: 8, url: 'img/meme-imgs (square)/8.jpg', keywords: ['donald', 'trump']},
    {id: 9, url: 'img/meme-imgs (square)/9.jpg', keywords:['dog']},
    {id: 10, url: 'img/meme-imgs (square)/10.jpg', keywords:['dog']},
    {id: 11, url: 'img/meme-imgs (square)/11.jpg', keywords:['dog']},
    {id: 12, url: 'img/meme-imgs (square)/12.jpg', keywords:['dog']},
    {id: 13, url: 'img/meme-imgs (square)/13.jpg', keywords:['dog']},
    {id: 14, url: 'img/meme-imgs (square)/14.jpg', keywords:['dog']},
    {id: 15, url: 'img/meme-imgs (square)/15.jpg', keywords:['dog']},
    {id: 16, url: 'img/meme-imgs (square)/16.jpg', keywords:['dog']},
    {id: 17, url: 'img/meme-imgs (square)/17.jpg', keywords:['dog']},
    {id: 18, url: 'img/meme-imgs (square)/18.jpg', keywords:['dog']},
]
var gMeme = {
 selectedImgId: 1,
 selectedLineIdx: 0,
 lines: [
 
 ]
}
var gSelectedColor  = 'black'
var gSelectedSize = 40

function getMeme(){
    return gMeme
}
function getImages(){
    return gImgs
}
function getImgById(id){
    const img = gImgs.find(img=>(id === img.id))
    return img.url
}
function setLineTxt(txt){
    if(gMeme.lines.length === 0) addLine()
gMeme.lines[gMeme.selectedLineIdx].txt = txt
}
function setImg(id){
gMeme.selectedImgId = id
}
function setColor(color){
gSelectedColor = color
 if(gMeme.lines.length === 0)  return
gMeme.lines[gMeme.selectedLineIdx].color = gSelectedColor
}
function setSize(diff){
gSelectedSize += diff
 if(gMeme.lines.length === 0)  return
gMeme.lines[gMeme.selectedLineIdx].size = gSelectedSize
}
function addLine(){
gMeme.lines.push(
    {
      txt: '',
      size: gSelectedSize,
      color: gSelectedColor,
      startX:'',
      startY:'',
      height:'',
      width:''  
    }
)
gMeme.selectedLineIdx = gMeme.lines.length-1
}
function switchLine(){
    if(gMeme.lines.length === 0) return ''
    gMeme.selectedLineIdx++
    if(gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
    gSelectedColor = gMeme.lines[gMeme.selectedLineIdx].color
    gSelectedSize = gMeme.lines[gMeme.selectedLineIdx].size
    return gMeme.lines[gMeme.selectedLineIdx].txt
}
function addLocation(startX,startY,idx){
gMeme.lines[idx].startX = startX
gMeme.lines[idx].startY = startY
}
function addHeightandWidth(height,width,idx){
gMeme.lines[idx].height = height
gMeme.lines[idx].width = width
}
function selectLine(x,y){
for(let i = 0;i<gMeme.lines.length;i++){
const startX = gMeme.lines[i].startX
const startY = gMeme.lines[i].startY
const endX = startX + gMeme.lines[i].width
const endY = startY +gMeme.lines[i].height
if(x<=endX && x>=startX && y<=endY && y>=startY){
    switchLine()
    return
}
}
}