'use strict'
var gElGallery
function renderGallery(){
gElGallery = document.querySelector('.gallery-container')
const images = getImages()
var html = `
<button class = "card img-btn">
+
<input type="file" class="img-picker" onchange="onSelectImgFromDevice(event)"/>
</button>
`
 images.forEach((img)=>{
    html+= `
    <div class = "card">
    <img src='${img.url}' onclick="onImgSelect(${img.id})"/>
    </div>
    `
})
gElGallery.innerHTML = html
const imgBtn = document.querySelector('.img-btn')
const imgPicker = document.querySelector('.img-picker')
imgBtn.addEventListener('click', () => {
    imgPicker.click()
  })
}
function onImgSelect(id){
    gElGallery.style.display = 'none'
    deleteAllLines()
    resetInputs()
    setImg(id)
    const lineText = document.querySelector('.line-text')
    lineText.value = '' 
    renderMeme()
}
function onSelectImgFromDevice(event){
loadImageFromInput(event)
}
function loadImageFromInput(ev){
const reader = new FileReader()
reader.onload = function (event){
    const id = getRandomId()
    const img = new Image()
    img.src = event.target.result
    addImg(id,img.src)
    onImgSelect(id)
}
reader.readAsDataURL(ev.target.files[0])
}
