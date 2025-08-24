// =============================
// Isla del Código - script.js
// =============================

// Estado de juego
let puntos = 0;
let nivel = 1;
const maxNivel = 5;

// Para evitar sumar puntos múltiples veces por la misma actividad
const completado = {
  actividad0:false,
  d1:false,
  d2:false,
  d3:false,
  d4:false
};

function sumarPuntos(cant, clave){
  if(completado[clave]) return; // ya sumó
  completado[clave] = true;
  puntos += cant;
  actualizarHUD();
}

function actualizarHUD(){
  document.getElementById("puntos").textContent = puntos;
  // Nivel cada 20 pts por ejemplo
  const nuevoNivel = Math.min(maxNivel, Math.floor(puntos/20)+1);
  if(nuevoNivel !== nivel){
    nivel = nuevoNivel;
    document.getElementById("nivel").textContent = nivel;
  }
  // Barra progreso: % hacia próximo nivel
  const ptsEnNivel = puntos % 20;
  const pct = Math.min(100,(ptsEnNivel/20)*100);
  document.getElementById("nivel-progress-bar").style.width = pct + "%";
}

function marcarBloque(id, correcto){
  const bloque = document.getElementById(id);
  bloque.classList.remove("correct","incorrect");
  bloque.classList.add(correcto?"correct":"incorrect");
}

// -----------------------------
// Actividad 0 - Fill in blanks
// -----------------------------
function verificarActividad0(){
  const fb1 = document.getElementById("fb1").value;
  const fb2 = document.getElementById("fb2").value;
  const fb3 = document.getElementById("fb3").value;
  const feedback = document.getElementById("feedback0");

  const ok = (fb1 === "if" && fb2 === "puntaje > 10" && fb3 === "else");
  if(ok){
    feedback.textContent = "✅ ¡Correcto! Esa es la estructura básica de un condicional if/else.";
    feedback.className = "feedback ok";
    marcarBloque("actividad0",true);
    sumarPuntos(5,"actividad0");
  }else{
    feedback.textContent = "❌ Revisá las selecciones: recordá usar if (condición) { ... } else { ... }";
    feedback.className = "feedback err";
    marcarBloque("actividad0",false);
  }
}


// -----------------------------
// Utilidad para ejecutar código alumno en sandbox local
// -----------------------------
function ejecutarCodigoAlumno(codigo, salidaArr){
  // interceptar console.log
  let console = { log: (msg) => salidaArr.push(String(msg)) };
  // evaluamos en IIFE para limitar alcance
  eval(`(function(){${codigo}})()`);
}

// -----------------------------
// Desafío 1
// -----------------------------
function verificarDesafio1(){
  const codigo = document.getElementById("codigo1").value;
  const salida = [];
  const resultado = document.getElementById("resultado1");
  resultado.textContent = "";
  try{
    ejecutarCodigoAlumno(codigo, salida);
    // heurísticas mínimas: usa prompt e if
    if(codigo.includes("prompt") && codigo.includes("if")){
      sumarPuntos(10,"d1");
      marcarBloque("desafio1",true);
    }else{
      marcarBloque("desafio1",false);
    }
    resultado.textContent = salida.join("\n");
  }catch(e){
    resultado.textContent = "⚠️ Error de ejecución: " + e.message;
    marcarBloque("desafio1",false);
  }
}

// -----------------------------
// Desafío 2
// -----------------------------
function verificarDesafio2(){
  const codigo = document.getElementById("codigo2").value;
  const salida = [];
  const resultado = document.getElementById("resultado2");
  resultado.textContent = "";
  try{
    ejecutarCodigoAlumno(codigo, salida);
    if(codigo.includes("%") && codigo.includes("if")){
      sumarPuntos(10,"d2");
      marcarBloque("desafio2",true);
    }else{
      marcarBloque("desafio2",false);
    }
    resultado.textContent = salida.join("\n");
  }catch(e){
    resultado.textContent = "⚠️ Error de ejecución: " + e.message;
    marcarBloque("desafio2",false);
  }
}

// -----------------------------
// Desafío 3
// -----------------------------
function verificarDesafio3(){
  const codigo = document.getElementById("codigo3").value;
  const salida = [];
  const resultado = document.getElementById("resultado3");
  resultado.textContent = "";
  try{
    ejecutarCodigoAlumno(codigo, salida);
    // buscar if / else if / else
    if(/else\s+if/.test(codigo) && codigo.includes("if")){
      sumarPuntos(15,"d3");
      marcarBloque("desafio3",true);
    }else{
      marcarBloque("desafio3",false);
    }
    resultado.textContent = salida.join("\n");
  }catch(e){
    resultado.textContent = "⚠️ Error de ejecución: " + e.message;
    marcarBloque("desafio3",false);
  }
}

// -----------------------------
// Desafío 4
// -----------------------------
function verificarDesafio4(){
  const codigo = document.getElementById("codigo4").value;
  const salida = [];
  const resultado = document.getElementById("resultado4");
  resultado.textContent = "";
  try{
    ejecutarCodigoAlumno(codigo, salida);
    // heurísticas: && y if
    if(codigo.includes("&&") && codigo.includes("if")){
      sumarPuntos(20,"d4");
      marcarBloque("desafio4",true);
    }else{
      marcarBloque("desafio4",false);
    }
    resultado.textContent = salida.join("\n");
  }catch(e){
    resultado.textContent = "⚠️ Error de ejecución: " + e.message;
    marcarBloque("desafio4",false);
  }
}

// Inicializar HUD al cargar
document.addEventListener("DOMContentLoaded", actualizarHUD);
