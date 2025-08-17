'use strict'
const STORAGE_KEY = 'memes'
function saveMemesToStorage(gMemes){
const string = JSON.stringify(gMemes)
    localStorage.setItem(STORAGE_KEY,string)
}
function loadMemesFromStorage(){
return JSON.parse(localStorage.getItem(STORAGE_KEY))
}