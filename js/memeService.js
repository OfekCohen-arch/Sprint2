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
 id: '',
 selectedImgId: 1,
 selectedLineIdx: 0,
 lines: [
 
 ],
 data: ''
}
var gMemes = loadMemesFromStorage() || []
var gSelectedColor  = '#000000'
var gSelectedSize = 40
var gSelectedFont = 'Arial'
var gSelectedTextAlign = 'center'
var gSelectedStroke = '#000000'

function getMeme(){
    return gMeme
}
function getMemes(){
    return gMemes
}
function selectMeme(id){
const idx = getMemeIdxById(id)
gMeme = gMemes[idx]
}
function getMemeIdxById(id){
return gMemes.findIndex(meme =>(meme.id === id))
}
// add and delete meme
function addMeme(data){
gMeme.id = getRandomId()
gMeme.data = data
gMemes.push(gMeme)
saveMemesToStorage(gMemes)
}
function updateMeme(data){
gMeme.data = data
saveMemesToStorage(gMemes)
}
function resetMeme(){
gMeme.id = ''
gMeme.data =''
deleteAllLines()
}
function deleteMeme(id){
const memeIdx = getMemeIdxById(id)
gMemes.splice(memeIdx,1)
saveMemesToStorage(gMemes)
}
function getImages(){
    return gImgs
}
function getImgById(id){
    const img = gImgs.find(img=>(id === img.id))
    return img.url
}
// set meme properties
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
function setStroke(stroke){
gSelectedStroke = stroke
 if(gMeme.lines.length === 0)  return
gMeme.lines[gMeme.selectedLineIdx].stroke = gSelectedStroke    
}
function setSize(diff){
gSelectedSize += diff
if(gMeme.lines.length === 0)  return
gMeme.lines[gMeme.selectedLineIdx].size = gSelectedSize
}
function setFont(font){
gSelectedFont = font
 if(gMeme.lines.length === 0)  return
gMeme.lines[gMeme.selectedLineIdx].font = font
}
function setTextAlign(textAlign){
gSelectedTextAlign = textAlign
if(gMeme.lines.length === 0)  return
gMeme.lines[gMeme.selectedLineIdx].textAlign = textAlign
}
function setLocation(diff){
if(gMeme.lines.length === 0)  return
gMeme.lines[gMeme.selectedLineIdx].startY+=diff
}
// add properties to the line
function addLocation(startX,startY,idx){
gMeme.lines[idx].startX = startX
gMeme.lines[idx].startY = startY
}
function addHeightandWidth(height,width,idx){
gMeme.lines[idx].height = height
gMeme.lines[idx].width = width
}
// select line
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

// add switch and delete lines
function addLine(){
gMeme.lines.push(
    {
      txt: '',
      size: gSelectedSize,
      color: gSelectedColor,
      stroke: gSelectedStroke,
      font: gSelectedFont,
      textAlign: gSelectedTextAlign,
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
    gSelectedStroke = gMeme.lines[gMeme.selectedLineIdx].stroke
    return gMeme.lines[gMeme.selectedLineIdx].txt
}
function deleteLine(){
if(gMeme.lines.length === 0) return
gMeme.lines.splice(gMeme.selectedLineIdx,1)
gMeme.selectedLineIdx--
if(gMeme.selectedLineIdx<=-1){
if(gMeme.lines.length === 0){
gSelectedColor = 'black'
gSelectedSize = 40
gSelectedFont = 'arial'
gSelectedTextAlign = 'center'  
gSelectedStroke  = 'black'
resetInputs()
}
else{
gMeme.selectedLineIdx = gMeme.lines.length-1
gSelectedColor = gMeme.lines[gMeme.selectedLineIdx].color
gSelectedSize = gMeme.lines[gMeme.selectedLineIdx].size
gSelectedStroke = gMeme.lines[gMeme.selectedLineIdx].stroke
updateInputs()
}
}
else{
gSelectedColor = gMeme.lines[gMeme.selectedLineIdx].color
gSelectedSize = gMeme.lines[gMeme.selectedLineIdx].size 
gSelectedStroke = gMeme.lines[gMeme.selectedLineIdx].stroke
updateInputs()
}
}
// reset meme
function deleteAllLines(){
    gMeme = {
 selectedImgId: 1,
 selectedLineIdx: 0,
 lines: [
 
 ]
}
gSelectedColor = '#000000'
gSelectedSize = 40
gSelectedFont = 'Arial'
gSelectedTextAlign = 'center'
gSelectedStroke  = '#000000'
}