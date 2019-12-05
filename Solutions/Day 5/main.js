const programOps = {
  "01": { args: 3, inputs: 2 },
  "02": { args: 3, inputs: 2 },
  "03": { args: 1, inputs: 1 },
  "04": { args: 1, inputs: 1 },
  "05": { args: 2, inputs: 2 },
  "06": { args: 2, inputs: 2 },
  "07": { args: 3, inputs: 2 },
  "08": { args: 3, inputs: 2 },
  "99": { args: 0, inputs: 0 }
};

let opcodes = [3,225,1,225,6,6,1100,1,238,225,104,0,1101,11,91,225,1002,121,77,224,101,-6314,224,224,4,224,1002,223,8,223,1001,224,3,224,1,223,224,223,1102,74,62,225,1102,82,7,224,1001,224,-574,224,4,224,102,8,223,223,1001,224,3,224,1,224,223,223,1101,28,67,225,1102,42,15,225,2,196,96,224,101,-4446,224,224,4,224,102,8,223,223,101,6,224,224,1,223,224,223,1101,86,57,225,1,148,69,224,1001,224,-77,224,4,224,102,8,223,223,1001,224,2,224,1,223,224,223,1101,82,83,225,101,87,14,224,1001,224,-178,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,1101,38,35,225,102,31,65,224,1001,224,-868,224,4,224,1002,223,8,223,1001,224,5,224,1,223,224,223,1101,57,27,224,1001,224,-84,224,4,224,102,8,223,223,1001,224,7,224,1,223,224,223,1101,61,78,225,1001,40,27,224,101,-89,224,224,4,224,1002,223,8,223,1001,224,1,224,1,224,223,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1008,677,226,224,1002,223,2,223,1006,224,329,101,1,223,223,8,226,677,224,102,2,223,223,1005,224,344,101,1,223,223,1107,226,677,224,102,2,223,223,1006,224,359,101,1,223,223,1007,226,226,224,102,2,223,223,1006,224,374,101,1,223,223,7,677,677,224,102,2,223,223,1005,224,389,1001,223,1,223,108,677,677,224,1002,223,2,223,1005,224,404,101,1,223,223,1008,226,226,224,102,2,223,223,1005,224,419,1001,223,1,223,1107,677,226,224,102,2,223,223,1005,224,434,1001,223,1,223,1108,677,677,224,102,2,223,223,1006,224,449,1001,223,1,223,7,226,677,224,102,2,223,223,1005,224,464,101,1,223,223,1008,677,677,224,102,2,223,223,1005,224,479,101,1,223,223,1007,226,677,224,1002,223,2,223,1006,224,494,101,1,223,223,8,677,226,224,1002,223,2,223,1005,224,509,101,1,223,223,1007,677,677,224,1002,223,2,223,1006,224,524,101,1,223,223,107,226,226,224,102,2,223,223,1006,224,539,101,1,223,223,107,226,677,224,102,2,223,223,1005,224,554,1001,223,1,223,7,677,226,224,102,2,223,223,1006,224,569,1001,223,1,223,107,677,677,224,1002,223,2,223,1005,224,584,101,1,223,223,1107,677,677,224,102,2,223,223,1005,224,599,101,1,223,223,1108,226,677,224,102,2,223,223,1006,224,614,101,1,223,223,8,226,226,224,102,2,223,223,1006,224,629,101,1,223,223,108,226,677,224,102,2,223,223,1005,224,644,1001,223,1,223,108,226,226,224,102,2,223,223,1005,224,659,101,1,223,223,1108,677,226,224,102,2,223,223,1006,224,674,1001,223,1,223,4,223,99,226]

function runIntcode() {
  let isRunning = true;
  let currentIndex = 0;
  
  while(isRunning) {
    let newOp = (opcodes[currentIndex] + "").padStart(4, 0).split("");
    let opcode = newOp.splice(-2).join('');
    let modePositions = newOp.reverse();
    let inputs = [];

    if (programOps[opcode]) {
      for(let i = 0; i < programOps[opcode].inputs; i++ ) {
        const inputIndex = currentIndex + i + 1;
        if (modePositions[i] == 0) {
          inputs.push(opcodes[opcodes[inputIndex]]);
        } else if (modePositions[i] == 1) {
          inputs.push(opcodes[inputIndex]);
        }
      }
    }

    const output = opcodes[currentIndex + 3];
    let didJump = false;

    if (opcode == 01) {
      if (inputs.length) opcodes[output] = inputs.reduce((accumulator, currentVal) => accumulator + currentVal);
    } else if (opcode == 02) {
      if (inputs.length) opcodes[output] = inputs.reduce((accumulator, currentVal) => accumulator * currentVal);
    } else if (opcode == 03) {
      opcodes[opcodes[currentIndex + 1]] = 5; // make input LOL
    } else if (opcode == 04) {
      console.log(inputs[0])
    } else if (opcode == 05 && inputs[0] != 0) {
      currentIndex = inputs[1];
      didJump = true;
    } else if (opcode == 06 && inputs[0] == 0) {
      currentIndex = inputs[1];
      didJump = true;
    } else if ( opcode == 07) {
      opcodes[output] = (inputs[0] < inputs[1]) ? 1 : 0;
    } else if ( opcode == 08) {
      opcodes[output] = (inputs[0] == inputs[1]) ? 1 : 0;
    } else if (opcode == 99) {
      isRunning = false;
    }

    if (!didJump) {
      let skip = programOps[opcode] ? programOps[opcode].args + 1 : 1;
      currentIndex += skip;
    }
  }
}

runIntcode();
