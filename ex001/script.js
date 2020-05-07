const resultado = document.getElementById('resultado');
const input = document.getElementById('binary');

// Função responsável por capturar e converter o valor binário em decimal.
function convertBinaryToDecimal() {
    const valorStr = document.getElementById('binary').value;
    var arrayValor = valorStr.split('');
    // Percorrendo e atualizando array para numérico.
    arrayValor = arrayValor.map(value => { return parseInt(value) });
    
    var acumDec = 0;
    var exp = valorStr.length - 1; // expoente
    for(var i = 0; i < valorStr.length; i++) {
        acumDec += (arrayValor[i] * Math.pow(2, exp));
        exp--;
        //console.log(`${arrayValor[i]} * (2 ^ ${exp}) = ${acumDec}`); // teste
    }
    // Exibindo no elemento do HTML o resultado da conversão.
    resultado.innerText = acumDec;
}

// Função valida se o usuário está informando apenas 0 ou 1 a partir dos seus respectivos códigos na tabela ASCii.
function validarTecla(event) {
    if(event.keyCode != 96 && event.keyCode != 97) {
        event.preventDefault();
        var caractere = event.key; // retorna o caractere digitado.
        alert(`O caractere "${caractere}" não é inválido, informe apenas 0 ou 1!`);
    }
}