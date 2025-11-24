// =====================================================
// ===============  CALCULADORA (LEGACY v2)  ===========
// =====================================================

let buffer = "0";
let memoria = 0;
let ultimoOperador = null;
let historial = [];

const MAX_HISTORY_ITEMS = 5;

// ------------------------
// Manejo de números
// ------------------------
function handleNumber(numStr) {
  buffer = buffer === "0" ? numStr : buffer + numStr;
  updateScreen();
}

// ------------------------
// Manejo de operadores
// ------------------------
function handleMath(symbol) {
  if (buffer === "0" && memoria === 0) return;

  const intBuffer = parseInt(buffer, 10);

  if (memoria === 0) {
    memoria = intBuffer;
  } else {
    flushOperationAndLog(intBuffer);
  }

  ultimoOperador = symbol;
  buffer = "0";
}

// ------------------------
// Ejecutar operación + historial
// ------------------------
function flushOperationAndLog(intBuffer) {
  const operacionPrevia = ultimoOperador;
  const memoriaPrevia = memoria;

  switch (ultimoOperador) {
    case "+":
      memoria += intBuffer;
      break;
    case "-":
      memoria -= intBuffer;
      break;
    case "*":
      memoria *= intBuffer;
      break;
    case "/":
      memoria /= intBuffer;
      break;
    default:
      return;
  }

  const logEntry = `${memoriaPrevia} ${operacionPrevia} ${intBuffer} = ${memoria}`;
  logHistory(logEntry);
}

// ------------------------
// Historial
// ------------------------
function logHistory(logEntry) {
  historial.push(logEntry);

  if (historial.length > MAX_HISTORY_ITEMS) {
    historial.shift();
  }

  console.log(historial);
}

// ------------------------
// Actualización UI
// ------------------------
function updateScreen() {
  const displayElement = document.getElementById("display");

  if (displayElement !== null) {
    displayElement.innerText = buffer;
  }
}

// ------------------------
// Inicialización de calculadora
// ------------------------
function initCalculator() {
  const calculatorButtons = document.querySelector(".buttons");

  if (calculatorButtons !== null) {
    calculatorButtons.addEventListener("click", event => {
      buttonClick(event.target.innerText);
    });
  }
}

function buttonClick(value) {
  if (isNaN(parseInt(value, 10))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
}

// Placeholder: función faltante del original
// (Se respeta para mantener compatibilidad)
function handleSymbol(symbol) {
  // En el proyecto original esta función existe en otro archivo
  console.warn("handleSymbol() no implementada en este fragmento.");
}

// =====================================================
// ===============        TO-DO LIST        =============
// =====================================================

let todoList = [];
let userName = "Default User";

// ------------------------
// Agregar tarea
// ------------------------
function agregarTarea() {
  const inputElement = document.getElementById("todo-input");
  const textoTarea = inputElement.value.trim();

  if (textoTarea === "") {
    alert("Error: La tarea no puede estar vacía.");
    return;
  }

  const esDuplicado = todoList.some(t => t.texto === textoTarea);

  if (esDuplicado) {
    alert("Error: Tarea duplicada.");
    return;
  }

  const nuevaTarea = {
    id: Date.now(),
    texto: textoTarea,
    completada: false,
  };

  todoList.push(nuevaTarea);
  inputElement.value = "";
  dibujarListaTareas();
}

// ------------------------
// Dibujar tareas
// ------------------------
function dibujarListaTareas() {
  const listaHtml = document.getElementById("todo-list");
  if (listaHtml === null) return;

  listaHtml.innerHTML = "";

  todoList.forEach(tarea => {
    const elemento = document.createElement("li");
    elemento.innerText = tarea.texto;

    if (tarea.completada) {
      elemento.style.textDecoration = "line-through";
    }

    // Listener placeholder (no implementado en el código original)
    elemento.addEventListener("click", () => {
      console.warn("Lógica de borrado no implementada.");
    });

    listaHtml.appendChild(elemento);
  });
}

// ------------------------
// Inicializar To-Do list
// ------------------------
function initTodoList() {
  const botonAgregar = document.getElementById("add-task-btn");

  if (botonAgregar !== null) {
    botonAgregar.addEventListener("click", agregarTarea);
  }

  dibujarListaTareas();
}

// =====================================================
// Inicializar ambos módulos
// =====================================================
initCalculator();
initTodoList();
