/* VARIABLE QUE MANTIENE EL CARRITO VISIBLE */ 
var carritoVisible = false;
/* VARIABLE QUE MANTIENE EL CHAT VISIBLE */ 
var chat = false;

var perfil = false

var mostrar1 = document.getElementsByClassName('contenedor_mensajes')[0];
var mostrar2 = document.getElementsByClassName('carrito_compras')[0];


/* ESPERAR QUE LA PAGINA CARGE PARA CONTINUAR CON EL SCRIPT */
if(document.readyState=='loading') {
    document.addEventListener('DOMContentLoaded', ready)  
} else {
    ready();
}

function ready() {
    /* fUNCIONES DE BOTONES ELIMINAR */
    var botonesEliminar = document.getElementsByClassName('btn_eliminar')
    for (var i = 0; i < botonesEliminar.length; i++) {
        var button = botonesEliminar[i];
        button.addEventListener('click', eliminarItenCarrito) 
    }

    /* FUNCION DE BOTON DE SUMAR CANTIDAD */
    var botonSumarCantidad = document.getElementsByClassName('sumar_cantidad');
    for (var  i = 0; i < botonSumarCantidad.length; i++) {
        var boton = botonSumarCantidad[i];
        boton.addEventListener('click', sumarCantidad);  
    }

    /* FUNCION DE BOTON DE RESTAR CANTIDAD */
    var botonRestarCantidad = document.getElementsByClassName('restar_cantidad');
    for (var  i = 0; i < botonRestarCantidad.length; i++) {
        var boton = botonRestarCantidad[i];
        boton.addEventListener('click', restarCantidad); 
    }

    /* FUNCION DE LOS BOTONES AGREGAR AL CARRITO */
    var botonAgregarCarrito = document.getElementsByClassName('boton_itens');
    for (var i = 0; i < botonAgregarCarrito.length; i++) {
        var agregarCarrito = botonAgregarCarrito[i];

        agregarCarrito.addEventListener('click', botonAgregar)  
    }

    /* FUNCION DEL BOTON PAGAR  */
    document.getElementsByClassName('btn_pagar')[0].addEventListener('click', paraPagar);

    /* ABRIR CARRITO */
    document.getElementsByClassName('compra')[0].addEventListener('click', hacerVisibleElcarrito);

    /* CERRAR CARRITO */
    document.getElementsByClassName('carrar_carrito')[0].addEventListener('click', ocultarCarrito);

    /* FUNCION DEL BOTON DE CHAT */
    document.getElementsByClassName('btn_mensaje')[0].addEventListener('click',hacerVisivleChat)

    /* CERRAR CHAT */
    document.getElementsByClassName('carrar_mensaje')[0].addEventListener('click', ocultarChat);

    /* ABIRIR PERFIL */
    document.getElementsByClassName('btn_perfil')[0].addEventListener('click', mostrarPerfil);

    /* OCULTAR PERFIL */
    document.getElementsByClassName('carrar_perfil')[0].addEventListener('click', ocultarPerfil)
}


/* ELIMINAR ITEN CARRITO SELECIODADO */
function eliminarItenCarrito(event) {
    var clickboton = event.target;
    clickboton.parentElement.parentElement.remove();

    actalizarTotalCarrito();

    /* MINIMIZAR EL CARRITO */
    ocultarCarrito(); 
}

/* ACTUALIZAR EL TOTAL DEL CARRITO */
function actalizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito_compras')[0];
    var carritoitens = carritoContenedor.getElementsByClassName('carrito_iten');
    var total = 0;
    
    /* RECORRER CADA ELEMENTO DEL CARRITO PARA ACTUALIZARLO */
    for (var i = 0; i < carritoitens.length; i++) {
        var itens = carritoitens[i];
        var precioElemento = itens.getElementsByClassName('carrito_itens_precio')[0];
        console.log(precioElemento)

        /* QUITAR SIBOLO DE PESO Y NUMERO */
         var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.',''));
         console.log(precio);
         var cantidadItens = itens.getElementsByClassName('carrito_itens_cantidad')[0];
         var cantidad = cantidadItens.value;
         console.log(cantidad);
         total = total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito_itens_precio_total')[0].innerText = '$' + total.toLocaleString("es")  + ',00';
}



/* AUMENTO DE UNO A LA CANTIDAD */
function sumarCantidad(event) {
    var botonclick = event.target;
    var selector = botonclick.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito_itens_cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito_itens_cantidad')[0].value = cantidadActual;

    /* ACTULIZAR EL VALOR TOTAL */
    actalizarTotalCarrito();
}

/* DISMINUIR  UNO A LA CANTIDAD */
function restarCantidad(event) {
    var botonclick = event.target;
    var selector = botonclick.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito_itens_cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;
    

    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito_itens_cantidad')[0].value = cantidadActual;

        /* ACTULIZAR EL VALOR TOTAL */
    actalizarTotalCarrito();
    }  
}

function botonAgregar(event) {
    var boton = event.target;
    var iten = boton.parentElement;
    var titulo = iten.getElementsByClassName('titulo_itens')[0].innerText;
    console.log(titulo);
    var precio = iten.getElementsByClassName('precio_itens')[0].innerText;
    var imagenSrc = iten.getElementsByClassName('img-itens')[0].src;
    console.log(imagenSrc);

    /* FUNCIO PARA MANDAR LOS PRODUCTOS AL CARRITO */
    agregarItensAlCarrito (titulo, precio, imagenSrc);

    /* HACER EL CARRITO VISIBLE */
    hacerVisibleElcarrito();
}

function agregarItensAlCarrito(titulo, precio, imagenSrc) {
    var iten = document.createElement('div');
    iten.classList.add = 'iten';
    var itenCarrito = document.getElementsByClassName('carrito_itens')[0];
    
   

    /* VERIFICAR SI EL ITEN NO ESTA EN EL CARRITO */
    var nombresIntenCarrito = itenCarrito.getElementsByClassName('carrito_titulo');
    for (var i = 0; i < nombresIntenCarrito.length; i++) {
        if (nombresIntenCarrito[i].innerText == titulo) {
            alert('El producto ya se encuentra en el carrito')
            return;
        }
    }
    var itenCarritoCotenido = `
                <div class="carrito_iten">
                    <img src="${imagenSrc}" alt="" width="80px">
                    <div class="carrito_itens_detalles">
                        <span class="carrito_titulo">${titulo}</span>
                        <div class="selector_cantidad">
                            <i class="fa-solid fa-minus restar_cantidad" style="color: #000000;"></i>
                            <input type="text" value="1" class="carrito_itens_cantidad" disabled>
                            <i class="fa-solid fa-plus sumar_cantidad" style="color: #000000;"></i>
                        </div>
                        <span class="carrito_itens_precio">${precio}</span>
                    </div>
                    <span class="btn_eliminar">
                        <i class="fa-solid fa-trash" style="color: #000000;"></i>
                    </span>
                </div>

    
    `
    iten.innerHTML = itenCarritoCotenido;
    itenCarrito.append(iten);

    /* FUNCION DE ELIMINAR NUEVO ITEN */
    iten.getElementsByClassName('btn_eliminar')[0].addEventListener('click', eliminarItenCarrito);

    /* FUNCION DE SUMAR CANTIDAD */
    iten.getElementsByClassName('sumar_cantidad')[0].addEventListener('click', sumarCantidad);

    /* FUNCION DE RESTAR CANTIDAD */
    iten.getElementsByClassName('restar_cantidad')[0].addEventListener('click', restarCantidad); 

}


function paraPagar(event) {
    alert("Su Compra se realizo satizfactoriamente");

    /* ELIMINAR TODOS LOS ELEMENTOS DEL CARRITO */
    var carrito_iten = document.getElementsByClassName('carrito_itens')[0];
    while(carrito_iten.hasChildNodes()) {
        carrito_iten.removeChild(carrito_iten.firstChild);
    }

    actalizarTotalCarrito();

    ocultarCarrito();
}

function ocultarCarrito(){
    carritoVisible = false; 
    mostrar2.style.visibility = 'hidden';
        mostrar2.style.opacity = '0'
        
        if (carritoVisible == false && chat == true && perfil == true){
            mostrar1.style.right = '32%'
            mostrar2.style.right = '175px'
        }else if(carritoVisible == false && chat == true){
            mostrar2.style.right = '175px'
        } else if (carritoVisible == false && perfil == true){
            mostrar2.style.right = '175px'
        } else if (carritoVisible == false && chat == true){

        } 
     
}


function hacerVisibleElcarrito (){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito_compras')[0];
    carrito.style.visibility = 'visible';
    carrito.style.opacity = '1'
    


    actalizarTotalCarrito(); 
    if (carritoVisible == true && chat == true && perfil == true){
        mostrar1.style.right = '32%'
        mostrar2.style.right = '63%'
    } else if(carritoVisible == true && chat == true){
        mostrar2.style.right = '38%'
    } else if (carritoVisible == true && perfil == true ){
        mostrar2.style.right = '32%'
    } 
}



/* REDIRECCIONAR A EL APARTADO DE CHATS */
function ocultarChat () {
    var  chatOculto = document.getElementsByClassName('contenedor_mensajes')[0];
    chatOculto.style.visibility = 'hidden';
    chatOculto.style.opacity = '0';
    chat = false 
 
    if (chat == false && carritoVisible == true && perfil == true){
        mostrar1.style.right = '95px'
        mostrar2.style.right = '32%'
    } else if (chat == false && carritoVisible == true){
        mostrar2.style.right = '175px'   
    } else if (chat == false && perfil == true){
        mostrar1.style.right = '95px'
    } 
}

function hacerVisivleChat() {
    chat = true
    var chatVisible = document.getElementsByClassName('contenedor_mensajes')[0];
    chatVisible.style.visibility = 'visible';
    chatVisible.style.opacity = '1';
   
    
    if (chat == true && carritoVisible == true && perfil == true){
        mostrar1.style.right = '32%'
        mostrar2.style.right = '63%'
    }else if(chat == true && perfil == true){
        mostrar1.style.right = '32%';
    } else if (chat == true && carritoVisible == true){
         mostrar2.style.right = '38%'   
    }
    
}


function mostrarPerfil() {

    perfil = true
    var perfilVisible = document.getElementsByClassName('contenedor_perfil')[0];
    perfilVisible.style.visibility = 'visible';
    perfilVisible.style.opacity = '1'

    if (perfil == true && chat == true && carritoVisible == true){
        mostrar1.style.right = '32%'
        mostrar2.style.right = '63%'
    } else if(perfil == true && chat == true){
        mostrar1.style.right = '32%';
    } else if ( perfil ==true && carritoVisible == true){
        mostrar2.style.right = '32%'
    } else if (perfil == true && chat == false){
        mostrar1.style.right = '95px'
    }
}

function ocultarPerfil(){
    perfil = false
    var ocultarperfil = document.getElementsByClassName('contenedor_perfil')[0];
    ocultarperfil.style.visibility = 'hidden';
    ocultarperfil.style.opacity = '0';


    if (perfil == false && chat == true && carritoVisible == true){
        mostrar1.style.right = '95px'
        mostrar2.style.right = '38%'
    } else if(perfil == false && chat == true){
       mostrar1.style.right = '95px';
    } else if (perfil == false && carritoVisible == true){
        mostrar2.style.right = '175px'
    }  
}

function actualizarDatos(){
    alert('Esta funcion esta en creacion')
}

function cerrarSesion(){
    location.href= "inicio_sesion.html"

}