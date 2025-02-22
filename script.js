const numbers = document.querySelectorAll(".numbers")
const buttons = document.querySelectorAll("#buttons")
const display = document.querySelector("#display")
const clear = document.querySelector(".clear")
const operators = document.querySelectorAll(".operator")
const dot = document.querySelector(".dot")
const equals = document.querySelector(".equals")
const inverse = document.querySelector(".inverse")
const backspace = document.querySelector(".backspace")

let firstNumber = null
let sign = null
let secondNumber = null
let period = "."

backspace.addEventListener("click",function(){
    if(firstNumber == display.textContent && secondNumber != display.textContent){
        display.textContent = display.textContent.slice(0,-1)
        firstNumber = firstNumber.slice(0,-1)
    }else{
        display.textContent = display.textContent.slice(0,-1)
        secondNumber = secondNumber.slice(0,-1)
    }
})

inverse.addEventListener("click", function() {
    if(firstNumber == display.textContent && secondNumber != display.textContent){
        display.textContent *= -1
        firstNumber *= -1
    }else{
        display.textContent *= -1
        secondNumber *= -1
    }
    } )

dot.addEventListener("click",function (){
    if(!display.textContent.includes(period) && !sign){
        display.textContent += '.'
    }else if(sign && !secondNumber){
        display.textContent = ""
        display.textContent += '.'
        secondNumber = display.textContent
    }else{
        display.textContent += '.'
        secondNumber = display.textContent
    }
})

clear.addEventListener("click", function(){
    firstNumber = null
    sign = null
    secondNumber = null
    display.textContent = '0'
})

equals.addEventListener("click", function(){
    if(firstNumber && secondNumber && sign){
        firstNumber = +(operate(firstNumber,sign,secondNumber)).toFixed(2)
        display.textContent = firstNumber
        secondNumber = ""
    }
})

function operate(firstNumber, sign, secondNumber){
    firstNumber = parseFloat(firstNumber)
    secondNumber = parseFloat(secondNumber)
        switch(sign){
            case '+':
                return firstNumber + secondNumber
            case '-':
                return firstNumber - secondNumber
            case '*':
                return firstNumber * secondNumber
            case '/':
                return firstNumber / secondNumber
            case '%':
                return firstNumber % secondNumber
        }
}

numbers.forEach((number => number.addEventListener("click",function (){
    if(!sign){
        display.textContent = +(display.textContent + number.textContent)
        firstNumber = display.textContent
    }else if(firstNumber && !secondNumber){
        display.textContent = ""
        display.textContent = +(display.textContent + number.textContent)
        secondNumber = display.textContent
    }else{
        display.textContent = +(display.textContent + number.textContent)
        secondNumber = display.textContent
    }
} )))

operators.forEach((operator)=> operator.addEventListener("click",function (){
    if(firstNumber && secondNumber){
        firstNumber = +(operate(firstNumber,sign,secondNumber)).toFixed(2)
        display.textContent = firstNumber
        sign = operator.textContent
        if(sign == '%'){
            firstNumber *= 100
            display.textContent = firstNumber
        }
        secondNumber = ""
    }else if (firstNumber || secondNumber){
        sign = operator.textContent
    }
} ))

// display.addEventListener("keydown", function(event){
//     buttons.forEach((button) => {
//         const numbers = ['1','2','3','4','5','6','7','8','9','0','.']
//         if(event.key == button.textContent && !numbers.some((number)=>number.includes(button.textContent))){
//             if (firstNumber || secondNumber){
//                 sign = event.key
//             }
//         }else if(event.key == button.textContent){
//             if(event.key == '.'){
//                 display.textContent += event.key
//             }
//             display.textContent = +(display.textContent+event.key)
//         }
//     })
// })


 
