function brainLuck(code, input){
  return Machine.run(code, input);
}

var Machine = (function(my) {
  var data, dataPointer, instructionPointer, instructions, input, output, rightBraces, leftBraces
  
  function initialize(code, myInput){
    data = Array.apply(null, new Array(300)).map(Number.prototype.valueOf, 0);
    dataPointer = 150;
    instructionPointer = 0;
    output = '';
    rightBraces = [];
    leftBraces = [];
    instructions = code.split('');
    input = myInput.split('').map(
      function(a){
        return a.charCodeAt(0);
      });
      
    parseBraces();
  }
  
  my.run = function(code, myInput) {
    initialize(code, myInput);
    while (instructionPointer < instructions.length && instructionPointer >= 0){
      interpreter();  
    }
    return output;
  }
  
  function parseBraces(){
    var tempLeft = [];
    for (var i = 0; i < instructions.length; i++){
      if (instructions[i] == '['){
        tempLeft.push(i);
      } else if (instructions[i] == ']'){
        rightBraces.push(i);
        leftBraces.push(tempLeft.pop());
      }
    }
  }
  
  function interpreter(){
    switch (instructions[instructionPointer]){
      case '>':
        dataPointer++;
        break;
      case '<':
        dataPointer--;
        break;
      case '+':
        data[dataPointer] = (data[dataPointer] + 1) % 256;
        break;
      case '-':
        data[dataPointer] = (data[dataPointer] - 1) % 256;
        break;
      case '.':
        output += String.fromCharCode(data[dataPointer]);
        break;
      case ',':
        data[dataPointer] = input.shift();
        break;
      case '[':
        if (data[dataPointer] === 0){
          instructionPointer = rightBraces[leftBraces.indexOf(instructionPointer)] + 1;
          return void 0;
        }
        break;
      case ']':
        if (data[dataPointer] !== 0){
          instructionPointer = leftBraces[rightBraces.indexOf(instructionPointer)] + 1;
          return void 0;
        }
        break;
    }
    instructionPointer++;
    return void 0;
  }
  
  return my;
})(Machine || {});
