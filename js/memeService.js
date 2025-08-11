'use strict'
var gImgs = [{id: 1, url: 'img/meme-imgs (square)/1.jpg', keywords: ['donald', 'trump']}]
var gMeme = {
 selectedImgId: 1,
 selectedLineIdx: 0,
 lines: [
 {
 txt: 'Goede morgen',
 size: 40,
 color: 'blue'
 }
 ]
}

function getMeme(){
    return gMeme
}
function getImgById(id){
    const img = gImgs.find(img=>(id === img.id))
    return img.url
}
function setLineTxt(txt){
gMeme.lines[gMeme.selectedLineIdx].txt = txt
}