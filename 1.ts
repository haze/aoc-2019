import {readFileStr} from 'https://deno.land/std/fs/read_file_str.ts';

const fuelFor = (n: number) => Math.max(Math.floor(n / 3) - 2, 0);

readFileStr('1.txt').then(file => {
  const input = file.split('\n').map(Number);
  const fuels = input.map(fuelFor);
  console.log(fuels.reduce((p, c) => p + c));
});

readFileStr('1.2.txt').then(file => {
  const input = file.split('\n').map(Number);
  const fuelChain = (start) => {
    var s = start;
    const a = [];
    while (s > 0) {
      s = fuelFor(s);
      a.push(s);
    }
    return a;
  };
  const fuels = input.flatMap(fuelChain);
  console.log(fuels.reduce((p, c) => p + c));
});
