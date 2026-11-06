function somar(a, b) {    
return a + b;
}
function subtrair(a, b) { 
return a - b;
}
function multiplicar(a, b) {    
return a * b;
}
function dividir(a, b) {    
if (b === 0) 
throw new Error("Divisão por zero não permitida");    
return a / b;
}

function calcular(operacao) {    
const num1 = parseFloat(document.getElementById("num1").value);                 
const num2 = parseFloat(document.getElementById("num2").value);    
let resultado;        
try {        
switch (operacao) {            
case "soma":                
resultado = somar(num1, num2);                
break;            
case "subtracao":                
resultado = subtrair(num1, num2);                
break;            
case "multiplicacao":                
resultado = multiplicar(num1, num2);                
break;            
case "divisao":                
resultado = dividir(num1, num2);                
break;            
default:                
resultado = "Operação inválida";       
 }             
document.getElementById("resultado").innerText = `Resultado: ${resultado}`;    
}
catch (error) {        
} 
document.getElementById("resultado").innerText = `Erro: ${error.message}`;       
}
module.exports = { somar, subtrair,dividir,multiplicar };