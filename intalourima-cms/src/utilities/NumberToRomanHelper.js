const numberToRoman = (date) => {
   let number = new Date(date).getMonth() + 1
   let roman = ''
   roman += 'M'.repeat(number / 1000)
   number %= 1000
   roman += 'CM'.repeat(number / 900)
   number %= 900
   roman += 'D'.repeat(number / 500)
   number %= 500
   roman += 'CD'.repeat(number / 400)
   number %= 400
   roman += 'C'.repeat(number / 100)
   number %= 100
   roman += 'XC'.repeat(number / 90)
   number %= 90
   roman += 'L'.repeat(number / 50)
   number %= 50
   roman += 'XL'.repeat(number / 40)
   number %= 40
   roman += 'X'.repeat(number / 10)
   number %= 10
   roman += 'IX'.repeat(number / 9)
   number %= 9
   roman += 'V'.repeat(number / 5)
   number %= 5
   roman += 'IV'.repeat(number / 4)
   number %= 4
   roman += 'I'.repeat(number)
   return roman
}

export default numberToRoman
