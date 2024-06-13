const renderContainer = document.querySelector('#payment-section')
const continueButton = document.querySelector('.continue')
const progressBarContainer = document.querySelector('nav ul')
const paymentCheckpoints = document.querySelectorAll('nav ul li div')
const orderSummaryList = document.querySelector('.product-prices-sum')
const totalPrice = document.querySelector('.total-price-div')
const cartContent = JSON.parse(sessionStorage.getItem('cartList'))

const totalPriceAmount = sessionStorage.getItem('soma')

const renderShipping = () => {
    renderContainer.innerHTML = `
        <h1 class="form-title">New address</h1>
        <form id="address-form" action="">
            <div class="address-div"><label for="name">Name:</label><input name="name" type="text"></div>
            <div class="address-div"><label for="tel">Telephone:</label><input name="tel" type="tel"></div>
            <div class="address-div"><label for="cep">ZIP code:</label><input name="cep" type="number"></div>
            <div class="address-div"><label for="city">City:</label><input name="city" type="text"></div>
            <div class="address-div"><label for="state">State:</label><input name="state" type="text"></div>
            <div class="address-div"><label for="neighborhood">Neighborhood:</label><input name="neighborhood" type="text"></div>
            <div class="address-div"><label for="road">Road:</label><input name="road" type="text"></div>
            <div class="address-div-small-container">
                <div class="address-div-small"><label for="number">Number:</label><input name="number" type="number"></div>
                <div class="address-div-small"><label for="complement">Complement:</label><input name="complement" type="text"></div>
            </div>
            <div class="save-as">
                <h3>Save as:</h3>
                <div>
                    <button>Home</button>
                    <button>Work</button>
                </div>
                <label for="checkbox" ><input id="checkbox" type="checkbox">Save as default address</label>
            </div>
        </form>
    `
}

const renderPayment = () => {
    renderContainer.innerHTML = `
        <div id="payment-section">
            <div class="method-selection">
                <h2 class="method-selection-title"></h2>
                <ul class="payment-options">
                    <li><button class="option active-option">Payment slip</button></li>
                    <li><button class="option">Credit card</button></li>
                    <li><button class="option">Pix</button></li>
                </ul>
            </div>
            <div id="method-content" class="slip-content"></div>
        </div>
    `
}

const renderSlip = () => {
    const renderPaymentContainer = document.querySelector('#method-content')
    renderPaymentContainer.classList.add('slip-content')
    renderPaymentContainer.innerHTML = `
        <h1>See how easy is to pay with a slip:</h1>
        <div class="slip-highlight">
            <div class="slip-tutorial-div">
                <h3>1. Print or copy your slip number;</h3>
                <h3>2. Pay through your bank or the internet;</h3>
                <h3>The slip is valid for 3 business days</h3>
            </div>
            <div class="barcode-div">
                <img src="./assets/img/bar-code.png" alt="Bar code">
            </div>
            <button>Copy bar code<img class="copy" src="./assets/img/copy.svg" alt="Copy"></button>
            <button>Download slip<img class="download" src="./assets/img/download.svg" alt="Download"></button>
        </div>
        <div class="warning-div">
            <h5>Important</h5>
            <ul>
                <li>If the slip is not paid until the expiration date, the order is going to be automatically cancelled</li>
                <li>The shipping arriving date of orders paid with a slip starts three days after the slip is paid as those days are needed so the bank can approve the payment</li>
            </ul>
        </div>
    `
}

const renderCreditCard = () => {

}

const renderPix = () => {

}

const renderTracking = () => {

}

const renderSummary = () => {
    cartContent.forEach((item) => {
        orderSummaryList.innerHTML += `
        <li>
            <h4>${item.nome}</h4>
            <h4>${item.preco}</h4>
        </li>
    `
    })

    totalPrice.innerHTML = `
        <div>
            <h4>Total</h4>
            <h4>${totalPriceAmount}</h4>
        </div>
    `
}


renderShipping()
renderSummary()