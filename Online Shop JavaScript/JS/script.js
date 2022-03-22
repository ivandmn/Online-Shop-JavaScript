/**
* @param products Array de productos de la tienda online
*/
var products = new Array(10);
//Imprime la array de products
console.log(products);
//Asigna la cantidad a 0 de todos los productos de la array products.
for (let index = 0; index < products.length; ++index) {
    products[index] = [0]
}
//AddEventListener para que se ejecute cuando se carge el archivo.
document.addEventListener("DOMContentLoaded" , function(){

        /**
        * @param EnterProduct variable para definir si el cursor esta encima de la lista de productos.
        * @param EnterCart variable para definir si el cursor esta encima de la lista de productos.
        */
        let EnterProduct = false;
        let EnterCart = false;

        /**
        * EventListeners para ver cuando el cursor sale y entra de el carrito y la lista de productos
        * @param EnterProduct variable para definir si el cursor esta encima de la lista de productos.
        * @param EnterCart variable para definir si el cursor esta encima de la lista de productos.
        */
        document.getElementById("cart").addEventListener("mouseenter", function(){
                showCart();
        });

        document.getElementById("cart").addEventListener("mouseleave", function(){
            setTimeout(() => {
                EnterCart = false;
                if(EnterCart == false && EnterProduct == false){
                    hideCart(); 
                }  
                EnterProduct = true;
            }, 1000);
        });

        document.getElementById("products-id").addEventListener("mouseenter", function(){
                EnterProduct = true;
        });

        document.getElementById("products-id").addEventListener("mouseleave", function(){
            setTimeout(() => {
                EnterProduct = false;
                if(EnterCart == false && EnterProduct == false){
                    hideCart(); 
                }  
            }, 1000);
        });

        /**
        * EventListener para el boton de realizar pedido
        * @param productList variable para guardar toda la info de los productos que luego se mostra en la alert de confirm.
        * @param texto variable para guardar toda la info de un producto que luego se sumara a la variable productList.
        * @param contador variable asignar el numero de productos que hay en la compra para listarlos luego.
        * @param productListImprimir variable para guardar toda la info de los productos que luego se mostra en el popup.html.
        * @param textoImprimir variable para guardar toda la info de un producto que luego se sumara a la variable productListImprimir.
        * @param cantidad Cantidad del producto.
        * @param nombre Nombre del producto.
        * @param precio Precio del producto.
        * @param precioTotal Precio Total del carrito.
        * @param option Guarda la variable de el confirm que habra seleccionado el usuario acceptar(true)/cancelar(false)
        */
        document.getElementById("realizarpedido").addEventListener("click", function(){ 
            let productList = "";
            let contador = 0;
            let productListImprimir = "";
            for (var i = 0; i < products.length; i++) {
                if(products[i][0] != 0){
                    let cantidad = products[i][0];
                    let nombre = products[i][1];
                    let precio = products[i][2];
                    let textoImprimir = "PRODUCTO " + contador + " - "  + "Nombre del producto - " + nombre + " ; " + "Precio del producto - " + precio + " ; " + "Cantidad del producto - " + cantidad + " ; "
                    let texto = "Nombre del producto - " + nombre + "\n" + "Precio del producto - " + precio + "\n" + "Cantidad del producto - " + cantidad + "\n" + "---------------------------------------\n";
                    productList = productList + texto;
                    productListImprimir = productListImprimir + textoImprimir;
                    contador++;
            }
        }
            let precioTotal = document.getElementById("price-total").innerHTML
            let fecha = dateDays();
            let option = confirm("Fecha de compra " + fecha + "\n" + productList + "\n" + "Precio Total - " + precioTotal + "€");
            if (option == true) {
                myWindow = window.open("popup.html");
                myWindow.document.write(`<h1>You have placed the order.</h1><h3>${fecha}</h3><div>${productListImprimir}</div><h3>Precio Total - ${precioTotal}€</h3>`);
                removeCart();
                refreshCartPrice();
            } else {

            }
        });

        /**
        * Crea multiples funciones una para cada boton de añadir al carrito de las cards.
        * @param elements Array con todos los botones con clase "card-footer".
        * @param name Nombre del producto.
        * @param price Precio del producto.
        * @param image URL de la imagen del producto.
        */
    var elements = document.getElementsByClassName("card-footer");
    for (var i = 0; i < elements.length; i++) {
            (function (index) {
                //Crea un addEventListener por cada elemento, es decir por cada boton
                elements[index].addEventListener("click", function () {
                    for (var x = 0; x < elements.length; x++) {
                        //Si el boton coincide que el boton que hemos apretado, avanzamos en el if
                        if (elements[x] === this) {
                            var name = document.getElementsByClassName("product-name")[x].innerHTML;
                            var price = rmvEuroSymbolPrice(document.getElementsByClassName("price")[x].innerHTML);  
                            var image = document.getElementsByClassName("card-img-top")[x].getAttribute("src");
                            //Si el apartado de cantidad del objeto del array de products es 0, es decir que no se han añadido aun, añade a dicha array nombre, precio y imagen
                            if(products[x][0] == 0){
                                products[x].push(name,price,image);
                            }
                            //Se suma 1 a la cantidad del objeto del array de products (Si es 0, 0+1 = 1, ahora el nuevo valor sera 1)
                            products[x][0] = products[x][0] + 1;    
                            //Se llama a la funcion refreshCart() para refrescar el Carrito
                            refreshCart(products[x], x); 
                            //Se llama a la funcion refreshCartPrice(), para refrescar el precio total del carrito
                            refreshCartPrice();
                            //Se imprime por consola la arry de productos
                            console.log(products);
                            //Crea o actualiza la cookie con la array de products
                            setCookie("products", products);
                        };
                    }
        
                }, false);
            })(i);
    }
}, false);  

/**
* @function increase Incrementa en 1 la cantidad del objeto, con la id del boton de donde se ha clicado. También lo aumenta en la array de products
* @param clicked_id ID del boton que se ha clickado, la llamamos en el html con el "this".
* @param x Se le quita la i de increase y nos quedamos solo con el numero con la funcion replace, ya que el numero nos interesa para saber que producto es el que se aumenta
* @param element Variable donde se guarda la cantidad del producto.
* @param incremento Variable donde se guarda la suma de element(cantidad del producto) +1 al valor que ya tenia
*/
function increase(clicked_id){
    var x = clicked_id.replace("i", "");
    var element = document.getElementById(clicked_id).nextElementSibling.getAttribute("value");
    var incremento = parseInt(element) + 1;
    //Se cambia el value por el nuevo valor
    document.getElementById(clicked_id).nextElementSibling.setAttribute("value", incremento);
    products[x][0] = products[x][0] + 1;
    //Crea o actualiza la cookie con la array de products
    setCookie("products", products);
    //Se imprime la arry de products
    console.log(products);
}

/**
* @function decrease Disminuye en 1 la cantidad del objeto de la cesta, con la id del boton de donde se ha clicado. También lo disminuye en la array de products.
* @param clicked_id ID del boton que se ha clickado, la llamamos en el html con el "this".
* @param x Se le quita la d de decrease y nos quedamos solo con el numero con la funcion replace, ya que el numero nos interesa para saber que producto es el que se aumenta
* @param element Variable donde se guarda la cantidad del producto.
* @param decremento Variable donde se guarda la resta de element(cantidad del producto) -1 al valor que ya tenia
*/
function decrease(clicked_id){
    var x = clicked_id.replace("d", "");
    var element = document.getElementById(clicked_id).previousElementSibling.getAttribute("value");
    var decremento = parseInt(element) - 1;
    document.getElementById(clicked_id).previousElementSibling.setAttribute("value", decremento);
    //Si decremento es igual a 0, el mismo objeto de la arry products elimina nombre, precio y imagen y vuelve con un solo valor que es la cantidad [0] del mismo.
    if(decremento == 0){
        products[x] = [0];
    }
    //si decremento es mayor que 0 se le resta 1 a la cantidad del objeto de la arry de products
    if(decremento > 0){
        products[x][0] = products[x][0] - 1;
    }
    //Si decremento es igual a 0, se borra todo el contenido del carrito
    if(decremento == 0){
        document.getElementById(clicked_id).parentElement.parentElement.innerHTML = "";
    }
    //Crea o actualiza la cookie con la array de products
    setCookie("products", products);
    //Se imprime la array de products
    console.log(products);
}

/**
* @function removeCart Elimina todo el contenido del carrito y vuelve a crear la array products vacia
*/
function removeCart(){
    document.getElementById("items-cart").innerHTML = "";
    products = new Array(10);
    for (let index = 0; index < products.length; ++index) {
    products[index] = [0]
    }
    //Crea o actualiza la cookie con la array de products
    setCookie("products", products);
    //Imprime la array de products
    console.log(products);
}

/**
* @function removerpoduct Elimina el producto del carrito y de la array de products
*/
function removeproduct(clicked_id){
    var x = clicked_id.replace("r", "");
    document.getElementById(clicked_id).parentElement.innerHTML = "";
    products[x] = [0];
    //Crea o actualiza la cookie con la array de products
    setCookie("products", products);
    //Imprime la array de products
    console.log(products);
}

/**
* @function refreshCartPrice Actualiza el precio total del carrito
* @param suma Suma total de todos los productos
* @param elements Array de todos los elementos con clase "cart-price" que son cada uno de los productos del carrito
* @param unitprice Variable para guardar el precio de cada uno de los productos del carrito
* @param unit Variable para guardar el numero de unidades de cada producto del carrito
*/
function refreshCartPrice(){
    let suma = 0;
    var elements = document.getElementsByClassName("cart-price");
    for (var i = 0; i < elements.length; i++) {
        let unitprice = parseInt(rmvEuroSymbolPrice(elements[i].innerHTML));
        let unit = parseInt(elements[i].nextElementSibling.nextElementSibling.getAttribute("value"));
        suma = suma + unitprice*unit;
    }
    //Se refresca en HTML el precio total
    document.getElementById("price-total").innerHTML = suma;
}

/**
* @function refreshCart Actualiza los productos del carrito
* @param cartProduct Array del producto a añadir 
* @param x Posicion del producto a añadir que luego nos servira para saver que producto es el que añadimos
* @param quantity Cantidad del producto.
* @param name Nombre del producto.
* @param price Precio del producto.
* @param image URL imagen del producto.
* @param product Elemento <div> HTML donde se guarda la info del producto a añadir para luego insertar la parte  de codigo html
*/
function refreshCart(cartProduct, x){
        let quantity = cartProduct[0];
        let name = cartProduct[1];
        let price = cartProduct[2];
        let image = cartProduct[3];
        //Si la cantidad es 1 se añade el producto al HTML mediante el appendChild
        if (quantity == 1){
            let product = document.createElement('div');
            product.classList.add('item');
            product.innerHTML = `
                <img src="${image}" class="image-cart">
                <button id="r${x}" class="removebutton" onClick="removeproduct(this.id), refreshCartPrice()">X</button>
                <div class="item-content">
                    <h5>${name}</h5>
                    <h5 class="cart-price">${price}€</h5>
                    <button id="i${x}" class='increase' onClick="increase(this.id), refreshCartPrice()">+</button>
                    <input type='text' id="${x}" value='${quantity}' readonly>
                    <button id="d${x}" class='decrease' onClick="decrease(this.id), refreshCartPrice()">-</button>
                </div>`;
            document.getElementById("items-cart").appendChild(product);
        }
        //Si la cantidad es mayor de 1 se suma uno a la cantidad
        if(quantity > 1){
            let id = x;
            let cantidad = parseInt(document.getElementById(id).getAttribute("value")) + 1;
            document.getElementById(id).setAttribute("value", cantidad);
    }
    //Crea o actualiza la cookie con la array de products
    setCookie("products", products);

}

/**
* @function showCart Funcion para mostrar el carrito
*/
function showCart(){
    document.getElementById("products-id").style.display = "block";
}

/**
* @function hideCart Funcion para ocultar el carrito
*/
function hideCart(){
    document.getElementById("products-id").style.display = "none";
}

/**
* @function rmvEuroSymbolPrice Funcion que elimina el simbolo del euro de un precio para quedarse solo con el numero.
* @param cleanPrice Variable para guardar el precio sin el simbolo del euro.
* @returns cleanPrice
*/
function rmvEuroSymbolPrice(price){
    var cleanPrice; 
    cleanPrice = price.replace("€", "");
    return cleanPrice;
}

/**
* @function dateDays Funcion para la fecha de hoy
* @param day Variable para guardar la fecha en formato dd/mm/yyyy
* @param dd Variable para guardar el dia
* @param mm Variable para guardar el mes
* @param yyyy Variable para guardar el año
*/
function dateDays(){
    var day = new Date();
    var dd = day.getDate();
    var mm = day.getMonth();
    var yyyy = day.getFullYear();     
    if(dd<10) {
       dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    }
    day = dd+'/'+mm+'/'+yyyy;
    return day;
}

/**
* @function setCookie Funcion para crear cookie
* @param cname Nombre de la cookie
* @param cvalue Valor de la cookie
*/
function setCookie(cname, cvalue){
    document.cookie = cname + "=" + cvalue + ";";
}

