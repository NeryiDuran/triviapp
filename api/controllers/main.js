import { obtenerTrivia } from "./controllers.js";

function plantillaPregunta(
  posicion,
  pregunta,
  tipo,
  respuestaCorrecta,
  respuestaIncorrecta
) {
  posicion++;

  if (tipo === "boolean") {
    return `<div class="tarjeta-pregunta">
    <p>${posicion}. ${pregunta}</p>
    <input type="radio" class="respuesta-correcta" name="respuesta${posicion}" id="respuesta${posicion}-1">
    <label for="respuesta${posicion}-1">${respuestaCorrecta}</label> <br>
    <input type="radio" name="respuesta${posicion}" id="respuesta${posicion}-2">
    <label for="respuesta${posicion}-2">${respuestaIncorrecta[0]}</label> <br>
    </div>`;
  } else {
    return `<div class="tarjeta-pregunta">
    <p>${posicion}. ${pregunta}</p>
    <input type="radio" class="respuesta-correcta" name="respuesta${posicion}" id="respuesta${posicion}-1" required>
    <label for="respuesta${posicion}-1">${respuestaCorrecta}</label> <br>
    <input type="radio" name="respuesta${posicion}" id="respuesta${posicion}-2">
    <label for="respuesta${posicion}-2">${respuestaIncorrecta[0]}</label> <br>
    <input type="radio" name="respuesta${posicion}" id="respuesta${posicion}-3">
    <label for="respuesta${posicion}-3">${respuestaIncorrecta[1]}</label> <br>
    <input type="radio" name="respuesta${posicion}" id="respuesta${posicion}-4">
    <label for="respuesta${posicion}-4">${respuestaIncorrecta[2]}</label> <br>
    </div>`;
  }
}

function enviarFormulario() {
  const categorias = document.getElementById("categorias");
  const categoriaSeleccionada = categorias.value;

  const dificultades = document.getElementById("dificultades");
  const dificultadSeleccionada = dificultades.value;

  const tipos = document.getElementById("tipos");
  const tipoSeleccionada = tipos.value;

  obtenerTrivia(
    categoriaSeleccionada,
    dificultadSeleccionada,
    tipoSeleccionada
  ).then((data) => {
    const formularioPrincipal = document.getElementById("formulario-principal");
    formularioPrincipal.className += " invisible";

    const formularioinicial = document.getElementById("formularioinicial");
    formularioinicial.className = "";
    const formularioPreguntas = document.getElementById("formulario-preguntas");
    const preguntas = data.results;

    preguntas.forEach((pregunta, posicion) => {
      formularioPreguntas.innerHTML += plantillaPregunta(
        posicion,
        pregunta.question,
        pregunta.type,
        pregunta.correct_answer,
        pregunta.incorrect_answers
      );
    });
  });
}

window.enviarFormulario = enviarFormulario;

function enviarTrivia(event) {
  event.preventDefault();
  const totalPreguntas = 10;

  const resultadoPreguntas = document.querySelectorAll(
    "input[type='radio'][class='respuesta-correcta']:checked"
  );

  const totalPreguntasCorrectas = resultadoPreguntas.length;

  alert(
    "Usted tiene " +
      totalPreguntasCorrectas +
      " respuestas correctas y " +
      (totalPreguntas - totalPreguntasCorrectas) +
      " respuestas incorrectas"
  );

  window.location.href = "/index.html";
}

window.enviarTrivia = enviarTrivia;
