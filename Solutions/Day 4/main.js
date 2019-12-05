let start = 172851, end = 675869;
let count = 0;

function hasRepeated(nums) {

  let previousNum = -1;
  let matchLength = 0;
  let foundMatch = false;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === previousNum ) {
      matchLength++;
    } else if (matchLength == 2){
      foundMatch = true;
    } else {
      matchLength = 1;
    }
    previousNum = nums[i];
  }

  return foundMatch || matchLength == 2
}

for (let i = start; i < end; i++) {
  var digits = (""+i).split("");
  if(hasRepeated(digits)) {
    if (digits[0] <= digits[1]
      && digits[1] <= digits[2]
      && digits[2] <= digits[3]
      && digits[3] <= digits[4]
      && digits[4] <= digits[5] ){
        count++;
    }
  }
}

console.log(count);
