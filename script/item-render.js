import { fetchData } from "./json-fetch.js";

const ofertas = document.querySelector('#ofertas')
const roupas = document.querySelector('#categoria-roupas')
const higiene = document.querySelector('#categoria-higiene')
const brinquedos = document.querySelector('#categorias-brinquedos') 
const mamaes = document.querySelector('#categoria-mamaes')

const sections = document.querySelectorAll('.product-listing')

var produtoData

let itemsCounter
let maxItems
if(window.location.href.includes('home.html')) {
    maxItems = 4
}else {
    maxItems = 100
}

const renderItem = (section, item) => {
    section.children[1].innerHTML += `
        <li class="item">
            <div class="item-img">
                <img src="${item.imagem}" alt="Item image">
            </div>
            <a class="item-href" href="">See item</a>
            <div class="item-data">
                <h5 class="item-maker">${item.fornecedor}</h5>
                <h4 class="item-name">${item.nome}</h4>
                <h4 class="item-material">${item.material}</h4>
                <h3 class="item-price">${item.preco}</h3>
            </div>
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
    itemsCounter = 0
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