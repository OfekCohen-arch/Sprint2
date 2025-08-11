'use strict'
var gElGallery
function renderGallery(){
gElGallery = document.querySelector('.gallery-container')
const images = getImages()
var html = images.map((img)=>{
    img = `
    <div class = "card">
    <img src='${img.url}'/>
    </div>
    `
    return img
})
gElGallery.innerHTML = html.join('')
}