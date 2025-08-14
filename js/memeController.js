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
    var y = 30+i*50
    const line = meme.lines[i]
    const txt = line.txt
    const size = line.size
    const color = line.color
    drawText(txt,size,color,y,i)
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
function downloadMeme(){
  const dataURL = gElCanvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'meme.jpeg';
  link.click()
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
}
function onSwitchLine(){
    const lineText = document.querySelector('.line-text')
    lineText.value = switchLine() 
    renderMeme()
}
function onSelectLine(ev){
const x = ev.offsetX
const y = ev.offsetY
selectLine(x,y)
renderMeme()
}

