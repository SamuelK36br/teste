// >> SELETORES: {
const span = document.querySelector("span");
const p = document.querySelector("p");

// ↑↑ SELETORES: }

// >> SCRIPT:

setInterval(() => exibir(new Date()));

function exibir(hora) {
  let hr = horaUpdt(hora.getHours());
  let min = horaUpdt(hora.getMinutes());
  let seg = horaUpdt(hora.getSeconds());
  
  span.innerText = `${hr}:${min}:${seg}`;

  let dia = hora.getDate();
  let mes = hora.getMonth() + 1;
  let ano = hora.getFullYear();
  
  p.innerText = `${dia}/${mes}/${ano}`;
}

function horaUpdt(tempo) {
  if (tempo < 10) { return "0" + tempo }
  else { return tempo }
}