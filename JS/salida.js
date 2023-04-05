
const contSalida = document.querySelector("div.contSalida")
const logo = document.querySelector("div.conLogo img")

//le agrego funcionalidad al boton del index en el logo y un mousemove
logo.addEventListener("click", ()=> {
    location.href = "../index.html"
})
logo.addEventListener("mousemove",()=>{
    logo.className = "conLogoHover"
})

function cargarCompras(array){
    contSalida.innerHTML = ""

    if(array.length > 0){

        array.forEach((compra)=>{
            contSalida.innerHTML += templateDivSalida(compra)
        })
    }
}

recuperoPedido()
cargarCompras(pedidoFrutas)