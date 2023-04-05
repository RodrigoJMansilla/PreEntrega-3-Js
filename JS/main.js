
// Linkeos con querySelector

const cont = document.querySelector("main div.conMain")
const inputSearch = document.querySelector("input#busqueda")




//funcion que recupera una fruta de gondola segun su id. Generalmente se usa enviando un codigo de los objetos instanciados de comprarFruta, para entender que fruta de la gondola es la que esta comprando el usuario en su pedido.
function recuperaFruta(codigo){
    encontrado = gondola.find((fruta)=>{return fruta.id === codigo})
    return encontrado
}



// // caso agregar producto
// function agregoCarrito(){
//     let codigo = parseInt(prompt(msjFrutas))

//     while(isNaN(codigo) || recuperaFruta(codigo)== undefined){
//             console.warn("Ha ingresado un valor erroneo. Por favor ingreselo nuevamente\n")
//             codigo = parseInt(prompt(msjFrutas))       
//     }

//     let cantidad = parseFloat(prompt(`Ingrese la cantidad de kg de ${recuperaFruta(codigo).nombre} deseada`))

//     while(cantidad < 0 || isNaN(cantidad)){
//         console.warn("Ha ingresado un valor de cantidad erroneo, por favor ingreselo nuevamente")
//         cantidad = parseFloat(prompt(`Ingrese la cantidad de kg de ${recuperaFruta(codigo).nombre} deseada`))
//     }

//     instancia = new comprarFrutas (codigo, cantidad)

//     let band1 = 0

//     for(fruta of pedidoFrutas){
//         if(fruta.codigo === instancia.codigo){
//             band1 = 1
//             if(confirm(`Su pedido ya incluye ${fruta.cantidadKg} Kg de ${recuperaFruta(fruta.codigo).nombre} ¿Desea agregar otros ${instancia.cantidadKg} Kg ?`)){
//                 fruta.cantidadKg = fruta.cantidadKg + instancia.cantidadKg
//             }else{
//                 console.warn("Su pedido no fue modificado.")
//             }
//         }
//     }

//     if(band1 == 0){
//         instancia.confirmarAgregado()
//     }
    
// }


/* ACTIVIDAD VER DE IMPLEMENTAR CON FOREACH */
// funcion que calcula el total del costo del pedido
function calcularTotal(){
    let acum = 0
    for(fruta of pedidoFrutas){
        acum += parseFloat(fruta.consultarPrecio())
    }
    return acum
}




//caso ver pedido
//funcion que muestra todo el pedido 
function verPedido(){
    console.log('Su pedido esta formado por:\n')
    for(fruta of pedidoFrutas){
        let estaFruta = gondola.find((i)=>{ return i.id === fruta.codigo })

        console.log(`${fruta.cantidadKg}Kg de ${estaFruta.nombre} por $${fruta.consultarPrecio()}`)

    }
    acum = calcularTotal()
    console.log(`El costo total de su pedido es de: $${acum}`)
}


//funcion que calcula cuotas
function calculaCuotas(precio, i){
    
    if(i==3){
        precio *= 1.2
        return precio/i
    }
    else if(i==6){
        precio *= 1.45
        return precio/i
    }
}

//caso efectuar la compra
//funcion que corrobora la accion de finalizar y ofrece cuotas
function finalizarCompra(){
    alert(`El precio final de su carrito es de: $${calcularTotal()}`)

    if(confirm("Desea pagar en cuotas?")){
        iCuotas = parseInt(prompt(msjCuotas))
        
        while((iCuotas !== 3 && iCuotas !== 6) || isNaN(iCuotas)){
            console.warn("El numero de cuotas debe ser 3 o 6, ingreselo nuevamente.\n")
            iCuotas = parseInt(prompt("ingrese '3' o '6' de acuerdo a la cantidad de cuotas requeridas."))
        }

        alert("El pago se realizara en " + iCuotas + " cuotas de $" + calculaCuotas(calcularTotal(), iCuotas))
    }
    direccionCliente = prompt("Ingrese la dirección de envío:")
    alert("Muchas Gracias por su compra! ya estamos preparando su pedido.")
}

// funcion resetear: inicializa las variables de nuevo a 0.
function resetear(){
    pedidoFrutas=[]
}

// funcion iniciar: genera el loop del menu
function iniciar(){
    resetear()
    while(continuar){
        menu()
    }
}

//funcion menu
function menu(){
    choice = parseInt(prompt(msjMenu))
    switch(choice){
        case 1:
            // caso agregar producto
            agregoCarrito()
            break
        case 2:
            // caso ver las frutas del carrito
            verPedido()
            break
        case 3:
            // caso ver costo total del carrito
            if(confirm("¿Desea Finalizar su compra?")){
                finalizarCompra()
                actualizarStock(pedidoFrutas)
                continuar = false
            }
            break
        default:
            break
    }
}

// funcion que resta todo el stock vendido de "pedidoFrutas" del stock de gondola. Esta funcion como no interactua con el usuario, se puede corroborar viendo el array gondola, luego de finalizada la compra.
function actualizarStock(arrayVenta){
    let frutaGondola
    arrayVenta.forEach((fruta)=>{
        frutaGondola = recuperaFruta(fruta.codigo)
        frutaGondola.stockKg = frutaGondola.stockKg - fruta.cantidadKg
        gondola[frutaGondola.id-1].stockKg = frutaGondola.stockKg
    })
}




//----------------------------------------------------//

// Funcion que carga en el HTML interno del div "conMain" en el main todas las frutas del arreglo "gondola", presentadas en cards.
function cargarFrutas(array){
    cont.innerHTML = ""
    if(array.length > 0){
        array.forEach((fruta)=>{
            cont.innerHTML += templateCard(fruta)
        })
    }
}

//Cargo todas las frutas de gondola
cargarFrutas(gondola)

//Funcion que devuelve el string enviado con su mayuscula
function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}

//Agrego el evento search al input.
inputSearch.addEventListener("search", () => {
    let buscar = gondola.filter((fruta) => fruta.nombre.includes(capitalize(inputSearch.value.trim())))

    if (buscar.length > 0){
        cargarFrutas(buscar)
    }
})


/* 
Funcion de comprar adaptada, recibe un codigo (correspondiente a un id de los objetos fruta del arreglo gondola)

Captura la cantidad de kg de la fruta con un prompt (validado)

instancia una fruta comprada con esa cantidad.

luego recorre el arreglo del pedido, para ver si no se esta agregando una fruta ya comprada. En el caso de que si, avisa y pregunta si se desea agregar esa cantidad a la obtenida previamente.

Finalmente luego de procesados los datos, llama al metodo confirmarAgregado de la clase, para enviar la fruta correspondiente al pedido.


//// SEGUIR ACA //////
Considerar hacer un html en vez de un prompt, por que es una mierda jaja.
Si pongo "cancelar" me devuelve NaN, lo mismo que si ingreso un texto. (osea que no me queda funcional el boton cancelar). Se vería mas lindo todo si hago un html de salida para confirmar la compra e ingresar los datos.
Entonces el boton tendria que referenciar al html de salida, y tomar los datos de sobre que fruta estamos hablando.
en el html de salida deberiamos mostrar la card correspondiente y con unos input tomar la catidad a comprar, y recien ahi confirmar la compra.
*/
function compraFruta(codigo){
    
    let cantidad = parseFloat(prompt(`Ingrese la cantidad de kg de ${recuperaFruta(codigo).nombre} deseada`))
    if(cantidad == null){
        return 0
        }
    else{
        while(cantidad < 0 || isNaN(cantidad)){
            if(cantidad == null){
                return 0
            }
            else{            
            console.warn("Ha ingresado un valor de cantidad erroneo, por favor ingreselo nuevamente")
            cantidad = parseFloat(prompt(`Ingrese la cantidad de kg de ${recuperaFruta(codigo).nombre} deseada`))
            }
        }

        instancia = new comprarFrutas (codigo, cantidad)

        let band1 = 0

        for(fruta of pedidoFrutas){
            if(fruta.codigo === instancia.codigo){
                band1 = 1
                if(confirm(`Su pedido ya incluye ${fruta.cantidadKg} Kg de ${recuperaFruta(fruta.codigo).nombre} ¿Desea agregar otros ${instancia.cantidadKg} Kg ?`)){
                    fruta.cantidadKg = fruta.cantidadKg + instancia.cantidadKg
                }else{
                    console.warn("Su pedido no fue modificado.")
                }
            }
        }

        if(band1 == 0){
            instancia.confirmarAgregado()
            console.table(pedidoFrutas)
        }
    }
    
}


//Agrego los eventos para cada boton
function eventosBotones(){

    const botones = document.querySelectorAll("button.btnFruta")

    for (boton of botones){

        boton.addEventListener("click", (e)=>compraFruta(parseInt(e.target.id)))

        boton.addEventListener("mousemove", (e)=>{
            
            let fruta = recuperaFruta(parseInt(e.target.id))
                
            e.target.title=`Agregar ${fruta.nombre} al carrito`
        })
    
    }
}

eventosBotones()


