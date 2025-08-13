'use strict'
var gImgs = [
    {id: 1, url: 'img/meme-imgs (square)/1.jpg', keywords: ['donald', 'trump']},
    {id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords:['dog']},
    {id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords:['dog']},
    {id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords:['dog']},
    {id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords:['dog']},
    {id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords:['dog']}
]
var gMeme = {
 selectedImgId: 1,
 selectedLineIdx: 0,
 lines: [
 
 ]
}

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
gMeme.lines[gMeme.selectedLineIdx].txt = txt
}
function setImg(id){
gMeme.selectedImgId = id
}
function setColor(color){
gMeme.lines[gMeme.selectedLineIdx].color = color
}
function setSize(diff){
gMeme.lines[gMeme.selectedLineIdx].size+=diff
}
function addLine(){
gMeme.lines.push(
    {
      txt: '',
      size: 40,
      color: 'black',
      startX:'',
      startY:'',
      height:'',
      width:''  
    }
)
gMeme.selectedLineIdx = gMeme.lines.length-1
}
function switchLine(){
    gMeme.selectedLineIdx++
    if(gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
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