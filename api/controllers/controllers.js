export const obtenerTrivia = function (categoria, dificultad, tipo) {
  let apiURL = `https://opentdb.com/api.php?amount=10`;
  apiURL =
    apiURL + `&category=${categoria}&difficulty=${dificultad}&type=${tipo}`;

  return fetch(apiURL).then((response) => response.json()); // Parsea la respuesta como JSON
};
