function convertToRoman(num) {
  if (num <= 0 || num > 100000) return "";

  const symbols = [
    ['C̄', 100000],
    ['X̄', 10000],
    ['M', 1000],
    ['D', 500],
    ['C', 100],
    ['L', 50],
    ['X', 10],
    ['V', 5],
    ['I', 1]
  ];

  let result = "";

  for (let [roman, value] of symbols) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }

  // Handle subtractive notation for common numerals
  result = result.replace('DCCCC', 'CM')
                 .replace('CCCC', 'CD')
                 .replace('LXXXX', 'XC')
                 .replace('XXXX', 'XL')
                 .replace('VIIII', 'IX')
                 .replace('IIII', 'IV');

  return result;
}

// Example usage:
console.log(convertToRoman(14));   // XIV
console.log(convertToRoman(798));  // DCCXCVIII
console.log(convertToRoman(100000));// C̄
