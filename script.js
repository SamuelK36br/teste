import api from './api.js';

const btn = document.querySelector("#reload");
const bgc = document.querySelector("body");

const loading = {
  div: document.querySelector("#loading"),
  span: document.querySelector("#loading span"),
  audio: document.querySelector("#loading audio"),
  output: document.querySelector("#loading output")
}
const main = document.querySelector("#main");


btn.onclick = () => {
  const a = btn.animate(sairGirar.keyframes, sairGirar.tempo);
  
  a.finished.then(() => {
    btn.style.display = 'none';
    window.location.reload();
  })
  
  loading.audio.play();
  
  btn.disabled = true;
  
  loading.audio.onended = () => {
    btn.disabled = false;
  }
}

const loadingWarn = setTimeout(() => {
  loading.output.classList.remove("hidden");
  console.error("Página não carregada");
}, 5000);

api("https://x-colors.yurace.pro/api/random").then(({hex: cor}) => {
  clearTimeout(loadingWarn);
  
  bgc.style.backgroundColor = cor;
  
  loading.span.classList.remove("ponto-loading-span")
  loading.span.style.color = 'green';
  loading.span.innerHTML = "Página carregada!";
  
  setTimeout(() => {
    loading.div.classList.add("fadeout");
    loading.div.onanimationend = () => {
      bgc.removeChild(loading.div);
      main.classList.remove("hidden");
    }
  }, 1000)
})


const p = document.querySelector("#main p");

const ANIMATION = {
  girar: {
    keyframes: [
      {opacity: 1},
      {opacity: 0.5},
      {opacity: 0.1}
    ],
    tempo: {
      duration: 1000,
      easing: "ease-out",
      iterations: Infinity,
      direction: "alternate",
      delay: 1000
    }
  },
  rodar: {
    keyframes: [
      {transform: "rotate(360deg)"}
    ],
    tempo: {
      duration: 5000,
      easing: "linear",
      iterations: Infinity
    }
  },
  space: {
    keyframes: [
      {letterSpacing: "10px"}
    ],
    tempo: {
      duration: 1000,
      easing: "linear",
      iterations: Infinity,
      direction: "alternate"
    }
  },
  cores: {
    keyframes: [
      {color: "red"},
      {color: "orange"},
      {color: "yellow"},
      {color: "green"},
      {color: "blue"},
      {color: "indigo"},
      {color: "violet"},
      {color: "red"}
    ],
    tempo: {
      duration: 5000,
      easing: "linear",
      iterations: Infinity,
      direction: "normal"
    }
  },
  sair: {
    keyframes: [
      {transform: "translateX(100%)", opacity: 0, visibility: "hidden"}
    ],
    tempo: {
      duration: 500,
      iterations: 1,
    }
  },
  sairGirar: {
    keyframes: [
      {transform: "rotate(360deg)", opacity: 0}
    ],
    tempo: {
      duration: 1000,
      easing: "ease-out",
      iterations: 1,
      fill: "forwards"
    }
  },
  fogos: {
    keyframes: [
      {opacity: 1},
      {opacity: 0}
    ],
    tempo: {
      duration: 1500,
      iterations: 1,
      easing: "ease-in",
      fill: "forwards",
      direction: "normal"
    }
  }
}
const { girar, rodar, space, cores, sair, sairGirar, fogos } = ANIMATION;

p.style.fontSize = "5rem";
const animacaoP = p.animate(cores.keyframes, cores.tempo);

// Fogos de artificio:
const fogosBtn = document.querySelector("#main #fogos");
fogosBtn.onclick = fogosAnim;

const fotosImgELMT = document.querySelectorAll(".fogos img");

const fogos_AUDIO_ELEMENT = document.querySelector("#fogosMP3");

for (let i = 0; i < fotosImgELMT.length; i++) {
  fotosImgELMT[i].style.opacity = 0;
}

function fogos_AUDIO(num) {
  fogos_AUDIO_ELEMENT.src = `fogosMP3/fogos${num}.mp3`;
  fogos_AUDIO_ELEMENT.play();
}

function fogosAnim() {
  fogosBtn.style.display = 'none';
  
  fogos_AUDIO(1);
  const f1 = fotosImgELMT[0].animate(fogos.keyframes, fogos.tempo);
  f1.finished.then(() => {
    fogos_AUDIO(2);
    const f2 = fotosImgELMT[1].animate(fogos.keyframes, fogos.tempo);
    f2.finished.then(() => {
      fogos_AUDIO(3);
      const f3 = fotosImgELMT[2].animate(fogos.keyframes, fogos.tempo);
      f3.finished.then(() => {
        fogos_AUDIO(4);
        const f4 = fotosImgELMT[3].animate(fogos.keyframes, fogos.tempo);
        f4.finished.then(() => {
          fogosBtn.style.display = 'inline-block';
        })
      })
    })
  })
}