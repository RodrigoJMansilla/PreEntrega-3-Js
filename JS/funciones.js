




//funcion que recupera una fruta de gondola segun su id. Generalmente se usa enviando un codigo de los objetos instanciados de comprarFruta, para entender que fruta de la gondola es la que esta comprando el usuario en su pedido.
function recuperaFruta(codigo){
    encontrado = gondola.find((fruta)=>{return fruta.id === codigo})
    return encontrado
}


/*Funcion que guarda el array "pedidoFrutas" que contiene la informacion de las frutas a comprar
- Valido que haya algo en el array "pedidoFrutas"
- Guardo bajo la clave "pedidoFrutas" el array en localStorage
*/
function guardoPedido(){
    if(pedidoFrutas.length > 0){
        localStorage.setItem("pedidoFrutas", JSON.stringify(pedidoFrutas))
        console.table(pedidoFrutas)
        console.log("Se guardo Este arreglo en local storage")
    }
    console.log("no habia arreglo pedidoFrutas en local storage")

}



/*
Funcion que recupera el array "pedidoFrutas"
- Como voy a hacer un push al array, primero lo reseteo por que yo quiero que este sincronizado con el array que esta en local storage
- verifico que haya algo bajo la clave "pedidoFrutas"
- recupero el arreglo "pedidoFrutas" en un arreglo auxiliar.
- itero el arreglo auxiliar y voy pusheando hacia mi arreglo "pedidoFrutas" el contenido de la clave en local storage.
*/

function recuperoPedido(){
    pedidoFrutas = []
    if(localStorage.getItem("pedidoFrutas")){
        const arrayAux = JSON.parse(localStorage.getItem("pedidoFrutas"))

        pedidoFrutas.push(...arrayAux)

        console.table(pedidoFrutas)
        console.log("se recupero este arreglo en pedidoFrutas[]")
    }
}



//Funcion que devuelve el string enviado con su mayuscula
function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}


/* 
Funcion de comprar adaptada, recibe un codigo (correspondiente a un id de los objetos fruta del arreglo gondola)

Captura la cantidad de kg de la fruta con un prompt (validado)

instancia una fruta comprada con esa cantidad.

luego recorre el arreglo del pedido, para ver si no se esta agregando una fruta ya comprada. En el caso de que si, avisa y pregunta si se desea agregar esa cantidad a la obtenida previamente.

Finalmente luego de procesados los datos, llama al metodo confirmarAgregado de la clase, para enviar la fruta correspondiente al pedido.

*/
function compraFruta(codigo, cantidad){
    

    instancia = new comprarFrutas (codigo, cantidad)

    let band1 = 0

    for(fruta of pedidoFrutas){
        if(fruta.codigo === instancia.codigo){
            band1 = 1
            if(confirm(`Su pedido ya incluye ${fruta.cantidadKg} Kg de ${recuperaFruta(fruta.codigo).nombre} ¿Desea agregar otros ${instancia.cantidadKg} Kg ?`)){
                fruta.cantidadKg = parseInt(fruta.cantidadKg) + parseInt(instancia.cantidadKg)
            }else{
                console.warn("Su pedido no fue modificado.")
            }
        }
    }

    if(band1 == 0){
        instancia.confirmarAgregado(instancia)
        console.table(pedidoFrutas)
    }


}
