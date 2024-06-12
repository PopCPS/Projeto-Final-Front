import { fetchData } from "./json-fetch.js";

// const ofertas = document.querySelector('#ofertas')
// const roupas = document.querySelector('#categoria-roupas')
// const higiene = document.querySelector('#categoria-higiene')
// const brinquedos = document.querySelector('#categorias-brinquedos') 
// const mamaes = document.querySelector('#categoria-mamaes')

const sections = document.querySelectorAll('.product-listing')

var produtoData

let itemsCounter = 0
let maxItems
let newItemsLoad = 4
let endPage = false

if(window.location.href.includes('home.html') || window.location.href.includes('produto.html')) {
    maxItems = 4
}else {
    maxItems = 8
}

const renderItem = (section, item) => {
    section.children[1].innerHTML += `
        <li class="item">
            <a href="./produto.html">
                <div class="item-img">
                <img src="${item.imagem}" alt="Item image">
                </div>
                <a class="item-href" href="./produto.html">See item</a>
                <div class="item-data">
                    <h5 class="item-maker">${item.fornecedor}</h5>
                    <h4 class="item-name">${item.nome}</h4>
                    <h4 class="item-material">${item.cor}</h4>
                    <h3 class="item-price">${item.preco}</h3>
                    <span class="hidden id">${item.id}</span> 
                </div>
            </a>
        </li>
    `
}

await fetchData()
    .then(result => {
            if (result.error) {
                console.error('Error:', result.error);
            } else {
                produtoData = result.data
            }
        });
       
const arrProdutoData = Object.values(produtoData.produtos);


sections.forEach((section)=>{
    if(window.location.href.includes('home.html')){
        itemsCounter = 0
    }
    if(section.id == 'ofertas') {
        arrProdutoData.forEach((item)=>{
            if(item.promocao){
                if(itemsCounter < maxItems) {
                    renderItem(section, item)
                    itemsCounter++
                }
            }
        })
    }else if(section.id == 'categoria-roupas') {
        arrProdutoData.forEach((item)=>{
            if(item.categoria == 'roupas'){
                if(itemsCounter < maxItems) {
                    renderItem(section, item)
                    itemsCounter++
                }
            }
        })
    }else if (section.id == 'categoria-higiene') {
        arrProdutoData.forEach((item)=>{
            if(item.categoria == 'higiene'){
                if(itemsCounter < maxItems) {
                    renderItem(section, item)
                    itemsCounter++
                }
            }
        })
    }else if (section.id == 'categoria-brinquedos') {
        arrProdutoData.forEach((item)=>{
            if(item.categoria == 'brinquedos'){
                if(itemsCounter < maxItems) {
                    renderItem(section, item)
                    itemsCounter++
                }
            }
        })
    }else if (section.id == 'categoria-mamaes') {
        arrProdutoData.forEach((item)=>{
            if(item.categoria == 'mamaes'){
                if(itemsCounter < maxItems) {
                    renderItem(section, item)
                    itemsCounter++
                }
            }
        })
    }
})

let newRenderMin = 8
let newRenderMax = 12

const addNewItemRow = (category) => {   
    let newRenderCounter = 0
    const section = document.querySelector(`#categoria-${category}`)
    arrProdutoData.forEach((item)=>{    
            if(item.categoria == category){
                newRenderCounter++
                if(newRenderCounter > newRenderMin && newRenderCounter <= newRenderMax) {
                    renderItem(section, item)
                }
            }
            endPage = false
    })
    newRenderMin += newItemsLoad
    newRenderMax += newItemsLoad
}

document.addEventListener("scroll", (event) => {
    if(!(window.location.href.includes('home.html'))){
        if((document.documentElement.scrollHeight - window.scrollY) <= 1300 & endPage == false) {
            endPage = true
            const url = window.location.href;
            const regex = /\/([^\/]+)\.html/;
            const match = url.match(regex);
            addNewItemRow(match[1])
        }
    }
})

const renderedItems = document.querySelectorAll('.item')
renderedItems.forEach((element) => {
    element.addEventListener('click', ((event) => {
        arrProdutoData.forEach((item) => {
            const itemID = element.querySelector('.id').innerText
            if(itemID == item.id){
                sessionStorage.setItem("item", JSON.stringify(item))
            }
        })
    }))
})