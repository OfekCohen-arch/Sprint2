'use strict'
const STORAGE_KEY_MEMES = 'memes'
const STORAGE_KEY_Imgs = 'imgs'
function saveMemesToStorage(gMemes){
const string = JSON.stringify(gMemes)
    localStorage.setItem(STORAGE_KEY_MEMES,string)
}
function loadMemesFromStorage(){
return JSON.parse(localStorage.getItem(STORAGE_KEY_MEMES))
}
function saveImgesToStorage(gImgs){
const string = JSON.stringify(gImgs)
    localStorage.setItem(STORAGE_KEY_Imgs,string)
}
function loadImgsFromStorage(){
return JSON.parse(localStorage.getItem(STORAGE_KEY_Imgs))
}