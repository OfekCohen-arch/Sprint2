'use strict'
var gImgs = [
    {id: 1, url: 'img/meme-imgs (square)/1.jpg'},
    {id: 2, url: 'img/meme-imgs (square)/2.jpg'},
    {id: 3, url: 'img/meme-imgs (square)/3.jpg'},
    {id: 4, url: 'img/meme-imgs (square)/4.jpg'},
    {id: 5, url: 'img/meme-imgs (square)/5.jpg'},
    {id: 6, url: 'img/meme-imgs (square)/6.jpg'},
    {id: 7, url: 'img/meme-imgs (square)/7.jpg'},
    {id: 8, url: 'img/meme-imgs (square)/8.jpg'},
    {id: 9, url: 'img/meme-imgs (square)/9.jpg'},
    {id: 10, url: 'img/meme-imgs (square)/10.jpg'},
    {id: 11, url: 'img/meme-imgs (square)/11.jpg'},
    {id: 12, url: 'img/meme-imgs (square)/12.jpg'},
    {id: 13, url: 'img/meme-imgs (square)/13.jpg'},
    {id: 14, url: 'img/meme-imgs (square)/14.jpg'},
    {id: 15, url: 'img/meme-imgs (square)/15.jpg'},
    {id: 16, url: 'img/meme-imgs (square)/16.jpg'},
    {id: 17, url: 'img/meme-imgs (square)/17.jpg'},
    {id: 18, url: 'img/meme-imgs (square)/18.jpg'},
    {id: 19, url: 'img/meme-imgs (various aspect ratios)/2.jpg'},
    {id: 20, url: 'img/meme-imgs (various aspect ratios)/003.jpg'},
    {id: 21, url: 'img/meme-imgs (various aspect ratios)/004.jpg'},
    {id: 22, url: 'img/meme-imgs (various aspect ratios)/005.jpg'},
    {id: 23, url: 'img/meme-imgs (various aspect ratios)/5.jpg'},
    {id: 24, url: 'img/meme-imgs (various aspect ratios)/006.jpg'},
    {id: 25, url: 'img/meme-imgs (various aspect ratios)/img5.jpg'},
    {id: 26, url: 'img/meme-imgs (various aspect ratios)/img4.jpg'},
    {id: 27, url: 'img/meme-imgs (various aspect ratios)/img2.jpg'},
    {id: 28, url: 'img/meme-imgs (various aspect ratios)/drevil.jpg'},
    {id: 29, url: 'img/meme-imgs (various aspect ratios)/Ancient-Aliens.jpg'},
    {id: 30, url: 'img/meme-imgs (various aspect ratios)/meme1.jpg'},
    {id: 31, url: 'img/meme-imgs (various aspect ratios)/leo.jpg'},
    {id: 32, url: 'img/meme-imgs (various aspect ratios)/img12.jpg'},
    {id: 33, url: 'img/meme-imgs (various aspect ratios)/img11.jpg'},
    {id: 34, url: 'img/meme-imgs (various aspect ratios)/img6.jpg'},
    {id: 35, url: 'img/meme-imgs (various aspect ratios)/X-Everywhere.jpg'},
    {id: 36, url: 'img/meme-imgs (various aspect ratios)/putin.jpg'},
    {id: 37, url: 'img/meme-imgs (various aspect ratios)/patrick.jpg'},
    {id: 38, url: 'img/meme-imgs (various aspect ratios)/Oprah-You-Get-A.jpg'},
    {id: 39, url: 'img/meme-imgs (various aspect ratios)/One-Does-Not-Simply.jpg'},
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