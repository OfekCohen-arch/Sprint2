'use strict'
var gImgs = [{id: 1, url: 'img/meme-imgs (square)/1.jpg', keywords: ['donald', 'trump']}]
var gMeme = {
 selectedImgId: 1,
 selectedLineIdx: 0,
 lines: [
 {
 txt: 'I sometimes eat Falafel',
 size: 40,
 color: 'red'
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