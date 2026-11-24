// Datos del quiz: pregunta, opciones y respuesta correcta
const preguntas = [
  { texto: "¿Qué edad tengo?", opciones: ["20", "50", "28", "15", "29"], correcta: "28" },
  { texto: "¿Qué clima me gusta?", opciones: ["Frío", "Calor"], correcta: "Frío" },
  { texto: "¿Tengo animales?", opciones: ["Sí", "No"], correcta: "No" },
  { texto: "¿Qué color me gusta?", opciones: ["Verde", "Negro", "Rojo"], correcta: "Negro" },
  { texto: "¿De qué color es mi cabello?", opciones: ["Rubio", "Negro", "Rojo"], correcta: "Negro" },
  { texto: "¿Qué comida prefiero?", opciones: ["Carne", "Ensalada"], correcta: "Carne" },
  { texto: "¿Qué prefiero?", opciones: ["Mar", "Montaña"], correcta: "Montaña" },
  { texto: "¿Qué música me gusta?", opciones: ["Rock", "Salsa", "Hip-hop"], correcta: "Rock" },
  { texto: "¿Me gusta leer?", opciones: ["Sí", "No"], correcta: "Sí" },
  { texto: "¿Qué me gusta más?", opciones: ["El anime", "Los manhwas", "Las novelas"], correcta: "Los manhwas" }
];

let correctas = 0;
let incorrectas = 0;
let actual = 0;
let nombre = "";

const $ = (id) => document.getElementById(id);
const pantallaInicio = $("inicio");
const pantallaJuego = $("juego");
const pantallaFinal = $("final");

function mostrar(pantalla) {
  [pantallaInicio, pantallaJuego, pantallaFinal].forEach((p) => (p.hidden = p !== pantalla));
}

function empezar() {
  nombre = $("nombre").value.trim() || "amigo";
  correctas = 0;
  incorrectas = 0;
  actual = 0;
  mostrar(pantallaJuego);
  mostrarPregunta();
}

function mostrarPregunta() {
  const p = preguntas[actual];
  $("progreso").textContent = `${nombre}, pregunta ${actual + 1} de ${preguntas.length}`;
  $("pregunta").textContent = p.texto;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  $("btn-siguiente").hidden = true;

  const contenedor = $("opciones");
  contenedor.innerHTML = "";
  p.opciones.forEach((op) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opcion";
    b.textContent = op;
    b.addEventListener("click", () => responder(b, op));
    contenedor.appendChild(b);
  });
}

function responder(boton, eleccion) {
  const p = preguntas[actual];
  const acerto = eleccion === p.correcta;

  if (acerto) {
    correctas++;
    boton.classList.add("acierto");
    $("feedback").textContent = "¡Correcto!";
    $("feedback").className = "feedback acierto";
  } else {
    incorrectas++;
    boton.classList.add("error");
    $("feedback").textContent = `Incorrecto. La respuesta era: ${p.correcta}`;
    $("feedback").className = "feedback error";
  }

  document.querySelectorAll(".opcion").forEach((b) => {
    b.disabled = true;
    if (b.textContent === p.correcta) b.classList.add("acierto");
  });

  $("btn-siguiente").textContent = actual === preguntas.length - 1 ? "Ver resultado" : "Siguiente";
  $("btn-siguiente").hidden = false;
  $("btn-siguiente").focus();
}

function siguiente() {
  actual++;
  if (actual < preguntas.length) {
    mostrarPregunta();
  } else {
    terminar();
  }
}

function terminar() {
  $("titulo-final").textContent = `Resultado de ${nombre}`;
  $("correctas").textContent = correctas;
  $("incorrectas").textContent = incorrectas;
  mostrar(pantallaFinal);
}

$("btn-empezar").addEventListener("click", empezar);
$("nombre").addEventListener("keydown", (e) => { if (e.key === "Enter") empezar(); });
$("btn-siguiente").addEventListener("click", siguiente);
$("btn-reiniciar").addEventListener("click", () => { $("nombre").value = ""; mostrar(pantallaInicio); });
