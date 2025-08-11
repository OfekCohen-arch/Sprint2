'use strict'

function renderMeme(){
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    const txt = line.txt
    const size = line.size
    const color = line.color
    const imgSrc = getImgById(meme.selectedImgId)
    const img = new Image()
    img.src = imgSrc
    img.onload = function() {
    drawImg(img)
    drawText(txt,size,color)
    };
}

