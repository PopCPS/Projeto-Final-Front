const itemData = JSON.parse(sessionStorage.getItem("item"))

const mainItemHeader = document.querySelector('.main-item-header')

document.title += " " + itemData.nome

mainItemHeader.innerHTML += `
    <div class="img-div">
        <img src=${itemData.imagem} alt="Product image">
    </div>
    <div class="main-item-content">
        <div class="main-item-info">
            <h1 class="main-item-title">${itemData.nome}</h1>
            <p class="main-item-desc">${itemData.desc}</p>
            <h2 class="main-item-price">${itemData.preco}</h2>
        </div>
        <div class="main-item-data">
            <button class="shopping-cart-button">Shopping cart <img src="./assets/img/add-to-cart.svg" alt="Add to shopping cart"></button>
            <button class="buy-button">Buy <img src="./assets/img/checkbox.svg" alt="Buy"></button>
        </div>
    </div>
`

const content = document.querySelector('.content')

content.innerHTML += `
    <section id="categoria-${itemData.categoria}" class="related-items product-listing"></section>
`

const relatedItems = document.querySelector('.related-items')

relatedItems.innerHTML += `
    <h2 id=${itemData.categoria} class="section-title">Related products</h2>
    <ul class="product-list"></ul>
`

const addToCartButton = document.querySelector('.shopping-cart-button')

let cart = JSON.parse(sessionStorage.getItem('cartList'))

addToCartButton.addEventListener('click', (event)=>{
    if(sessionStorage.getItem('cartList') == null) {
        cart = []
        cart.push(itemData)
        sessionStorage.setItem('cartList', JSON.stringify(cart))
        console.log(itemData)
        console.log(cart)
        console.log('null')
    }else {
        cart = (JSON.parse(sessionStorage.getItem('cartList')))
        cart.push(itemData)
        sessionStorage.setItem('cartList' ,JSON.stringify(cart))
        console.log(typeof cart)
        console.log('not null')
    }
})

// const productList = document.querySelector('.product.list')

// productList.innerHTML += 