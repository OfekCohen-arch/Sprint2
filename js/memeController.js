'use strict'
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

function onSetLineTxt(txt){
setLineTxt(txt)
renderMeme()
}
function onSetColor(color){
    setColor(color)
    renderMeme()
}
function onSetStroke(stroke){
setStroke(stroke)
renderMeme()
}
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
function onSetSize(diff){
setSize(diff)
renderMeme()
}
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
function onDeleteLine(){
    deleteLine()
    const lineText = document.querySelector('.line-text')
    lineText.value = getMeme().lines[getMeme().selectedLineIdx]
    if(getMeme().lines.length === 0) lineText.value = ''
    renderMeme()
}
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
function clickColorInput(colorBtn){
    const colorInput = document.querySelector('.color-input')
colorBtn.addEventListener('click', () => {
    colorInput.click()
  })
}
function clickStrokeInput(strokeBtn){
     const strokeInput = document.querySelector('.stroke-input')
strokeBtn.addEventListener('click', () => {
    strokeInput.click()
  })
}

