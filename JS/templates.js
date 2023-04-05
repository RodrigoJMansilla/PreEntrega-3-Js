// Funcion que devuelve el template de cada Card de las frutas.
const templateCard = (fruta) => {
    return `<div class="card">
            <img class="imgFruta" src="${fruta.ruta}" alt="imagen de ${fruta.nombre}">
            <h4 class="tituloFruta">${fruta.nombre}</h4>
            <div class="miniCont">
                <p class="precioFruta">
                    $${fruta.precio}/kg
                </p>
                
                <p class="precioFruta">
                    Stock: ${fruta.stockKg}Kg
                </p>
            </div>
            <button id="${fruta.id}" class="btnFruta">Comprar</button>    
            </div>`
}


const templateCardCompra = (fruta) => {
    return `<div class="card cardCompra">
            <img class="imgFruta" src="${fruta.ruta}" alt="imagen de ${fruta.nombre}">
            <h4 class="tituloFruta">${fruta.nombre}</h4>
            <div class="miniCont">
                <p class="precioFruta">
                    $${fruta.precio}/kg
                </p>
                
                <p class="precioFruta">
                    Stock: ${fruta.stockKg}Kg
                </p>
            </div>
            
            <input type="number" name="" id="" class="inputNumber" placeholder="Ingrese la cantidad en Kg">
            <div class="miniCont miniContCompra">
                <button id="${fruta.id}" class="btnFruta">Agregar</button>
                <button id="${fruta.id}" class="btnFruta">Cancelar</button>    
            </div>
            </div>`
}