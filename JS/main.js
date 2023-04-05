
// Linkeos con querySelector

const logo = document.querySelector("div.conLogo img")
const cont = document.querySelector("main div.conMain")
const inputSearch = document.querySelector("input#busqueda")
const buttonSalida = document.querySelector("button.btnPedido")









//------------------- FUNCIONES ENTREGA ANTERIOR -----------------

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






//le agrego funcionalidad al boton del index en el logo y un mousemove
logo.addEventListener("click", ()=> {
    location.href = "index.html"
})
logo.addEventListener("mousemove",()=>{
    logo.className = "conLogoHover"
})

// Funcion que carga en el HTML interno del div "conMain" en el main todas las frutas del arreglo "gondola", presentadas en cards.
function cargarFrutas(array){
    cont.innerHTML = ""
    if(array.length > 0){
        array.forEach((fruta)=>{
            cont.innerHTML += templateCard(fruta)
        })
    }
}

/*
Funcion que carga el template modificado para ingresar la cantidad a comprar
*/
function cargarFrutasCompra(fruta){
    cont.innerHTML = templateCardCompra(fruta)   
}

//Le agrego funcionalidad al boton cancelar para que me devuelva al index sin hacer nada (y se carguen nuevamente las frutas)
const funcionBotonCancelar = () => location.href = "index.html"



//Cargo todas las frutas de gondola
cargarFrutas(gondola)



//Agrego el evento search al input.
inputSearch.addEventListener("search", () => {
    let buscar = gondola.filter((fruta) => fruta.nombre.includes(capitalize(inputSearch.value.trim())))

    if (buscar.length > 0){
        cargarFrutas(buscar)
    }
    eventosBotones() // Agrego funcionalidad a los botones luego de un evento search
})









/*
La siguiente funcion va a manejar las cards en base al boton comprar:
- Asigno todos los botones a un array "botones"
- Recorro el array
- Agrego el evento click a cada boton y envio el objeto event
- defino un arrayUnitario para mostrar la card correspondiente al clickeo (vacio)
- recupero la fruta clickeada en base al id del objeto event
- Ejecuto la funcion cargarFrutasCompra, referida al objeto fruta clickeada para mostrar la card con el input number.
- Ejecuto la funcion eventosBotonesAddCancel (*ver funcion) que le da funcionalidad a los dos botones.
- Paralelamente al recorrer el array tambien se agrega el evento mousemove para que aparezca un titulo antes de apretar
*/
function eventosBotones(){
    const botones = document.querySelectorAll("button.btnFruta")

    for (boton of botones){

        boton.addEventListener("click", (e)=>{
            let fruta = recuperaFruta(parseInt(e.target.id))
            cargarFrutasCompra(fruta)
            eventosBotonesAddCancel()
        })


        // Esta parte queda igual, ya que hace referencia al cartelito cuando pasamos el cursor por encima del boton
        boton.addEventListener("mousemove", (e)=>{

            let fruta = recuperaFruta(parseInt(e.target.id))
            e.target.title=`Agregar ${fruta.nombre} al pedido`
        })
    
    }
}

/*
Le agrego funcion a los botones "Agregar" y "Cancelar":
No sabia como diferenciar los botones por su contenido, para ello la solucion que encontre fue asignarlos genericamente con un querySelectorAll
y luego a traves de la propiedad "e.target.innerText" del objeto event, diferenciarlos.
- recupero el pedido de local storage
- Genero array de botones(en este caso son solo 2)
- Recorro array y comparo con un if el contenido del texto interno del nodo
- si es agregar: tomo el inputnumber y llamo a la funcion "compraFruta(target.id, value)" y guardo el arreglo en local storage
- si es cancelar: refiero a index.html para que se vuelvan a cargar las frutas.

*/
function eventosBotonesAddCancel(){
    recuperoPedido()
    const buttonAddCancel = document.querySelectorAll("button.btnFruta")
    for (boton of buttonAddCancel){

        boton.addEventListener("click",(e) => {
            
            if(e.target.innerText == "Agregar"){
                const inputNumber = document.querySelector("input.inputNumber")
                compraFruta(parseInt(e.target.id), parseFloat(inputNumber.value))
                guardoPedido()
                location.href = "index.html"
            }

            if(e.target.innerText == "Cancelar"){
                location.href = "index.html"
            }
            
        })
    }
}

eventosBotones()



recuperoPedido()


//agrego evento al boton para abrir salida.html
buttonSalida.addEventListener("click", ()=>{ location.href = "./pages/salida.html"})
// buttonSalida.addEventListener("mousemove", ()=> buttonSalida.className = "btnPedido conLogoHover")

