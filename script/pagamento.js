const pagamentoButton = document.querySelector('.button-pay')

var r

pagamentoButton.addEventListener('click' ,()=>{
    r=confirm("Confirmar compra?");
    if (r==true)
    {
        alert("Compra finalizada!");
        document.location.href ='./acompanhamentoPedido.html'
    }
})

