// =====================================
// MALLA INTERACTIVA QYF UTALCA
// Prerrequisitos (sin créditos)
// =====================================

// ----- DATOS -----
const ramos = [
  { id: "QF101", nombre: "Introducción a la Química y Farmacia", prereq: [] },
  { id: "QF102", nombre: "Introducción a la Química", prereq: [] },
  { id: "MAT101", nombre: "Matemáticas Básicas", prereq: [] },
  { id: "BIO101", nombre: "Biología General", prereq: [] },
  { id: "FIT101", nombre: "Formación Inicial Transversal", prereq: [] },

  { id: "FIS101", nombre: "Fundamentos de la Física I", prereq: ["MAT101"] },
  { id: "QF103", nombre: "Química General I", prereq: ["QF102"] },
  { id: "BIO102", nombre: "Biología Celular I", prereq: ["BIO101"] },
  { id: "MAT102", nombre: "Matemáticas I", prereq: ["MAT101"] },
  { id: "SAL101", nombre: "Salud Pública", prereq: ["QF101"] },

  { id: "FIS102", nombre: "Fundamentos de la Física II", prereq: ["FIS101"] },
  { id: "QF104", nombre: "Química General II", prereq: ["QF103"] },
  { id: "MAT103", nombre: "Matemáticas II", prereq: ["MAT102"] },
  { id: "BIO103", nombre: "Biología Celular II", prereq: ["BIO102"] },
  { id: "FCC101", nombre: "Formación Cultural y Ciudadana", prereq: ["FIT101"] },

  { id: "QF201", nombre: "Química Orgánica", prereq: ["QF104"] },
  { id: "QF202", nombre: "Química Analítica", prereq: ["QF104"] },
  { id: "MAT201", nombre: "Bioestadística", prereq: ["MAT103"] },
  { id: "BIO201", nombre: "Morfofisiología", prereq: ["BIO103"] },
  { id: "LEX101", nombre: "Lengua Extranjera Principiante", prereq: [] },

  { id: "QF301", nombre: "Química Orgánica Avanzada", prereq: ["QF201"] },
  { id: "QF302", nombre: "Análisis Instrumental", prereq: ["QF202"] },
  { id: "QF303", nombre: "Fisicoquímica para Farmacia", prereq: ["QF201"] },
  { id: "QF304", nombre: "Bioquímica", prereq: ["QF201"] },
  { id: "LEX102", nombre: "Lengua Extranjera II", prereq: ["LEX101"] }
];

// ----- ESTADO -----
const estado = {}; // true = aprobado

const contenedor = document.getElementById("malla");

// ----- FUNCIONES -----
function cumplePrerequisitos(ramo) {
  return ramo.prereq.every(id => estado[id]);
}

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.classList.add("ramo");

  if (estado[ramo.id]) {
    div.classList.add("aprobado");
  } else if (cumplePrerequisitos(ramo)) {
    div.classList.add("disponible");
  } else {
    div.classList.add("bloqueado");
  }

  div.innerHTML = `
    <h3>${ramo.nombre}</h3>
    ${
      ramo.prereq.length > 0
        ? `<p class="prereq">Req: ${ramo.prereq.join(", ")}</p>`
        : `<p class="prereq libre">Ingreso</p>`
    }
  `;

  div.addEventListener("click", () => {
    if (estado[ramo.id]) {
      estado[ramo.id] = false;
    } else if (cumplePrerequisitos(ramo)) {
      estado[ramo.id] = true;
    }
    render();
  });

  return div;
}

function render() {
  contenedor.innerHTML = "";
  ramos.forEach(ramo => {
    contenedor.appendChild(crearRamo(ramo));
  });
}

// ----- INIT -----
render();
