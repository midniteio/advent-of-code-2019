let total = 0;

require('fs')
  .readFileSync('inputs.txt', 'utf-8')
  .split(/\r?\n/)
  .forEach(function(mass){
    total += calcFuel(mass);
  });

function calcFuel(mass) {
  let fuelReq = Math.floor(mass / 3) - 2;
  return (fuelReq >= 0) ? fuelReq + calcFuel(fuelReq) : 0;
}

console.log(total);