banner = document.querySelector('#home-ad')
var imgNum = 1

setInterval(()=>{

    banner.src = `./assets/img/home-ad-${imgNum}.png`

    if(imgNum < 4) {
        imgNum++
    } else {
        imgNum = 1
    }

}, 4000)   