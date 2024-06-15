const mainDiv = document.querySelector('main')
const renderContainer = document.querySelector('#payment-section')
const continueButton = document.querySelector('.continue')
const progressBarContainer = document.querySelector('nav ul')
const paymentCheckpoints = document.querySelectorAll('nav ul li div')
const orderSummaryList = document.querySelector('.product-prices-sum')
const totalPrice = document.querySelector('.total-price-div')
const cartContent = JSON.parse(sessionStorage.getItem('cartList'))

var totalPriceAmount = sessionStorage.getItem('soma')

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
        <div class="method-selection">
            <h2 class="method-selection-title"></h2>
            <ul class="payment-options">
                <li><button id="slip" class="option active-option">Payment slip</button></li>
                <li><button id="credit-card" class="option">Credit card</button></li>
                <li><button id="pix" class="option">Pix</button></li>
            </ul>
        </div>
        <div id="method-content" class="slip-content"></div>
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
    const renderPaymentContainer = document.querySelector('#method-content')
    renderPaymentContainer.classList.add('credit-card-content')
    if(typeof totalPriceAmount == 'string') {
        totalPriceAmount = parseFloat(totalPriceAmount.replace("R$", "").replace(",", "."))
    } 
    renderPaymentContainer.innerHTML = `
        <div class="card-img-div">
            <img src="./assets/img/credit-card.png" alt="Credit card image">
        </div>
        <form action="">
            <input placeholder="Card number" type="number">
            <input placeholder="Card owner name" type="text">
            <input placeholder="Expiry date" type="month">
            <input placeholder="CVV" type="number">
            <select name="installments" id="installments">
                <option value="">1x R$${(totalPriceAmount / 1).toFixed(2)}</option>
                <option value="">2x R$${(totalPriceAmount / 2).toFixed(2)}</option>
                <option value="">3x R$${(totalPriceAmount / 3).toFixed(2)}</option>
                <option value="">4x R$${(totalPriceAmount / 4).toFixed(2)}</option>
                <option value="">5x R$${(totalPriceAmount / 5).toFixed(2)}</option>
                <option value="">6x R$${(totalPriceAmount / 6).toFixed(2)}</option>
                <option value="">7x R$${(totalPriceAmount / 7).toFixed(2)}</option>
                <option value="">8x R$${(totalPriceAmount / 8).toFixed(2)}</option>
                <option value="">9x R$${(totalPriceAmount / 9).toFixed(2)}</option>
                <option value="">10x R$${(totalPriceAmount / 10).toFixed(2)}</option>
                <option value="">11x R$${(totalPriceAmount / 11).toFixed(2)}</option>
                <option value="">12x R$${(totalPriceAmount / 12).toFixed(2)}</option>
            </select>
        </form>
    `
}

const renderPix = () => {
    const renderPaymentContainer = document.querySelector('#method-content')
    renderPaymentContainer.classList.add('pix-content')
    renderPaymentContainer.innerHTML = `
        <div>
            <img src="./assets/img/qr-code.png" alt="QR code">
        </div>
        <button>Copy Pix code<img class="copy" src="./assets/img/copy.svg" alt="Copy"></button>
        <ul>
            <li>Open your bank app, go to the pix payment screen and choose QR code or copy paste.</li>
            <li>Scan the QR code or paste the pix code. Confirm the information and finish the payment.</li>
            <li>All done! After payment approval, your order will automatically be placed.</li>
        </ul>
    `
}

const renderTracking = () => {
    mainDiv.classList.add('tracking-main')
    mainDiv.innerHTML = `
        <div>
            <div class="order-tracking-div">
                <div class="order-tracking-item">
                    <svg width="75" height="67" viewBox="0 0 75 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M68.3125 12.75H9.5625C8.78343 12.75 8.03626 12.4372 7.48537 11.8805C6.93449 11.3237 6.625 10.5686 6.625 9.78125C6.625 8.99389 6.93449 8.23878 7.48537 7.68203C8.03626 7.12528 8.78343 6.8125 9.5625 6.8125H59.5C60.2791 6.8125 61.0262 6.49972 61.5771 5.94297C62.128 5.38622 62.4375 4.63111 62.4375 3.84375C62.4375 3.05639 62.128 2.30128 61.5771 1.74453C61.0262 1.18778 60.2791 0.875 59.5 0.875H9.5625C7.22528 0.875 4.98379 1.81333 3.33112 3.48358C1.67846 5.15383 0.75 7.41917 0.75 9.78125V57.2812C0.75 59.6433 1.67846 61.9087 3.33112 63.5789C4.98379 65.2492 7.22528 66.1875 9.5625 66.1875H68.3125C69.8706 66.1875 71.365 65.5619 72.4668 64.4484C73.5685 63.3349 74.1875 61.8247 74.1875 60.25V18.6875C74.1875 17.1128 73.5685 15.6026 72.4668 14.4891C71.365 13.3756 69.8706 12.75 68.3125 12.75ZM55.0938 42.4375C54.2223 42.4375 53.3704 42.1763 52.6458 41.687C51.9212 41.1977 51.3564 40.5022 51.0229 39.6885C50.6894 38.8748 50.6021 37.9794 50.7722 37.1156C50.9422 36.2518 51.3618 35.4583 51.9781 34.8355C52.5943 34.2128 53.3794 33.7886 54.2341 33.6168C55.0889 33.445 55.9748 33.5332 56.7799 33.8702C57.5851 34.2073 58.2732 34.778 58.7574 35.5104C59.2416 36.2427 59.5 37.1036 59.5 37.9844C59.5 39.1654 59.0358 40.2981 58.2094 41.1332C57.3831 41.9683 56.2624 42.4375 55.0938 42.4375Z" fill="#154A3B"/>
                    </svg>
                    <h2>Waiting for payment</h2>
                    <span class="tracking-step tracking-active">1</span>
                </div>
                <div class="order-tracking-item">
                    <svg width="84" height="87" viewBox="0 0 84 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M74.3125 57.8748V28.5079L62.5625 32.7473V44.9845C62.5625 46.1655 62.0983 47.2982 61.2719 48.1333C60.4456 48.9684 59.3249 49.4376 58.1562 49.4376C56.9876 49.4376 55.8669 48.9684 55.0406 48.1333C54.2142 47.2982 53.75 46.1655 53.75 44.9845V35.9298L40.5312 40.7035V76.851L68.5961 66.211C70.275 65.5743 71.7217 64.4351 72.7431 62.9456C73.7646 61.456 74.312 59.687 74.3125 57.8748ZM61.0703 23.8291L70.4702 20.4388C70.1381 20.2155 69.795 20.0094 69.4421 19.8213L50.8066 10.4104C49.7229 9.86279 48.539 9.54695 47.329 9.48259C46.119 9.41823 44.9089 9.60673 43.7743 10.0363L38.2459 12.1323L60.1244 23.1879C60.4769 23.366 60.7902 23.5798 61.0644 23.8291H61.0703ZM26.9835 16.3954L49.7667 27.9141L36.4129 32.7295L14.0585 21.4304C14.4815 21.181 14.9319 20.9653 15.4097 20.7832L26.9835 16.3954ZM31.7188 40.3176L9.6875 29.1848V59.2107C9.68865 60.8646 10.1454 62.4854 11.0067 63.8917C11.8679 65.298 13.0996 66.4342 14.5637 67.1729L31.7188 75.8416V40.3176ZM0.875 29.1254C0.875 26.5366 1.42725 24.0429 2.43775 21.7866C2.61407 20.9561 3.02177 20.1938 3.61275 19.5898C5.622 16.3835 8.63588 13.8423 12.3078 12.447L40.6899 1.70008C42.9588 0.839972 45.3788 0.461962 47.7988 0.589662C50.2188 0.717363 52.5867 1.34803 54.7546 2.44227L73.3901 11.8591C76.316 13.3395 78.7764 15.6138 80.4957 18.4273C82.215 21.2409 83.1254 24.4826 83.125 27.7895V57.8748C83.1248 61.501 82.0296 65.0409 79.9856 68.0212C77.9416 71.0015 75.0462 73.2804 71.6864 74.5532L43.3219 85.3001C41.0521 86.161 38.631 86.5395 36.21 86.4118C33.7889 86.2841 31.42 85.653 29.2512 84.5579L10.6158 75.141C7.68878 73.6615 5.22722 71.3875 3.50682 68.5739C1.78641 65.7603 0.875111 62.5182 0.875 59.2107V29.1254Z" fill="#154A3B"/>
                    </svg>  
                    <h2>Packaging</h2>
                    <span class="tracking-step">2</span>
                </div>
                <div class="order-tracking-item">
                    <svg width="80" height="80" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_489_2834)">
                            <path d="M26.2415 6.66585H23.4415C23.1321 5.16107 22.3133 3.80898 21.1232 2.83748C19.9331 1.86597 18.4445 1.33446 16.9082 1.33252H7.57487C5.80741 1.33464 4.11295 2.0377 2.86316 3.28748C1.61338 4.53726 0.91032 6.23173 0.908203 7.99919L0.908203 19.9992C0.911555 21.1934 1.31559 22.3519 2.05558 23.2891C2.79558 24.2264 3.82873 24.8882 4.98954 25.1685C4.86389 25.8358 4.88536 26.5224 5.05246 27.1805C5.21955 27.8387 5.52825 28.4524 5.957 28.9789C6.38575 29.5054 6.92423 29.932 7.53485 30.2289C8.14548 30.5258 8.81355 30.6859 9.49243 30.698C10.1713 30.7101 10.8447 30.5739 11.4655 30.299C12.0863 30.024 12.6396 29.6169 13.0869 29.106C13.5341 28.5951 13.8645 27.9928 14.0549 27.341C14.2454 26.6893 14.2913 26.0038 14.1895 25.3325H19.6322C19.5979 25.5531 19.5796 25.7759 19.5775 25.9992C19.5775 27.2369 20.0692 28.4239 20.9444 29.299C21.8195 30.1742 23.0065 30.6659 24.2442 30.6659C25.4819 30.6659 26.6689 30.1742 27.544 29.299C28.4192 28.4239 28.9109 27.2369 28.9109 25.9992C28.9094 25.7204 28.8821 25.4423 28.8295 25.1685C29.9899 24.8877 31.0224 24.2257 31.7619 23.2884C32.5013 22.3512 32.905 21.193 32.9082 19.9992V13.3325C32.9061 11.5651 32.203 9.8706 30.9532 8.62081C29.7035 7.37103 28.009 6.66797 26.2415 6.66585ZM30.2415 13.3325V14.6659H23.5749V9.33252H26.2415C27.3024 9.33252 28.3198 9.75395 29.07 10.5041C29.8201 11.2542 30.2415 12.2717 30.2415 13.3325ZM3.57487 19.9992V7.99919C3.57487 6.93832 3.9963 5.92091 4.74644 5.17076C5.49659 4.42061 6.514 3.99919 7.57487 3.99919H16.9082C17.9691 3.99919 18.9865 4.42061 19.7366 5.17076C20.4868 5.92091 20.9082 6.93832 20.9082 7.99919V22.6659H6.24154C5.53429 22.6659 4.85602 22.3849 4.35592 21.8848C3.85582 21.3847 3.57487 20.7064 3.57487 19.9992ZM11.5749 25.9992C11.5749 26.5296 11.3642 27.0383 10.9891 27.4134C10.614 27.7885 10.1053 27.9992 9.57487 27.9992C9.04444 27.9992 8.53573 27.7885 8.16066 27.4134C7.78558 27.0383 7.57487 26.5296 7.57487 25.9992C7.57569 25.7713 7.6177 25.5455 7.69887 25.3325H11.4509C11.532 25.5455 11.5741 25.7713 11.5749 25.9992ZM24.2415 27.9992C23.7111 27.9992 23.2024 27.7885 22.8273 27.4134C22.4523 27.0383 22.2415 26.5296 22.2415 25.9992C22.2421 25.7713 22.2841 25.5454 22.3655 25.3325H26.1175C26.1989 25.5454 26.241 25.7713 26.2415 25.9992C26.2415 26.5296 26.0308 27.0383 25.6558 27.4134C25.2807 27.7885 24.772 27.9992 24.2415 27.9992ZM27.5749 22.6659H23.5749V17.3325H30.2415V19.9992C30.2415 20.7064 29.9606 21.3847 29.4605 21.8848C28.9604 22.3849 28.2821 22.6659 27.5749 22.6659Z" fill="#154A3B"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_489_2834">
                                <rect width="80" height="80" fill="white" transform="translate(0.908203)"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <h2>In route</h2>
                    <span class="tracking-step">3</span>
                </div>
            </div>
            <a href="./home.html" class="payment">Keep Shopping</a>
        </div>
    `
    mainDiv.children[0].classList.add('tracking-flex')
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

const shippingHeaderCheckpoint = document.querySelector('#shipping')
const trackingHeaderCheckpoint = document.querySelector('#tracking')

shippingHeaderCheckpoint.addEventListener('click', () => {
    if(!(trackingHeaderCheckpoint.classList.contains('payment-active'))) {
        renderShipping()
        
        document.querySelector('#payment').classList.remove('payment-active')
        const stroke = document.querySelectorAll('#payment svg g path')
        stroke.forEach((item) => {
            item.classList.remove('payment-active')
        }) 
        setTimeout(() => {
            progressBarContainer.classList.remove('second')
        }, 500);

        renderContainer.classList.remove('row')
    }
})

const paymentHeaderCheckpoint = document.querySelector('#payment')

continueButton.addEventListener('click', () => {
    if(!(paymentHeaderCheckpoint.classList.contains('payment-active'))){
        renderPayment()
        renderSlip()

        progressBarContainer.classList.add('second')
        setTimeout(() => {
            document.querySelector('#payment').classList.add('payment-active')
            const stroke = document.querySelectorAll('#payment svg g path')
            stroke.forEach((item) => {
                item.classList.add('payment-active')
            }) 
        }, 500);

        renderContainer.classList.add('row')
        
        const slipButton = document.querySelector('#slip')
        const creditCardButton = document.querySelector('#credit-card')
        const pixButton = document.querySelector('#pix')
        
        slipButton.addEventListener('click', () => {
            renderSlip()
            slipButton.classList.add('active-option')
            creditCardButton.classList.remove('active-option')
            pixButton.classList.remove('active-option')
        })
        
        creditCardButton.addEventListener('click', () => {
            renderCreditCard()
            slipButton.classList.remove('active-option')
            creditCardButton.classList.add('active-option')
            pixButton.classList.remove('active-option')
        })
        
        pixButton.addEventListener('click', () => {
            renderPix()
            slipButton.classList.remove('active-option')
            creditCardButton.classList.remove('active-option')
            pixButton.classList.add('active-option')
        })
    }else {
        renderTracking()
        
        progressBarContainer.classList.add('third')
        setTimeout(() => {
            document.querySelector('#tracking').classList.add('payment-active')
            const stroke = document.querySelectorAll('#tracking svg path')
            stroke.forEach((item) => {
                item.classList.add('payment-active')
            }) 
        }, 500);

    }
})
