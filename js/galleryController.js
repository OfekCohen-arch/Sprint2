'use strict'
var gElGallery
function renderGallery(){
gElGallery = document.querySelector('.gallery-container')
const images = getImages()
var html = images.map((img)=>{
    img = `
    <div class = "card">
    <img src='${img.url}' onclick="onImgSelect(${img.id})"/>
    </div>
    `
    return img
})
gElGallery.innerHTML = html.join('')
}
function onImgSelect(id){
    gElGallery.style.display = 'none'
    setImg(id)
    const lineText = document.querySelector('.line-text')
    lineText.value = '' 
    deleteAllLines()
    renderMeme()
}