'use strict'

function renderMeme(txt,img){
    img.onload = function() {
    drawImg(img)
    drawText(txt)
    };
}

