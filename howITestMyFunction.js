const cells = [
  { "id": "A1", "value": 2},
  { "id": "A2", "value": 3},
  { "id": "A3", "value": 4},
  { "id": "A4", "value": 5},
  { "id": "A5", "value": 6},
  { "id": "B1", "value": 7},
  { "id": "B2", "value": 8},
];

const idToText = id => cells.find(cell => cell.id === id).value;
// console.log(idToText("A3"));
const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
const str = "sum(A1:B2)";
// console.log(str.match(rangeRegex));
const range = (start, end) => Array(end-start + 1)
  .fill(start).map((num, index) => num + index);
// console.log(range(1,5));
const charRange = (start, end) => 
  range(start.charCodeAt(0), end.charCodeAt(0))
  .map(code => String.fromCharCode(code));
// console.log(charRange("A", "D"));
const rangeFromString = (num1, num2) =>
  range(parseFloat(num1), parseFloat(num2));
// console.log(rangeFromString("1", "5"));
const elemValue = num => character => idToText(character + num);
// console.log(elemValue(1)("B"));
const addChars = character1 => character2 => num => 
  charRange(character1, character2)
  .map(elemValue(num));
// console.log(addChars("A")("B")(1));
const rangeExpanded = str
  .replace(rangeRegex, (match, char1, num1, char2, num2) => 
  rangeFromString(num1, num2).map(addChars(char1)(char2)));
  // console.log(rangeFromString(num1, num2).map(addChars(char1)(char2))));
console.log(rangeExpanded);
// A1:B1 -> A,1,B,1 -> [1, 2] -> [A1.value, B1.value] -> [2, 1] 