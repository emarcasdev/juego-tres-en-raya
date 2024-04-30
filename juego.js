$(document).ready(function () {
  // Mensaje para introducir los nombres 
  let nombreJugadorX = prompt("Ingrese el nombre del Jugador X:");
  let nombreJugadorO = prompt("Ingrese el nombre del Jugador O:");
  // Guardar los nombres introducidos
  $('#nombreJugadorO').val(nombreJugadorO);
  $('#nombreJugadorX').val(nombreJugadorX);
  // Declaramos al jugador principal
  let jugadorActual = 'X';
  // Matriz bidimensional del tablero
  let tablero = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  let juegoNoTerminado = false;
  // Poner ficha tablero por turnos
  $('.celda').click(function() {
    if (!juegoNoTerminado) {
      let indice = $(this).index();
      let fila = Math.floor(indice/3);
      let columna = indice%3;

      if (tablero[fila][columna] === "") {
        $(this).html(`<img src="Multimedia/${jugadorActual}.png" alt="${jugadorActual}">`);
        jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
        tablero[fila][columna] = jugadorActual;
      }
    }

    // Comprobar si existe un ganador.
    let ganador = existeVictoria();
    if (ganador !== null) {
      juegoNoTerminado = true;
      if (jugadorActual === 'O') {
        setTimeout(function() {alert(`¡El jugador ${nombreJugadorX} ha ganado, con las fichas X!`);}, 800);
      } else if (jugadorActual === 'X') {
        setTimeout(function() {alert(`¡El jugador ${nombreJugadorO} ha ganado, con las fichas O!`);}, 800);
      }
    } 

    // Comprobar si hay empate
    let empate = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tablero[i][j] === "") {
          empate = false;
          break;
        }
      }
    }

    if (empate && ganador === null) {
      setTimeout(function() {alert('Esto ha terminado en tablas');}, 800);
      juegoNoTerminado = true;
    }
  
});

  // Metodo para saber si se ha hecho tres en raya
  function existeVictoria() {
    // Comprobar las filas y columnas
    let victoria = false;
      for (let i = 0; i < 3; i++) {
        if (tablero[i][0] !== "" && tablero[i][0] === tablero[i][1] && tablero[i][1] === tablero[i][2]) {
            victoria = true;
            return tablero[i][0]; 
        }
        if (tablero[0][i] !== "" && tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i]) {
            victoria = true;  
            return tablero[0][i]; 
        }
    }

    // Comprobar las diagonales
    if (tablero[0][0] !== "" && tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2]) {
        victoria = true;
        return tablero[0][0]; 
    }
    if (tablero[0][2] !== "" && tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0]) {
        victoria = true;
        return tablero[0][2];
    } 

    // Si no existe un ganador
    if (victoria !== true) {
        return null;
  }
}

  // Boton para jugar otra partida con los mismos jugadores
  $('.boton-juego1').click(function () {
    // Dejar el tablero vacio
    $('.celda').html('').removeClass('');
    tablero = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
    juegoNoTerminado = false;
  });

  // Boton para jugar otra partida con distintos jugadores
  $('.boton-juego2').click(function () {
    // Poner los nombres de los nuevos jugadorers
    let nombreJugadorO = prompt("Ingrese el nuevo nombre del Jugador O:");
    let nombreJugadorX = prompt("Ingrese el nuevo nombre del Jugador X:");
    $('#nombreJugadorX').val(nombreJugadorX);
    $('#nombreJugadorO').val(nombreJugadorO);

    // Dejar el tablero vacio
    $('.celda').html('').removeClass('');
    tablero = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
    juegoNoTerminado = false;
  });

});

