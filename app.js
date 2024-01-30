let numSecreto = 0;
let intentos = 0;
let numerosSorteados = [];
let numMax = 10;
let numJuegos = 5;

//Función que asigna un texto a un elemento de la página
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento); //esto es un objeto que se le atribuye a una variable
    elementoHTML.innerHTML = texto; //Le atribuimos texto al objeto
    return;
}

function verificarIntento(){
    let numUsuario = parseInt(document.getElementById('valorUsuario').value); //Buscamos el valor del usuario que está en la caja (container)
    /*console.log(typeof(numUsuario));
    console.log(typeof(numSecreto));
    console.log('El número secreto es:', numSecreto);
    console.log('El número del usuario es: ', numUsuario);
    console.log('El usuario acertó el número: ', numUsuario == numSecreto); //Regresa true o false*/
    if(numUsuario === numSecreto)
    {
        //El usuario acertó
        asignarTextoElemento('p', `¡Felicidades! acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`) //Usamos la funcion hecha anteriormente
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else
    {
        //EWl usuario no acertó
        if(numUsuario > numSecreto)
        {
            asignarTextoElemento('p', 'El número secreto es menor');
        }
        else
        {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos ++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = ''; //Si queremos usar query selectos debemos usar el # para saber que se trata de un id
}

function numAleatorio(){
    let numGenerado = Math.floor(Math.random()*numMax)+1;
    console.log('Número secreto: ', numGenerado);
    console.log('numMax: ', numMax);
    console.log('Lista números sorteados: ', numerosSorteados);
    //Si llegamos al número máximo de juegos
    if(numerosSorteados.length == numJuegos)
    {
        asignarTextoElemento('p', 'Llegaste al número máximo de juegos');
    }
    //Si ya sorteamos todos los números
    if(numerosSorteados.length == numMax)
    {
        asignarTextoElemento('p', 'Se han sorteado todos los números posibles. Fin del juego.');
    }
    else
    {
        //Si el número generado está en la lista 
        if(numerosSorteados.includes(numGenerado))
        {//Recursividad
            return numAleatorio();
        }
        else
        { //Si el número no está en la lista
            numerosSorteados.push(numGenerado);
            return numGenerado;
        }
    }

}

function condicionesIniciales(){
    //Mensajes iniciales
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Escribe un número del 1 al ${numMax}`);
    //Generar núm aleatorio
    numSecreto = numAleatorio();
    //Inicializar número intentos
    intentos = 1;
    return;
}

function reiniciarJuego(){
    //Limpiar caja
    limpiarCaja();
    //Regresar a condiciones iniciales
    condicionesIniciales();
    //Desabilitar botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true') //dos parametros desabilitar, true
}

numMax = prompt('Dime el número máximo que deseas acertar');
condicionesIniciales();


