const renderedItems = document.querySelector('.cart-items')
const pricesSumDiv = document.querySelector('.product-prices-sum')
const totalPriceDiv = document.querySelector('.total-price-div')
var cart = JSON.parse(sessionStorage.getItem("cartList"))
let soma = 'R$0,00'

let renderedIDs
let renderStatus
let parentElement
const currencyRegex = /^([R$]+)/;
const numberRegex = /(\d+)/g;

if(cart == null) {
    cart = []
}

if(cart.length > 0) {
    border = ''
    cart.forEach((item)=>{
        renderedIDs = document.querySelectorAll('.id')
        renderStatus = true
        renderedIDs.forEach((itemID)=>{
            if(item.id == itemID.innerHTML) {
                parentElement = itemID.parentElement
                renderStatus = false
            }
        })
        if(renderStatus) {
            renderedItems.innerHTML += `
                <li class="cart-item">
                    <span class="hidden id">${item.id}</span>
                    <div class="image-name-div">
                        <div class="image">
                            <img src="${item.imagem}" alt="">
                        </div>
                        <h2 class="name">${item.nome}</h2>
                    </div>
                    <div class="amount-controller">
                        <button class="minus"><img src="./assets/img/minus.svg" alt=""></button>
                        <span class="amount">1</span>
                        <button class="plus"><img src="./assets/img/plus.svg" alt=""></button>
                    </div>
                    <div class="shipping-div">
                        <h3>Receba entre</h3>
                        <h4>dd/mm/aaaa</h4>
                    </div>
                    <h2 class="price">${item.preco}</h2>
                </li>
            `
        }else{
            parentElement.querySelector('.amount').innerText = parseInt(parentElement.querySelector('.amount').innerText) + 1

            // const currencyMatch = parentElement.querySelector('.price').innerText.match(currencyRegex);
            // const numberMatch = parentElement.querySelector('.price').innerText.match(numberRegex);
            // console.log(currencyMatch)
            // console.log(numberMatch)

            // const multipliedPrice = 
            // const multipliedCents = 

            // parentElement.querySelector('.price').innerText = 
        }
        pricesSumDiv.innerHTML += `
            <li>
                <h4>${item.nome}</h4>
                <h4>${item.preco}</h4>
            </li>
        `
        soma = sumMoneyStrings(soma, item.preco)
    })
    totalPriceDiv.innerHTML = `
        <div>
            <h4>Total</h4>
            <h4>${soma}</h4>
        </div>
    `
} else {
    renderedItems.innerHTML += `
        <div class="empty-cart">
            <span>your cart is still empty, add something!</span>
            <a href="./home.html">Browse</a>
        </div>
    `
}

function sumMoneyStrings(str1, str2) {
    const num1 = parseFloat(str1.replace("R$", "").replace(",", "."));
    const num2 = parseFloat(str2.replace("R$", "").replace(",", "."));

    if(str2 == null) {
        num2 = 0
    }

    const sum = num1 + num2;

    const sumString = "R$" + sum.toFixed(2).replace(".", ",");

    return sumString;
} 

const addItem = document.querySelectorAll('.plus')
let plusItem
let storedCartItems

addItem.forEach((item)=>{
    item.addEventListener('click', ()=>{
        const itemID = item.parentElement.parentElement.querySelector('.id').innerText

        plusItem = true
        cart.forEach((cartItem)=>{
            if(cartItem.id == itemID && plusItem == true) {
                parentElement = item.parentElement.parentElement
                parentElement.querySelector('.amount').innerText = parseInt(parentElement.querySelector('.amount').innerText) + 1

                cart.push(cartItem)

                sessionStorage.setItem('cartList' ,JSON.stringify(cart))
                plusItem = false
            }
        })

        if(cart.length > 0) {
            soma = parseFloat(item.parentElement.parentElement.querySelector('.price').innerText.replace("R$", "").replace(",", ".")) * parseFloat(item.parentElement.parentElement.querySelector('.amount').innerText)
            renderTotalPrice("R$" + soma.toFixed(2).replace(".", ","))
        }

        pricesSumDiv.innerHTML = ''
        cart.forEach((item)=>{
            pricesSumDiv.innerHTML += `
                <li>
                    <h4>${item.nome}</h4>
                    <h4>${item.preco}</h4>
                </li>
            `
        })

    })
})

const removeItem = document.querySelectorAll('.minus')
let minusItem
removeItem.forEach((item)=>{
    item.addEventListener('click', ()=>{
        const itemID = item.parentElement.parentElement.querySelector('.id').innerText

        minusItem = true
        cart.forEach((cartItem, index)=>{
            if(cartItem.id == itemID && minusItem == true) {
                parentElement = item.parentElement.parentElement
                parentElement.querySelector('.amount').innerText = parseInt(parentElement.querySelector('.amount').innerText) - 1

                cart.splice(index, 1)

                sessionStorage.setItem('cartList' ,JSON.stringify(cart))
                minusItem = false
            }

        })
        if(parentElement.querySelector('.amount').innerText == 0){
            parentElement.remove()
            if(cart.length == 0) {
                renderedItems.innerHTML += `
                <div class="empty-cart">
                    <span>your cart is still empty, add something!</span>
                    <a href="./home.html">Browse</a>
                </div>
            `
            }
        }   
        if(cart.length > 0) {
            soma = parseFloat(item.parentElement.parentElement.querySelector('.price').innerText.replace("R$", "").replace(",", ".")) * parseFloat(item.parentElement.parentElement.querySelector('.amount').innerText)
            renderTotalPrice("R$" + soma.toFixed(2).replace(".", ","))
        } else {
            totalPriceDiv.innerHTML = ''
        }

        pricesSumDiv.innerHTML = ''
        cart.forEach((item)=>{
            pricesSumDiv.innerHTML += `
                <li>
                    <h4>${item.nome}</h4>
                    <h4>${item.preco}</h4>
                </li>
            `
        })
    })
})

const renderTotalPrice = (soma) => {
    totalPriceDiv.innerHTML = `
    <div>
        <h4>Total</h4>
        <h4>${soma}</h4>
    </div>
`
}

const paymentButton = document.querySelector('.payment')
const emptyCartWarning = document.querySelector('.empty-cart span')

paymentButton.addEventListener('click', ((event)=>{

    if(cart.length > 0) {
        sessionStorage.setItem('soma', soma)
        document.location.href = './dadosEntrega.html'
    } else {
        paymentButton.classList.add('red-button')
        emptyCartWarning.classList.add('increase-size')
        setTimeout(() => {
            paymentButton.classList.remove('red-button')
            emptyCartWarning.classList.remove('increase-size')
        }, 3000);
    }
}))