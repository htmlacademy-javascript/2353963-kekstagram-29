const checkLength = (string, maxLength) => string.length <= maxLength;

checkLength('Проверяемая строка', 20);
checkLength('Проверяемая строка', 18);
checkLength('Проверяемая строка', 10);


 const checkPalindrome = (string) => {
   const normalizedString = string.replaceAll(' ', '').toUpperCase();
   let reversedString = '';


   return normalizedString === reversedString;
   };

 checkPalindrome('Кекс');

 const getNumbers = (string) => {
   string = string.toString();
   let result = '';

   return Number(result) || NaN;
 };

 getNumbers('2023 год');

