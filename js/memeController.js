'use strict'

function renderMeme(){
    const editor = document.querySelector('.editor-section')
    editor.style.display = 'flex'
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    const txt = line.txt
    const size = line.size
    const color = line.color
    const imgSrc = getImgById(meme.selectedImgId)
    console.log(color,size,txt);
    drawText(txt,size,color)
    const img = new Image()
    img.src = imgSrc
    img.onload = function() {
    drawImg(img)
    const lineText = document.querySelector('.line-text')
    lineText.value = txt
    }
}

function onSetLineTxt(txt){
setLineTxt(txt)
renderMeme()
}

