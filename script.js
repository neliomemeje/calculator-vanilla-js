class Calculator {
  constructor() {
    this.values = "";
    this.firstValues = "";
    this.secondValues = "";
    this.index = 0;
    this.operator = undefined;
    this.op = ["*", "/", "+", "-"]; 
    this.matchOperator = undefined;
    this.computation = null;
    this.methods = {
        "" : () => null, 
        "*": (a,b) => a * b,
        "/": (a,b) => a / b,
        "+": (a,b) => a + b,
        "-": (a,b) => a - b
    }
  }
  reset() {
    this.values = "";
    this.firstValues = "";
    this.computation = null;
    this.matchOperator = undefined;
    this.index= 0;
    this.operator= undefined;
    this.secondValues= "";
  }
  continue() {
    this.values = this.computation;
    this.firstValues = this.computation;
    this.computation = null;
    this.matchOperator = undefined;
    this.index= 0;
    this.operator= undefined;
    this.secondValues= "";
  }
  append(value) {
    if(this.computation) {
      if(this.op.includes(value)) {
         this.continue()
      } else {
        this.reset()      
      }  
    } 
    if(/[*/+]/.test(value) && this.values.length < 1) return;
    if(value === "." && this.values.length < 1) {
      this.values += "0" + value;
      display.innerText = this.values;
    } else {
      this.values += value;

     if(this.values.indexOf("-") === 0) {
       this.matchOperator = this.values.slice(1).match(/[\*\/\+\-]/) || [];
       this.operator = this.matchOperator[0];
       this.index = this.matchOperator.index;
       
       this.firstValues = this.values.slice(0, this.index + 1);
       this.secondValues = this.index === undefined ? "" : this.values.slice(this.index + 2);
       
     } else {
        this.matchOperator = this.values.match(/[\*\/\+\-]/) || [];
        this.operator = this.matchOperator[0];
        this.index = this.matchOperator.index;
       
        this.firstValues = this.values.slice(0, this.index);
        this.secondValues = this.index === undefined ? "" : this.values.slice(this.index + 1);      
     }

      if(this.countRepeatedValue(this.firstValues).countDashes > 1 || this.countRepeatedValue(this.firstValues).countPoint > 1){
      this.values = this.firstValues.slice(0, -1);
    
     } 

      if(this.countRepeatedValue(this.secondValues).countDashes > 1 || this.countRepeatedValue(this.secondValues).countPoint > 1){
      this.values = this.values.slice(0, -1);
     } 

     if(this.op.includes(this.secondValues.at(-1)) && this.secondValues.indexOf(this.secondValues.at(-1)) > 0){
      this.values = this.values.slice(0, -1);
      this.secondValues = this.secondValues.slice(0, -1);
     } else if(this.secondValues && this.op.includes(this.secondValues.at(-1)) && !this.firstValues.includes("-")){    
        if(this.operator === value && value === "-") {
          this.values = this.values;
        } else {
          this.values = this.values.slice(0, this.index).concat(value);
        }
      
     } else if(this.secondValues && this.op.includes(this.secondValues.at(-1)) && this.firstValues.includes("-")) {
       if(this.operator === value && value === "-") {
          this.values = this.values;
        } else {
          this.values = this.values.slice(0, this.index + 1).concat(value);  
        }
     }

     if(this.firstValues.length === 1 && isNaN(this.values[1]) && this.firstValues[0] === "-") {
      this.values = this.values.slice(0, -1);
     }
     display.innerText = this.values;  
     } 
  }
  remove() {
    if(this.computation) {
      return;
    } else {
      this.values = this.values.slice(0, -1);
      display.innerText = this.values;
    } 
  }
countRepeatedValue(inputs) {
    let pointPos = 0;
    let dashPos = 0
    let countPoint = 0;
    let countDashes = 0;
   
    while(true) {
      let point = inputs.indexOf(".", pointPos);
      if(point === -1) break;
      countPoint += 1;
      pointPos = point + 1;  
    }
    while(true) {
      let dash = inputs.indexOf("-", dashPos);
      if(dash === -1) break;
      countDashes += 1;
      dashPos = dash + 1;  
    }
    return {countPoint, countDashes}
  }
  compute(){
    if(this.firstValues && this.secondValues) {
      this.computation = this.methods[this.operator](+this.firstValues,+this.secondValues);

      display.innerText = this.computation.toLocaleString();
   } else {
    display.innerText = "Error Input!";
   }   
  }
  clear() {
    this.values = "";
    this.firstValues = "";
    this.secondValues = "";
    this.operator = undefined;
    this.computation = null;
    display.innerText = this.values;
  }
}

let calc = new Calculator();

let compute = document.getElementById("equals")
let display = document.getElementById("display")
let delBtn = document.getElementById("delete")
let clearBtn = document.getElementById("clear")
let btns = Array.from(document.getElementsByClassName("btn"));

btns.forEach(btn => {
  btn.addEventListener("click", () => {    
    calc.append(btn.innerText);
  })
})

compute.addEventListener("click", () => {
  calc.compute();
})

delBtn.addEventListener("click", () => {
  calc.remove();
})

clearBtn.addEventListener("click", () => {
  calc.clear();
})







