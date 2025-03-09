// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

//Aqui simplemente declaro mis variables con alcance global



let nombres = [];           //Guardara los nombres en una lista
let amigoSecreto;           //Cuando la función math genere un número ramdom el guardara el valor o nombre de esa posicion
let amigoAñadido;           //Simplemente el nombre que capturamos el cuál fue ingresado en el input
let posicion;               //Guarda el número ramdom de math para que sea la posición de la lista

let textoAviso = document.querySelector(`.contenido_aviso_amigo_secreto`);      //Seleccionador del Texto del contenedor que nos dice nuestro amigo secreto
let botonSiguiente = document.querySelector(`button-advice`);                   //Seleccionador del Boton que esta dentro del contenedor para poder continuar
let aviso = document.querySelector(`.aviso_amigo_secreto`);                     //Seleccionador de un contenedor para la caja que contiene los dos anteriores elementos que dicen nuestro amigo secreto



function modificarString(elemento, texto) {                 //Función para modificar textos, seleccionando la etiqueta y modificando su valor
    let modificarTexto = document.querySelector(elemento);
    modificarTexto.innerHTML = texto;

}



function limpiarBarra() {                                   //Simplemente captura mi barra de texto y borra su contenido, sera llamada esta función varias veces
    let clean = document.getElementById(`amigo`);
    clean.value = ``;

}


function agregarAmigo() {

    let insertado = document.querySelector(`#amigo`);           //Seleccionador del input donde esta amigo secreto

    insertado = insertado.value;                                //Capturamos su valor por referencia

    if (insertado != `` && isNaN(insertado)) {                  //Si es diferente a contenido vacío y si no es un numero funciona
        nombres.push(insertado);                                //nombre.push(`${insertado}`);Agregamos valor a la lista
        console.log(nombres);
        amigoAñadido = insertado;                               //amigo añadido es igual al valor insertado para una lista diferente que mostrara los amigos puestos y no el amigo secreto
        visualizarLista();                                      //Visualizar lista captura el amigoAñadido
        limpiarBarra();                                         //Limpiar barra de nombres
    }

    else {                                                      //Se ejecuta si su valor es vacio y no es un numero
        alert(`Por favor indique el nombre de los participantes del juego`);
        limpiarBarra();
    }


}



//Devuelve un numero ramdom desde cero cerrado hasta el tamaño de la lista abierto (no lo incluye)
//Funciona porque la posición de la lista inicia en cero pero length me dice el 
//el tamaño de la lista no la posicion al multiplicarse math.ramdom por el número de posiciones o tamaño
// es un número mayor ejemplo 5 elementos pero su posicion es de 0 a 4 por lo cual al * por 5 entra tanto el cero como el 4 por math .ramdom


function ramdomnombre() {

    posicion = Math.floor(Math.random() * (nombres.length));            //Generar posición ramdom con el tamaño de lista

    amigoSecreto = nombres[posicion];                                   //Ahora ese numero ramdom en la lista tendra un valor que capturo como mi amigo secreto

    console.log(nombres);

}





function visualizarLista() {                                            //FUNCIÓN QUE GENERA MI LISTA DE PERSONAS AÑADIDAS PARA EL SORTEO VISUALMENTE
    let ImprimirLista = document.getElementById(`listaAmigos`);         //Seleccionamos la lista en html
    let añadirListahtml = document.createElement("li");                 //Generamos un elemento li para ella (independiente)
    añadirListahtml.innerHTML = ` ${amigoAñadido}`;                     //El elemento (li) creado es modificado su texto con amigoAñadido
    ImprimirLista.appendChild(añadirListahtml);                         //A nuestro elemento lista le añadimos la etiqueta interna modificada ya (li)

}



function sortearAmigo() {                                               //FUNCIÓN ONCLICK
    if (nombres.length != 0) {                                          //Si es difente de cero el tamaño de lista es decir tiene elementos funciona
        ramdomnombre();                                                 //Llamamos función que genero el amigo secreto

        /*alert(`¡Tu amigo secreto es ${amigoSecreto}!`);*/

        aviso.disabled = false;                                         //Habilitamos nuestra ventana de aviso para que se muestre
        modificarString(`.contenido_aviso_amigo_secreto`, `¡Tu amigo secreto es ${amigoSecreto}!`)//Modificamos el contenido del aviso


        nombres.splice(posicion, 1);                                    //Una vez tenemos ya ese valor de amigo lo eliminamos de la lista para que no salga más


        if ((nombres.length) == 0) {                                    //Si la condición inicial fue ejecuta y se quedó vacia en el proceso funciona
            modificarString("#subtitulo", `Ya todos tienen su amigo secreto :D`);
            let botones = document.querySelector(`#botonSortearAmigo`);
            botones.setAttribute(`disabled`, `true`);                   //Aca modifica el html, deshabilitando el boton sortear amgio pq pues la lista está vacía
            botones.disabled = true;                                    //Modifica enteramente por medio de dom haciendo lo mismo, más eficiente
            let añadir = document.querySelector(`.button-add`);         //Deshabilitamos igualmente el boton añadir
            añadir.disabled = true;
            if (botones.disabled) {
                console.log(`EL boton esta desactivado`);
            }

        }
    }
    else {                                                              //Se ejecuta solo si inicialmente la lista esta vacía
        if ((nombres.length) == 0) {
            alert(`Bro debes tener amigos para jugar`);                 //Alerta de que añadas amigos
        }
    }
}


function delBotonSiguiente() {                                          //Boton siguiente interacción onlick HTMl
    aviso.disabled = true;                                              //Deshabilita la sección de la ventana del aviso del amigo secreto haciendo que no se muestre tampoco gracias a CSS
    textoAviso.innerHTML = ``;                                          //El contenido del texto se reinicia o torna vacio

}



/*AQUI LA LÓGICA AL INICIO TENIA SOLO IF (NINGUN ELSE) ENTONCES ASI UN IF ESTUVIERA DENTRO DE OTRO IF
SE ALCANZABA A QUITAR EL ULTIMO ELEMENTO DE LA LISTA, Y COMO ERAN SOLO IF EL CÓDIGO EJECUTABA
LA SIGUIENTE CONDICIÓN PQ SE IBA A CUMPLIR YA QUE LOS IF SON INDEPENDIENTES SIN RELACIÓN CON EL ANTERIOR EL CÓDIGO
REVISA SU CONDICIÓN DE FORMA SECUENCIAL PS NO PASA NADA SI NO SE CUMPLE ENTONCES EJECUTA LA SIGUIENTE,
EN CAMBIO SI UTILIZO ELSE OCURRE QUE NADA MÁS QUE SI AL INICIAR NO TIENE AMIGOS PQ SERIA IGUAL A CERO LE MUESTRE QUE 
LOS NECESITA PORQUE EL ELSE ME GENERA LA RELACIÓN CON UN IF SIENDO EL CÓDIGO QUE SE EJECUTA SI Y SOLO SI LO INICIAL 
NO SE CUMPLIO DESDE UN PRINCIPIO,SI FUERAN PUROS IF NO HABRIAN CONSECUENCIA YA QUE SON ELEMENTOS INDEPENDIETES QUE SE
REVISAN SECUENCIALMENTE,ENTONCES EL PROGRAMA EVALUARIA TODAS EN FILA EN VEZ DE INTERPRETAR LA CONDICIÓN Y EJECUTAR
SOLO UNA EN CASO DE QUE SE CUMPLA O NO*/




function reiniciarJuego() {
    nombres = [];
    amigoSecreto = null;
    amigoAñadido = null;
    posicion = null;
    let restablecer = document.querySelector(`#listaAmigos`);
    restablecer.innerHTML = "";
    modificarString(`#subtitulo`, `Digita el nombre de tus amigos`);


    let aviso = document.querySelector(`.aviso_amigo_secreto`);
    textoAviso.innerHTML = ``;
    aviso.disabled = true;
    let botonSortearAmigo = document.querySelector(`#botonSortearAmigo`);
    botonSortearAmigo.disabled = false;
    let añadir = document.querySelector(`.button-add`);
    añadir.disabled = false;
}

/*NULL SE ENCARGA DE REINICAR VALORES
SI SOLO PONGO  -> AMIGOSECRETO;    ES VDD QUE AL DECLARAR SI ES UN ELEMENTO VACIO PERO LUEGO SOLO ES 
UNA  FORMA DE LLAMADA ASI SIN ALTERAR SU VALOR ACTUAL Y NO HARIAMOS NADA.
NULL RESTABLECE EL VALOR A VACIO Y AL TIPO DE VARIABLE ORIGINAL PERO SOLO DE UNA VARIABLE(ELEMENTOS CON UN SOLO 
VALOR) CON  ARREGLOS  TENDIRA QUE SER ESPECIFICAMENTE A UNA VARIABLE QUE LO CONFORME*/
/*innerHTML borraría todos los elementos de la lista porque el <ul> o <ol> actúan como una "caja" que solo 
contiene texto y etiquetas HTML dentro.*/














/*

|||||||||||||APRENDIZAJE|||||||||||||||||||||||


GENERAR FUNCIONES PARA TODO LO QUE QUIERO HACER
Primero imprimir lista selecciona la etiqueta y la referencia, ¿QUE VAMOS A MODIFICAR?
es importante porque añadirlsita.html  crea un elemento li y luego modifica su contenido 
pero esto no se ha agregado o guardado html por medio de dom. Entonces appenchild permite tomar un elemento
y guardarle otro que en este caso creamos una viñeta de lista

Esto funciona porque aunque creas un elemento nuevo siempre con el mismo nombre, estamos manejando dom
y crear elemento genera un nuevo nodo independiente (elemento independiente), la clave esta en que un nodo 
funciona diferente a las variables donde sobreescribimos lo q se refiera a lo mismo, por su parte los nodos
al final con appenchild se añaden y ocupan lugar en la memoria del navegador. Pero eso no borra ni remplaza
los anteriores porque solo añade al final de la lista sin tocar los anteriores

PORQUE?
porque la variables primitivas ocupan un mismo lugar en la memoria, pero los objetos no, por eso cuando cambiamos
algo funciona por referencia, cada vez que creamos un objeto asi se llame igual, no remplaza el anterior pq
ocupa un nuevo lugar en la memoria del navegador y de java en lugar de remplazar el anterior en un mismo
espacio como si fuera primitivo

Las variables en JS se sobrescriben porque ocupan el mismo espacio en memoria.

Los nodos en el DOM no se sobrescriben automáticamente porque cada createElement() genera un nuevo objeto en memoria.


ERRORES
El error princiapl fue cuando tomaba el valor que estaba en una posición de mi lista,
pero lo hacia luego de las restas sucesivas del splice como tomaba el valor y ya la lista estaba
vacia mandaba un error, primero se comprueba que no sea vacia

*/

