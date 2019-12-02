import {readFileStr} from 'https://deno.land/std/fs/read_file_str.ts';

const runProgram = source => {
  let numbers = source.map(n => n);
  let ptr = 0;
  while (ptr < numbers.length) {
    const op = numbers[ptr];
    const resultLoc = numbers[ptr + 3];
    const opL = numbers[numbers[ptr + 1]];
    const opR = numbers[numbers[ptr + 2]];
    switch (op) {
      case 1:
        numbers[resultLoc] = opL + opR;
        ptr += 4;
        break;
      case 2:
        numbers[resultLoc] = opL * opR;
        ptr += 4;
        break;
      case 99:
        ptr = numbers.length + 1;
        break;
      default:
        console.log('unknown opcode:', op);
    }
  }
  return numbers;
};

const brute = numbers => {
  const max = 100;
  let noun = 0;
  let verb = 0;
  while (noun < max) {
    numbers[1] = noun;
    while (verb < max) {
      numbers[2] = verb;
      const out = runProgram(numbers);
      const ans = out[0]
      if (ans == 19690720) return {noun, verb};
      verb++;
    }
    verb = 0;
    noun++;
  }
  return null;
};

readFileStr("2.txt").then(file => {
  const numbers = file.split(",").map(Number);
  // fix
  numbers[1] = 12;
  numbers[2] = 2;
  console.log(runProgram(numbers)[0]);
  const ans = brute(numbers);
  if (ans !== null) {
    console.log(100 * ans.noun + ans.verb);
  } else console.log('L');
});
