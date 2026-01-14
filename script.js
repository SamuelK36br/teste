import api from './api.js';

const body = document.querySelector("body");

const loading = {
  div: document.querySelector("#loading"),
  span: document.querySelector("#loading span"),
  audio: document.querySelector("#loading audio"),
  output: document.querySelector("#loading output")
}

const main = document.querySelector("#main");

// Botão de dar reload na página:
const reload_button = document.querySelector("#reload");
reload_button.onclick = () => {
  const a = reload_button.animate(sairGirar.keyframes, sairGirar.tempo);
  
  a.finished.then(() => {
    reload_button.style.display = 'none';
    window.location.reload();
  })
  
  loading.audio.play();
  
  reload_button.disabled = true;
  
  loading.audio.onended = () => {
    reload_button.disabled = false;
  }
}

// Aviso de página nãoo carregada: (5s)
const loadingWarn = setTimeout(() => {
  loading.output.classList.remove("hidden");
  console.error("Página não carregada");
}, 5000);

// API de body background-color random:
api("https://x-colors.yurace.pro/api/random").then(({hex: cor}) => {
  clearTimeout(loadingWarn);
  
  body.style.backgroundColor = cor;
  
  loading.span.classList.remove("ponto-loading-span")
  loading.span.style.color = 'green';
  loading.span.innerHTML = "Página carregada!";
  
  setTimeout(() => {
    loading.div.classList.add("fadeout");
    loading.div.onanimationend = () => {
      body.removeChild(loading.div);
      main.classList.remove("hidden");
    }
  }, 1000)
})

// Animações:
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
  },
  popup: {
    in: {
      keyframes: [
        { opacity: 0, transform: "scale(1)" },
        { opacity: 1, transform: "scale(1.2)" },
        {transform: "scale(1)"}
      ],
      tempo: {
        duration: 500,
        easing: "ease-in",
        iterations: 1,
        fill: "forwards",
        direction: "normal"
      }
    },
    out: {
      keyframes: [
        { transform: "scale(1)"},
        {transform: "scale(1.2)"},
        { opacity: 0, transform: "scale(0.5)" }
      ],
      tempo: {
        duration: 500,
        easing: "ease-in",
        iterations: 1,
        fill: "forwards",
        direction: "normal",
        delay: 5000
      }
    }
  }
}
const { girar, rodar, space, cores, sair, sairGirar, fogos, popup } = ANIMATION;

// Paragrafo dentro main:
const p = document.querySelector("#main p");

const animacaoP = p.animate(cores.keyframes, cores.tempo);

// Fogos de artificio:
const fogosBtn = document.querySelector("#main #fogos");
fogosBtn.onclick = fogosAnim;

const fotosImgELMT = document.querySelectorAll(".fogos img");

const fogos_AUDIO_ELEMENT = document.querySelector("#fogosMP3");

/* opacity=0 para todas img firework: */
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

// Popup:
const popup_button = document.querySelector("#popup_button");

function criarPopup() {
  popup_button.disabled = true;
  
  /* Criação do div popup: */
  const pup = document.createElement("div");
  
  /* Classe popup e texto da popup: */
  pup.classList.add("popup")
  pup.innerText =
  "Lorem ipsum dolor sit amet!";
  
  /* Fadein & fadeout animation: */
  const popupFadein = pup.animate(popup.in.keyframes, popup.in.tempo);
  
  popupFadein.finished.then(() => {
    const popupFadeout = pup.animate(popup.out.keyframes, popup.out.tempo);
    
    popupFadeout.finished.then(() => {
      popup_button.disabled = false;
    })
  });
  
  
  /* Anexação de popup à pagina: */
  main.appendChild(pup);
}

popup_button.onclick = criarPopup;