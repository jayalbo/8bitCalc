//----------- Adder -----------
const ADDER_BITS = 8;
numberA = 0;
numberB = 0;
isResult = false;
result = '';

//Half Adder
function halfAdder(a, b) {
    return { c: newGame.andGate(a, b) ? 1: 0, s: newGame.xorGate(a, b) ? 1 : 0 }
}
//Full Adder
function fullAdder(a, b, c) {
    half = halfAdder(a, b);
    halfScnd = halfAdder(half.s, c);
    return { c: newGame.orGate(half.c, halfScnd.c) ? 1 : 0, s: halfScnd.s ? 1 : 0}
}
//8-bit Adder
function eightBitAdder(a, b) {
    result = "";
    a = intToBin(a);
    b = intToBin(b);
    firstOperation = halfAdder(parseInt(a[0]), parseInt(b[0]));
    c = firstOperation.c;
    result = firstOperation.s.toString();
    
    for (let i = 1; i < ADDER_BITS; i++) {
        console.log(i);
            let addOperation = fullAdder(parseInt(a[i]),parseInt(b[i]), parseInt(c));
            c = addOperation.c;
            result += addOperation.s.toString();
    }
    return result;

}

//Convert Dec to Bin
function intToBin(a) {
    var binResult = '';
    for (i = 0; i < ADDER_BITS; i++) {
        reminder = a % 2
        a = Math.floor(a / 2)
        binResult += reminder.toString();
    }
    return binResult;
}
//Convert Bin to Dec
function binToInt(a) {
    var decResult = 0;
    for (i = 0; i < ADDER_BITS; i++) {
        decResult += parseInt(a[i]) * Math.pow(2, i);
    }
    return decResult;
}
function operate(){
    if (document.getElementById("operationButton").value == "+"){
        numberA = calculator.display.value;
        calculator.display.value = '';
        document.getElementById("operationButton").value = '=';

    } else {
        numberB = document.getElementById("display").value;
        document.getElementById("operationButton").value = "+"
        document.getElementById("loading").style.display="block";
        calculator.display.value = 'Processing';
        setTimeout(function(){
            let result = eightBitAdder(numberA, numberB);
            calculator.display.value = binToInt(result);
            document.getElementById("loading").style.display="none";
            isResult = true;
        },100);

    }
}
function numberPressed(number){
    if (isResult){
        calculator.display.value = '';
        isResult = false;
    }
        calculator.display.value += number;
}
function getResult() {
    numberA = document.getElementById("firstNum").value;
    numberB = document.getElementById("secondNum").value;

    displayResult = document.getElementById("result");

    document.getElementById("btnCalc").style.display="none"; 
    document.getElementById("loader").style.display="block"; 

    setTimeout(function(){
        let result = eightBitAdder(numberA, numberB);
        displayResult.innerHTML = binToInt(result);
        document.getElementById("btnCalc").style.display="block"; 
        document.getElementById("loader").style.display="none"; 
    },1);
}
