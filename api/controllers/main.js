import { obtenerTrivia } from "./controllers.js";

const plantillaPregunta = function (
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
    <input type="radio" name="respuesta${posicion}">
    <label>${respuestaCorrecta}</label> <br>
    <input type="radio" name="respuesta${posicion}">
    <label>${respuestaIncorrecta[0]}</label> <br>
    </div>`;
  } else {
    return `<div class="tarjeta-pregunta">
    <p>${posicion}. ${pregunta}</p>
    <input type="radio" name="respuesta${posicion}">
    <label>${respuestaCorrecta}</label> <br>
    <input type="radio" name="respuesta${posicion}">
    <label>${respuestaIncorrecta[0]}</label> <br>
    <input type="radio" name="respuesta${posicion}">
    <label>${respuestaIncorrecta[1]}</label> <br>
    <input type="radio" name="respuesta${posicion}">
    <label>${respuestaIncorrecta[2]}</label> <br>
    </div>`;
  }
};

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
    console.log("API:", data.results);
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

document.getElementById("verificarRespuestas").addEventListener("click", function () {
  let respuestasCorrectas = 0;
  let respuestasIncorrectas = 0;

  const resultadoPreguntas = document.querySelectorAll(
    "input[type='radio']:checked"
  );
  
  resultadoPreguntas.forEach(function (pregunta) {
    if (pregunta.value === respuestaCorrecta) {
      respuestasCorrectas++;  // Incrementa las respuestas correctas
    } else {
      respuestasIncorrectas++;  // Incrementa las respuestas incorrectas
    }
  });

  alert("Usted tiene " + respuestasCorrectas + " respuestas correctas y " + respuestasIncorrectas + " respuestas incorrectas");
});
