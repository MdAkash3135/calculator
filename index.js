//select elements
const input_element = document.querySelector('.input')
const ouput_operation_element = document.querySelector('.operation .value')
const ouput_result_element = document.querySelector('.result .value')
//console.log('does the js file called?')
//some variables
const OPERATORS = ['+', '-', '*', '/']
const POWER = "POWER(", FACTORIAL = "FACTORIAL"
let data = {
    operation: [],
    formula: []
}
let ans = 0
//calculator buttons
updateOutputResult(0)

let calculator_buttons = [
    {
        name : "rad",
        symbol : "Rad",
        formula : false,
        type : "key"
    },
    {
        name : "deg",
        symbol : "Deg",
        formula : false,
        type : "key"
    },
    {
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "math_function"
    },
    {
        name : "square",
        symbol : "x²",
        formula : POWER,
        type : "math_function"
    },
    {
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },
    {
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },
    {
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },
    {
        name : "cos",
        symbol : "cos",
        formula : "trigo(Math.cos,",
        type : "trigo_function"
    },{
        name : "sin",
        symbol : "sin",
        formula : "trigo(Math.sin,",
        type : "trigo_function"
    },{
        name : "tan",
        symbol : "tan",
        formula : "trigo(Math.tan,",
        type : "trigo_function"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "e",
        symbol : "e",
        formula : "Math.E",
        type : "number"
    },
    {
        name : "acos",
        symbol : "acos",
        formula : "inv_trigo(Math.acos,",
        type : "trigo_function"
    },{
        name : "asin",
        symbol : "asin",
        formula : "inv_trigo(Math.asin,",
        type : "trigo_function"
    },{
        name : "atan",
        symbol : "atan",
        formula : "inv_trigo(Math.atan,",
        type : "trigo_function"
    },
    {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "factorial",
        symbol : "×!",
        formula : FACTORIAL,
        type : "math_function"
    },{
        name : "exp",
        symbol : "exp",
        formula : "Math.exp",
        type : "math_function"
    },{
        name : "ln",
        symbol : "ln",
        formula : "Math.log",
        type : "math_function"
    },{
        name : "log",
        symbol : "log",
        formula : "Math.log10",
        type : "math_function"
    },{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "power",
        symbol : "x<span>y</span>",
        formula : POWER,
        type : "math_function"
    },{
        name : "ANS",
        symbol : "ANS",
        formula : "ans",
        type : "number"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    }
];

function createCalculatorButtons(){
   // console.log('does this function called?')
    const btns_per_page = 8
    let added_btns = 0;

    calculator_buttons.forEach(  button =>{
        if(added_btns % btns_per_page == 0){
            input_element.innerHTML += `<div class="row"</div>`
        }
        const row = document.querySelector(".row:last-child");
        row.innerHTML += `<button id="${button.name}">
                            ${button.symbol}
                            </button>`
        added_btns++
    })

}
createCalculatorButtons()

let RADIAN = true

const rad_btn = document.getElementById("rad")
const deg_button = document.getElementById("deg")

rad_btn.classList.add('active-angle')


function angleToogler(){
    rad_btn.classList.toggle('active-angle')
    deg_button.classList.toggle('active-angle')
}

input_element.addEventListener("click", event => {
    console.log(event.key)
    const target_button = event.target
   // console.log(target_button)
    calculator_buttons.forEach(  button => {
    if (button.name == target_button.id) calculator(button)
    })

})

function calculator(button){
    if (button.type == "operator")
        {
            data.operation.push(button.symbol)
            data.formula.push(button.formula)
        }
    else  if (button.type == "number")
        {
            
            data.operation.push(button.symbol)
            data.formula.push(button.formula)
        }
    else  if (button.type == "trigo_function")
        {
            
            data.operation.push(button.symbol + "(")
            data.formula.push(button.formula)
    
        }
    else  if (button.type == "math_function")
        {
            let symbol = button.symbol + "("
            let formula = button.formula + "("

            if (button.name == "factorial"){
                symbol = "!"
                formula = button.formula
            }
            else if (button.name == "power"){
                symbol = "^("
                formula = button.formula
            }
            

            data.operation.push(symbol)
            data.formula.push(formula)
        }
    else  if (button.type == "key")
        {
            if (button.name == "clear")
            {
                data.operation = []
                data.formula = []
                updateOutputResult(0)
            }
            else if ( button.name == "delete")
            {
                data.operation.pop()
                data.formula.pop()
                
            }
            else if (button.name == "rad")
            {
                RADIAN = true
                angleToogler()
            }
            else if (button.name == "deg")
                {
                    RADIAN = false
                    angleToogler()
                }

        }
    else  if (button.type == "calculate")
        {
            
            formula_str = data.formula.join('')
            let POWER_SEARCH_RESULT = search(data.formula, POWER)
            let FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL)
            console.log(data.formula, POWER_SEARCH_RESULT, FACTORIAL_SEARCH_RESULT)
            let result;
            try {
                result = eval(formula_str)
            } catch (error)
            {
                if ( error instanceof SyntaxError)
                {
                    result = "Syntax Error!"
                    updateOutputOperation(result)
                    return
                }
            }
            console.log(result)
            ans = result
            data.operation = [result]
            data.formula = [result]
            updateOutputResult(result)
            
        }
 //   console.log(data.operation)
    updateOutputOperation( data.operation.join('') )
}

function updateOutputOperation(operation)
{   

    ouput_operation_element.innerHTML = operation
}
function updateOutputResult(result)
{
    console.log('is the result fucntin called')
    ouput_result_element.innerHTML = result
}

function trigo(callback, angle){
    if(!RADIAN)
    {
        angle = angle * Math.PI/180
    }
    return callback(angle)

}
function inv_trigo(callback, value)
{
    let angle = callback(value)
    if (!RADIAN)
    {
        angle = angle * 180/Math.PI
    }
    return angle
}
function search(array, keyword){
    let search_result = []
    array.forEach( (element, index) => {
        if(element == keyword) search_result.push(index)
    })

    return search_result

}
function factorial(num){
    let res = 1;
    for (let i = 1; i <= num; i++)
    {
        res = res * i
        if (res == Infinity) return Infinity
    }
    return res
}