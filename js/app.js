const ini =()=>{
    document.getElementById("fondo").innerHTML=` <div id="1" class="cuadro azul">1</div>
    <div id="2" class="cuadro azul">2</div>
    <div id="3" class="cuadro azul">3</div>
    <div id="4" class="cuadro azul">4</div>
    <div id="5" class="cuadro verde">5</div>
    <div id="6" class="cuadro verde">6</div>
    <div id="7" class="cuadro verde">7</div>
    <div id="8" class="cuadro verde">8</div>
    <div id="9" class="cuadro rojo">9</div>
    <div id="10" class="cuadro rojo">10</div>
    <div id="11" class="cuadro rojo">11</div>
    <div id="12" class="cuadro rojo">12</div>
    <div id="13" class="cuadro amarillo">13</div>
    <div id="14" class="cuadro amarillo">14</div>
    <div id="15" class="cuadro amarillo">15</div>
    <div id="16" class="cuadro negro">16</div>`;

};
ini();
//Creamos las dos matrices una ordenada y la otra que va a desordenarse al iniciar el juego
let quince = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16]
];

let quince_ordenada = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16]
];

//declaramos la fila y columna vacia en este caso será la última posición 
let filaVacia = 3;
let columnaVacia = 3;

//Usamos el evento cuando se pulsa una tecla y capturamos los valores de las flechas
document.body.onkeydown = (function(evento) { 
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
     moverEnDireccion(evento.which);
     let gano = chequearSiGano();
      if(gano){
        setTimeout(function(){
          mostrarCartelGanador();
        },500);
      }
      evento.preventDefault();
    }else{
        return false;
    }
  });


//Creamos una función para mover el div vacio por la inferior, superior, izquierda o derecha
function moverEnDireccion(direccion){

    let nuevaFilaPiezaVacia;
    let nuevaColumnaPiezaVacia;

    if(direccion == 40){
        nuevaFilaPiezaVacia = filaVacia+1;
        nuevaColumnaPiezaVacia = columnaVacia;
        
    }else if(direccion == 38){
        nuevaFilaPiezaVacia = filaVacia-1;
        nuevaColumnaPiezaVacia = columnaVacia;
        
    }else if(direccion == 39){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia+1;
        
    }else if(direccion == 37){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia-1;
        
    }

    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
        intercambiarPosiciones(filaVacia, columnaVacia,
            nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
            actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    }

}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
    if ((fila<=3)&&(fila>=0)&&(columna<=3)&&(columna>=0)) {
      return true;
    }else {
      return false;
    }
  
  }


  function intercambiarPosiciones(filaPos1, columnaPos1, filaPos2, columnaPos2){
    //alert("fila pos1: "+ filaPos1+ " "+ "Fila pos2:  " + filaPos2);
    let numero1 = quince [filaPos1] [columnaPos1];
    let numero2 = quince [filaPos2] [columnaPos2];
    quince [filaPos1] [columnaPos1] = numero2;
    quince [filaPos2] [columnaPos2] = numero1;
 
     let elemDom1 = document.getElementById(numero1);
     let elemDom2 = document.getElementById(numero2);
 
         let clonElem1 = elemDom1.cloneNode();
         clonElem1.innerHTML=clonElem1.id;
         let clonElem2 = elemDom2.cloneNode();
         clonElem2.innerHTML=clonElem2.id;
       let padre = document.getElementById("fondo");
       padre.replaceChild(clonElem2, elemDom1);
       padre.replaceChild(clonElem1, elemDom2);
      
  }
  // Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
    filaVacia=nuevaFila;
    columnaVacia=nuevaColumna;
}
//mezclar las piezas
function mezclarPiezas(veces){
    if(veces<=0){return;}
    var direcciones = [40, 38, 39, 37];
    var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
    moverEnDireccion(direccion);
  
    setTimeout(function(){
     mezclarPiezas(veces-1);
    },10);
  }

function iniciar(){
    mezclarPiezas(180);  
}
iniciar();

// Esta función va a chequear si el Rompecabezas está en la posición ganadora
function chequearSiGano(){
    for (var x = 0 ; x < 4; x ++){
       for ( var y = 0; y < 4 ; y ++){
           esta_ordenada = quince [x] [y] == quince_ordenada [x] [y];
          if (!esta_ordenada) {return false;}
        }
      }
      return true;
    }

    function mostrarCartelGanador(){
        alert("Che ganaste!!!")
      
      }