console.group("Links:")
console.log("Site: https://samuelk36br.github.io/teste/");
console.log("Github: https://github.com/SamuelK36br/teste");
console.groupEnd()

// >> SELETORES: {
const span = document.querySelector("span");
const p = document.querySelector("p");

const barraLateral = {
  open: document.querySelector(".open-aside"),
  aside: document.querySelector("aside"),
  close: document.querySelector(".close-aside"),
  audio: document.querySelector("audio"),
  animation: {
    open: [
      [
        { left: "-450px" },
        { left: "0" }
      ],
      {
        duration: 500,
        easing: "ease-in",
        iterations: 1,
        fill: "forwards"
        
      }
    ],
    close: [
      [
        { left: "0" },
        { left: "-500px" }
      ],
      {
        duration: 500,
        easing: "ease-out",
        iterations: 1,
        fill: "forwards"
      }
    ]
  }
}
// ↑↑ SELETORES: }

// >> SCRIPT:
// Data e Hora:
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

// Barra lateral:
barraLateral.open.onclick = () => {
  if (barraLateral.aside.classList.contains("hidden")) {
    barraLateral.aside.classList.remove("hidden");
    barraLateral.audio.play();
    barraLateral.aside.animate(barraLateral.animation.open[0], barraLateral.animation.open[1]);
  }
}

barraLateral.close.onclick = () => {
  if (!barraLateral.aside.classList.contains("hidden")) {
    barraLateral.audio.play();
    barraLateral.aside.animate(barraLateral.animation.close[0], barraLateral.animation.close[1])
    .finished.then(() => {
      barraLateral.aside.classList.add("hidden");
    })
  }
}