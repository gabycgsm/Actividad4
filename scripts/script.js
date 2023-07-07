let carrito;
let productos;
let cantidad = 0;
let valor;
let listaProductos;


const init = (objProduc) => {
    productos = objProduc;

    //inicializar el carrito
    //pintar los productos
    carrito = new Carrito(productos);
    pintarProducto();

}


document.addEventListener("DOMContentLoaded", () => {    
    fetch("https://jsonblob.com/api/jsonBlob/1122254029542670336")
        .then((res) => res.json())
        .then(init)
});

const pintarProducto = () => {
    //crear cabecera de la tabla    
    const wrapper = document.querySelector("#w-tabla");
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.classList.add('tabla');
    thead.classList.add('tabla__head');



    wrapper.appendChild(table);
    table.appendChild(thead);
    table.appendChild(tbody);

    const rowCabecera = document.createElement('tr');
    rowCabecera.classList.add('tabla__head_tr');
    const encabezadoProducto = document.createElement('th');
    encabezadoProducto.innerHTML = "Producto";

    const encabezadoCantidad = document.createElement('th');
    encabezadoCantidad.innerHTML = "Cantidad";

    const encabezadoUnidad = document.createElement('th');
    encabezadoUnidad.innerHTML = "Unidad";

    const encabezadoTotal = document.createElement('th');
    encabezadoTotal.innerHTML = "Total"

    rowCabecera.appendChild(encabezadoProducto);
    rowCabecera.appendChild(encabezadoCantidad);
    rowCabecera.appendChild(encabezadoUnidad);
    rowCabecera.appendChild(encabezadoTotal);
    thead.appendChild(rowCabecera);


    //insertar datos en la tabla
    productos.products.forEach(element => {

        const rows = document.createElement('tr');
        const datoProducto = document.createElement('td');
        const datoCantidad = document.createElement('td');
        const datoUnidad = document.createElement('td');
        const datoTotal = document.createElement('td');

        datoTotal.setAttribute("id", "datoTotal")

        datoProducto.classList.add('tabla__td_producto');

        datoProducto.innerHTML = element.title;
        datoUnidad.innerHTML = element.price + productos.currency;

        const textoCantidad = document.createElement('input');
        textoCantidad.setAttribute("type", "text");
        textoCantidad.setAttribute("id", "textoCantidad");
        textoCantidad.setAttribute("value", 0);                  
        


        textoCantidad.classList.add('inp');

        const botonMas = document.createElement('button');
        botonMas.classList.add('btn');
        botonMas.innerHTML = "+";
        botonMas.addEventListener("click", addCantidad);
        botonMas.setAttribute("name", element.SKU);          
        botonMas.setAttribute("id", "btnMas");  


        const botonMenos = document.createElement('button');
        botonMenos.classList.add('btn');
        botonMenos.innerHTML = "-";

        botonMenos.addEventListener("click", restarCantidad);



        datoCantidad.appendChild(botonMenos);
        datoCantidad.appendChild(textoCantidad)
        datoCantidad.appendChild(botonMas);


        rows.appendChild(datoProducto);
        rows.appendChild(datoCantidad);
        rows.appendChild(datoUnidad);
        rows.appendChild(datoTotal);
        tbody.appendChild(rows);

        const rowsRef = document.createElement('tr');
        const datoRef = document.createElement('td');
        datoRef.setAttribute("id", "refCod");
        datoRef.setAttribute("value", element.SKU);
        rowsRef.classList.add('tabla__rowsRef');
        datoRef.classList.add('tabla__datoRef');

        datoRef.innerHTML = "Ref:" + element.SKU;

        rowsRef.appendChild(datoRef);
        tbody.appendChild(rowsRef);



    });

}

const getValorInput = (event) => {

    let valorInput = document.getElementById("textoCantidad");
    document.getElementById("textoCantidad").innerHTML = valorInput;
}




const addCantidad = () => {    
    cantidad++;    
    
    const productoSeleccionado = carrito.obtenerProducto(document.querySelector("#refCod").getAttribute("value"));   
    const botonSelect = document.querySelector("#btnMas").getAttribute("name");    
    listaProductos = carrito.anadirProductos(productoSeleccionado);
    /*listaProductos[0].forEach(pro => {        
        //document.getElementById("total").innerHTML = "TOTAL:" + carrito.calcularTotal(cantidad, productoSeleccionado.price);
    })*/    
    document.getElementById("textoCantidad").setAttribute("value", cantidad);
    document.getElementById("total").innerHTML = "TOTAL:" + carrito.calcularTotal(cantidad, productoSeleccionado.price);
    document.getElementById("datoTotal").innerHTML = 0;
    document.getElementById("datoTotal").innerHTML = carrito.calcularTotal(cantidad, productoSeleccionado.price);
    document.getElementById("listaProductos").innerHTML = productoSeleccionado.title + " " + carrito.calcularTotal(cantidad, productoSeleccionado.price);


}

const restarCantidad = () => {    
    cantidad--;    
    const productoSeleccionado = carrito.obtenerProducto(document.querySelector("#refCod").getAttribute("value"));
    document.getElementById("textoCantidad").setAttribute("value", cantidad);
    document.getElementById("total").innerHTML = "TOTAL:" + carrito.calcularTotal(cantidad, productoSeleccionado.price);
    document.getElementById("datoTotal").innerHTML = 0;
    document.getElementById("datoTotal").innerHTML = carrito.calcularTotal(cantidad, productoSeleccionado.price);
    if(cantidad == 0){
        document.getElementById("listaProductos").innerHTML = "";
    }else{
        document.getElementById("listaProductos").innerHTML = productoSeleccionado.title + " " + carrito.calcularTotal(cantidad, productoSeleccionado.price);
    }    

}













