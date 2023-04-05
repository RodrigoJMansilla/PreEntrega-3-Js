
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

    cargarTotal()
}

recuperoPedido()
cargarCompras(pedidoFrutas)

function cargarTotal(){
    contSalida.innerHTML += templateDivTotal()
}



/*Funcion eventoBotonX:
Le da funcionalidad al boton "X" rojo:
- tomo los botones dentro de un array de nodos
- itero el array y escucho el click , pasando el obj event, para tomar el id del boton
- ejecuto la funcion eliminarFruta que quita el objeto compra del array pedidoFrutas, correspondiente a la fruta a eliminar
*/
function eventoBotonX(){
    const botones = document.querySelectorAll("button.buttonFruta")

    for(boton of botones){
        
        boton.addEventListener("click", (e)=>{
            let fruta = recuperaFruta(parseInt(e.target.id))

            eliminarFruta(fruta)
        })


    }
}

//activo los botones X llamando a la funcion.
eventoBotonX()

/*
Funcion que elimina una compra del arreglo pedidoFrutas, en base a un objeto fruta:
- pide como parametro un objeto fruta
- toma el index del objeto compra correspondiente al objeto fruta por su id, en el array pedidosFruta
- con este index y el metodo splice, eliminamos la fruta del arrego y ejecutamos "guardoPedido()" para guardarlo nuevamente en storage
- filamente ejecuto eventoBotonX, para volver a activar los botones resultantes

*/
function eliminarFruta(fruta){

    let index = pedidoFrutas.findIndex((compra) => {
        return compra.codigo === fruta.id
    })

    pedidoFrutas.splice(index, 1)
    cargarCompras(pedidoFrutas)
    guardoPedido()
    eventoBotonX()

}