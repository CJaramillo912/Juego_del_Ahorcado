//Banco de Palabras
let palabras = [
    "AMOR", "EQUIPO", "GUITARRA", "CREMA", "MARTILLO",
    "LIBROS","TEMOR", "ALUMINIO", "LETRA", "MIEL",
    "RUEDA", "DISCOTECA", "UNIVERSIDAD", "PERROS", "LLAVES",
    "MANADA", "PELO", "FELICIDAD", "CUNA", "TECLADO",
    "SERVILLETA", "ESCUELA", "PANTALLA", "GENTE", "TENEDOR",
    "MAPA","FAUNA","MENSAJE","COHETE","REY",
    "EDIFICIO","FAMILIA","COLEGIO","CASTILLO","RIQUEZA",
    "VERANO","PLANETA","TELEVISOR","PODER","ELEGANCIA",
    "PERCHA","REMATE","DEBATE","TIEMPO","CUADERNO",
    "RUIDO","PARED","SUERTE","HERRAMIENTA","CARTAS",
    "CHOCOLATE","ANTEOJOS","IMPRESORA","CARAMELOS","LUCES",
    "ZAPATO","BOMBA","OJO","CORBATA","CEREMONIA",
    "ALMA","PLANTA","ODIO","OFICINA","PUERTA",
    "SILLA","ENSALADA","DEPORTE","RECIPIENTE","REFUGIO",
    "NIEVE","HUMEDAD","CELULAR","TRISTEZA","CAMA",
    "DISCURSO","AUTOS","FAMOSO","MADERA","RELOJ",
    "CUCHILLO","OSCURIDAD","CANDADO","LUZ","MONTAÑAS",
    "COMPUTADORA","RADIO","MOÑO","CUADRO","CALOR",
    "PARTIDO","TEATRO","FIESTA","SUEÑO"
];

let abecedario = [
    "A", "B", "C", "D", "E", "F", 
    "G", "H", "I", "J", "K", "L", 
    "M", "N", "Ñ", "O", "P", "Q", 
    "R", "S", "T", "U", "V", "W", 
    "X", "Y", "Z"
];

//secciones
let seccion_menu_principal = document.querySelector(".menu-principal");
let seccion_agregarPalabra = document.querySelector(".agregarPalabra");

//AGREGAR PALABRA
//Para obetener la palabra ingresada por el usuario
let input_palabra = document.querySelector('#txt-palabra');

//Función para verificar que la palabra ingresada sea válida
function agregarPalabra(){
    palabra = input_palabra.value.toUpperCase();
    bandera = true;

//Para verificar que el campo no esté vacío
    if(palabra == ""){
        bandera = false; 
        errorPalabra("no es válida");
    } 

//Para verificar que la palabra no esté repetida y agregar un parametro indicando la razón de error según sea el caso
    if(bandera){
        if(palabras.includes(palabra)) {
            bandera = false; 
            errorPalabra("ya existe");
        }
    }

//Para verificar que sólo se hayan escrito letras y agregar un parametro indicando la razón de error según sea el caso
    if(bandera){
        for (let i = 0; i < palabra.length; i++) {
            if(!abecedario.includes(palabra[i])){
                bandera = false; 
                errorPalabra("no es válida");
            } 
        }
    }

//Si pasa todas las verificaciones se activa la función guardarPalabra("la palabra del usuario")
    if(bandera) guardarPalabra(palabra);
}

//función para guardar palabra en el banco de palabras
function guardarPalabra(palabra){
    palabras.push(palabra);
    input_msg.classList.remove('hidden'); //Para eliminar la clase que esconde el mensaje
    input_msg.classList.remove('msg-error');//Para eliminar la clase que pinta la letra de rojo (formato error)
    input_msg.classList.add('msg-success');//Para agregar la clase que pinta la letra de negro (formato de exito)
    input_msg.innerText = "La palabra '"+ palabra + "' se agregó al banco de palabras correctamente";
    input_palabra.value = ""; //Para que el campo palabra vuelva a estar vació
}

//Palabra indicar que la palabra ingresada no ha sido guardada y mostrar el motivo
function errorPalabra(motivo){
    input_msg.classList.remove('hidden'); //Para eliminar la clase que esconde el mensaje
    input_msg.classList.remove('msg-success'); //Para eliminar la clase que pinta la letra de negro (formato de exito)
    input_msg.classList.add('msg-error'); //Para agregar la clase que pinta la letra de rojo (formato error)
    input_msg.innerText = `La palabra "${palabra}" ${motivo}`;
}

//Para mostrar el menu de agregar palabra
function mostrarAgregarPalabra(){
    seccion_menu_principal.classList.add('hidden');
    seccion_agregarPalabra.classList.remove('hidden');
}

//Para esconder el menu de agregar palabra
function volver(){
    seccion_menu_principal.classList.remove('hidden');
    seccion_agregarPalabra.classList.add('hidden');
    input_msg.classList.add('hidden');
}


//JUEGO
let palabra
let banderaGanar;
let vidas = 0;

let letrasSuccess = [];
let letrasUsadas = [];

//tablero de dibujo
//let dibujo = document.querySelector('.lienzo');
let tablero = document.querySelector('#tablero');
let mensaje = document.querySelector('.mensaje');
//let pincel = dibujo.getContext("2d");*/
//pincel.lineWidth = 4;

/*
//Para pintar lineas
function pintarLinea(xs, ys, xe, ye, color){
    pincel.beginPath();
    pincel.strokeStyle = color;
    pincel.moveTo(xs, ys);
    pincel.lineTo(xe, ye);
    pincel.stroke();
}

//Para pintar circulo
function pintarCirculo(x, y, radio, color){
    pincel.fillStyle = color;
    pincel.beginPath();
    pincel.arc(x,y,radio,0,2*Math.PI);
    pincel.fill();
}
*/

//Captura el evento cuando se oprime una tecla
document.addEventListener('keydown', (event) => {
    let tecla = event.key;
    capturaLetra(tecla);
});

//Para que se elija una palabra aleatoria del banco de palabras
function palabraAleatoria(){
    max = palabras.length;
    num = Math.round(Math.random() * max) - 1;
    console.log(palabras[num])
    return palabras[num];
}

//Para que se creen los espacios para cada letra de la palabra aleatoria
function prepararTableroLetras(){
    palabra = palabraAleatoria();
    tablero.innerHTML = "";
    for(let i = 0; i < palabra.length; i++){
        l = `<input class="letra" readonly id="let${i}" type="text" value="">`;
        tablero.innerHTML = tablero.innerHTML + l;
        letrasSuccess.push('-');
    }
}

//Empezar juego y esconder los otros menús
function empezarJuego(){
    iniciaJuego();
    seccion_menu_principal.classList.add('hidden');
    seccion_agregarPalabra.classList.add('hidden');
}

//Inicia el juego, se agregan 9 vidas y se resetean todas las variables
function iniciaJuego(){
    prepararTableroLetras();
    vidas = 9;
    resetJuego();
    letrasSuccess = [];
    letrasUsadas = [];
    banderaGanar = 0;
}

//función para capturar la letra
function capturaLetra(letra) {
    //si aún no ha perdido o ganado
    if((vidas > 0) && (banderaGanar < palabra.length)){
        bandera_permitido = abecedario.includes(letra.toUpperCase());
        bandera_usado = letrasUsadas.includes(letra.toUpperCase());
        
        //Si lo ingresado es una letra y no está repetida se activa validarLetra
        if(bandera_permitido == true && bandera_usado == false) validarLetra(letra.toUpperCase());
        else console.log('tecla no permitida');
    }
}
//Función para validar la letra
function validarLetra(letra){
    let bandera = banderaGanar;
    letrasUsadas.push(letra);

    //divide la palabra por letras y por cada elemento verifica y se ejecuta asignarLetra en la posicion indicada si se acertó
    palabra.split('').forEach((element, i) => {
        if(element === letra){
            banderaGanar++;
            asignarLetra(letra, i);
        }
    });
    
    //Si no hubo aciertos suma un error
    if(banderaGanar <= bandera){
        editarTecla(letra, 'error');
        validarVida();
    //De lo contrario suma un acierto
    }else{
        editarTecla(letra, 'success');
    }

    //Si ya se acertaron todas las letras
    if(banderaGanar == palabra.length){
        mensajeJuegoterminado("Juego completado :D", "win");
    }
}

//función que realiza una instrucción según las vidas que queden
function validarVida() {
    vidas--;

    switch(vidas){
        case 8: 
            con9vidas.classList.add('hidden');
            con8vidas.classList.remove('hidden');
            /*pintarLinea(10, 0, 10, 200,"#072B61");*/
            break;
        case 7: 
            con8vidas.classList.add('hidden');
            con7vidas.classList.remove('hidden');
            /*pintarLinea(10, 2, 160, 2,"#072B61");*/
            break;
        case 6: 
            con7vidas.classList.add('hidden');
            con6vidas.classList.remove('hidden');
            /*pintarLinea(160, 0, 160, 20,"#072B61");*/
            break;
        case 5: 
            con6vidas.classList.add('hidden');
            con5vidas.classList.remove('hidden');
            /*pintarCirculo(160,40,25,"#072B61");
            pintarCirculo(160,40,21,"#FFF");*/
            break;
        case 4: 
            con5vidas.classList.add('hidden');
            con4vidas.classList.remove('hidden');
            /*pintarLinea(160, 61, 160, 140,"#072B61");*/
            break;
        case 3: 
            con4vidas.classList.add('hidden');
            con3vidas.classList.remove('hidden');
            /*pintarLinea(160, 70, 135, 110,"#072B61");*/
            break;
        case 2: 
            con3vidas.classList.add('hidden');
            con2vidas.classList.remove('hidden');
            /*pintarLinea(160, 70, 185, 110,"#072B61");*/
            break;
        case 1: 
            con2vidas.classList.add('hidden');
            con1vida.classList.remove('hidden');
            /*pintarLinea(160, 140, 135, 180,"#072B61");*/
            break;
        case 0: 
            con1vida.classList.add('hidden');
            con0vidas.classList.remove('hidden');
            /*pintarLinea(160, 140, 185, 180,"#072B61");*/
            break;
        default: break;
    }
    
    if(vidas == 0){
        mensajeJuegoterminado("Juego terminado", "fail");
    }
    
}

//muestra mensaje si ganó o perdió y con los respectivos colores
function mensajeJuegoterminado(texto, color){
    mensaje.classList.add('show-mensaje');
    mensaje.classList.add('color-'+color);
    mensaje.innerText = texto
}

//Agrega las letras en la posición indicada
function asignarLetra(letra, indice){
    let input = document.getElementById('let'+indice);
    input.value = letra
}

//Edita la tecla presionada según si acertó o no
function editarTecla(letra, opcion){
    let tecla = document.getElementById(letra);
    tecla.classList.add("btn-" + opcion);
    tecla.disabled = true;
}

//función que resetea todo
function resetJuego(){
    let teclas = document.querySelectorAll('.btn-teclado');

    teclas.forEach(tecla => {
        tecla.classList.remove("btn-success");
        tecla.classList.remove("btn-error");
        tecla.disabled = false;
    });

    mensaje.classList.remove('show-mensaje');
    mensaje.classList.remove('color-win');
    mensaje.classList.remove('color-fail');
    mensaje.innerText = ""

    con9vidas.classList.remove('hidden');
    con8vidas.classList.add('hidden');
    con7vidas.classList.add('hidden');
    con6vidas.classList.add('hidden');
    con5vidas.classList.add('hidden');
    con4vidas.classList.add('hidden');
    con3vidas.classList.add('hidden');
    con2vidas.classList.add('hidden');
    con1vida.classList.add('hidden');
    con0vidas.classList.add('hidden');
    //pincel.clearRect(0, 0, dibujo.width, dibujo.height);
    
}