// SELETORES:
const valor1 = document.getElementById('valor1');
const valor2 = document.getElementById('valor2');

const calcular = document.getElementById('calcular');

const operacao = document.getElementsByTagName('option');

const resultado = document.getElementById('resultado');


calcular.onclick=realizarCalculo;

// CALCULADORA:
// Conversao String para Número:
function converter(numero){
    const conversao = Number(numero);
    return conversao;
}

// Operações matemáticas:
function somar(v1, v2){
    let a = converter(v1);
    let b = converter(v2);
    resultado.innerHTML = `Resultado: ${a + b}`;
}
function subtrair(v1, v2){
    let a = converter(v1);
    let b = converter(v2);
    resultado.innerHTML = `Resultado: ${a - b}`;
}
function multiplicar(v1, v2){
    let a = converter(v1);
    let b = converter(v2);
    resultado.innerHTML = `Resultado: ${a * b}`;
}
function dividir(v1, v2){
    if(v2 === '0'){
        resultado.innerHTML = 'Erro! Divisão por zero! <br> Digite um novo "valor número 2" sem ser zero.';
        sumirResultado();
    }
    else {
        let a = converter(v1);
        let b = converter(v2);
        resultado.innerHTML = `Resultado: ${a / b}`;
    }
}


function sumirResultado(){
    setTimeout(()=>{
            resultado.innerHTML='';
        },5000);
}

// Reallizar Cálculo:
function realizarCalculo(){
    // Inputs vazios:
    if(valor1.value.length === 0
    || valor2.value.length === 0){
        resultado.innerHTML='Nenhum dos campos de entrada deve estar vazio.';
        sumirResultado();
    }
    else if(operacao[0].selected){
        resultado.innerHTML='Escolha uma operação.';
        sumirResultado();
    }
    
    // Realizar Operações:
    else if(operacao[1].selected){
        somar(valor1.value, valor2.value);
    }
    else if(operacao[2].selected){
        subtrair(valor1.value, valor2.value);
    }
    else if(operacao[3].selected){
        multiplicar(valor1.value, valor2.value);
    }
    else if(operacao[4].selected){
        dividir(valor1.value, valor2.value);
    }
}

