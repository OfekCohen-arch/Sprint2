'use strict'
// render the saved memes
function renderMemes(){
const memesContainer = document.querySelector('.memes-container')
const memes = getMemes()
var str = ''
if(memes.length === 0){
  str = `<p> There are not memes yet</p>`
}
else{
memes.forEach(meme => {
 str+=`
 <div class="card" >
 <button class="remove-btn" onclick="onRemoveMeme('${meme.id}')">X</button>
<img src="${meme.data}" onclick="onSelectMeme('${meme.id}')"/>
 </div>
 `   
})
}
memesContainer.innerHTML = str  
}
function onSelectMeme(id){
selectMeme(id)
const memesSection  = document.querySelector('.memes-section')
memesSection.style.display = 'none'
renderMeme()
}
// render the meme
function renderMeme(){
    const editor = document.querySelector('.editor-section')
    editor.style.display = 'flex'
    const meme = getMeme()
    const imgSrc = getImgById(meme.selectedImgId)
    const img = new Image()
    img.src = imgSrc
    img.onload = function() {
    drawImg(img)
    const lines = meme.lines
    for(let i = 0;i<lines.length;i++){
    const line = meme.lines[i]
    const txt = line.txt
    const size = line.size
    const color = line.color
    const stroke = line.stroke
    const font = line.font
    const textAlign = line.textAlign
    drawText(txt,size,color,stroke,font,textAlign,i)
    const lineText = document.querySelector('.line-text')
    if(meme.selectedLineIdx === i)lineText.value = txt
    }
    }
}
function drawText(text,size,color,stroke,font,textAlign,i) {
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
    gCtx.strokeStyle = stroke
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
function drawFrame(startX,startY,textWidth,textHeight){
  gCtx.beginPath()
      gCtx.strokeStyle = 'black';
      gCtx.lineWidth = 2;
      gCtx.roundRect(startX-10,startY-10, textWidth+20, textHeight+20,50);
      gCtx.fillStyle = 'rgba(255,255,255,0.5)'
      gCtx.fill()
}
// set properties
function onSetLineTxt(txt){
setLineTxt(txt)
renderMeme()
}
function clickColorInput(colorBtn){
    const colorInput = document.querySelector('.color-input')
colorBtn.addEventListener('click', () => {
    colorInput.click()
  })
}
function onSetColor(color){
    setColor(color)
    renderMeme()
}
function clickStrokeInput(strokeBtn){
     const strokeInput = document.querySelector('.stroke-input')
strokeBtn.addEventListener('click', () => {
    strokeInput.click()
  })
}
function onSetStroke(stroke){
setStroke(stroke)
renderMeme()
}
function onSetSize(diff){
setSize(diff)
renderMeme()
}
function onSetFont(font){
setFont(font)
renderMeme()
}
function onSetTextAlign(textAlign){
setTextAlign(textAlign)
renderMeme()
}
function onSetLocation(diff){
setLocation(diff)
renderMeme()
}
// add switch and delete line
function onAddLine(){
addLine()    
const lineText = document.querySelector('.line-text')
lineText.value = ''
renderMeme()
resetInputs()
}
function onSwitchLine(){
    const lineText = document.querySelector('.line-text')
    lineText.value = switchLine() 
    renderMeme()
    updateInputs()
}
function onSelectLine(ev){
const x = ev.offsetX
const y = ev.offsetY
selectLine(x,y)
renderMeme()
updateInputs()
}

function onDeleteLine(){
    deleteLine()
    const lineText = document.querySelector('.line-text')
    lineText.value = getMeme().lines[getMeme().selectedLineIdx]
    if(getMeme().lines.length === 0) lineText.value = ''
    renderMeme()
}
// download meme
function downloadMeme(){
  gIsMemeDownloaded = true
  renderMeme()
  setTimeout(()=>{
  gIsMemeDownloaded = false
  const dataURL = gElCanvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'meme.jpeg';
  link.click()
  },1500)
  
}
// share meme
function onShareMeme(ev){
ev.preventDefault()
gIsMemeDownloaded = true
renderMeme()
var canvasData
function onSuccess(uploadedImgUrl){
 canvasData = gElCanvas.toDataURL('img/jpeg')
gIsMemeDownloaded = false
const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
const dialog = document.querySelector('dialog')
dialog.showModal()
const form = dialog.querySelector('form')
form.innerHTML = `
<button class="save-btn" onclick="onSaveMeme('${canvasData}')">Save</button>  
  <button class="facebook-btn" onclick="onShareMemeOnFacebook('${encodedUploadedImgUrl}')">Share on Facebook</button>
  <button class="close-btn">X</button>
`
}
uploadImg(canvasData,onSuccess)
}
// share meme on Facebook
function onShareMemeOnFacebook(encodedUploadedImgUrl){
  gIsMemeDownloaded = true
  renderMeme()
  setTimeout(()=>{
    gIsMemeDownloaded = false
    window.open('https://www.facebook.com/sharer/sharer.php?u='+encodedUploadedImgUrl+'&t=$'+encodedUploadedImgUrl)
  })
}
//save meme
function onSaveMeme(canvasData){
  if(!getMeme().id) addMeme(canvasData)
    else updateMeme(canvasData)
}
function onRemoveMeme(id){
deleteMeme(id)
renderMemes()
}
async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}
// update editor
function resetInputs(){
    const colorInput = document.querySelector('.color-input')
    const fontBtn = document.querySelector('select')
    colorInput.value = '#000000'
    fontBtn.selectedIndex = 0
    const strokeInput = document.querySelector('.stroke-input')
    strokeInput.value='#000000'
}
function updateInputs(){
    const meme = getMeme()
    const color = meme.lines[meme.selectedLineIdx].color
    const font = meme.lines[meme.selectedLineIdx].font
    const stroke = meme.lines[meme.selectedLineIdx].stroke
    const colorInput = document.querySelector('.color-input')
    const fontBtn = document.querySelector('select')
    const strokeInput = document.querySelector('.stroke-input')
    colorInput.value = color
    fontBtn.value = font
    strokeInput.value = stroke
}


