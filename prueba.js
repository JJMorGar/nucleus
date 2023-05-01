let numRamdon
const letras = '!"#$&/()=qwertyuiopasdfghjklñ!#$!zxm1234567890'.toUpperCase()
let code = ''

for (let i = 0; i < 6; i++) {
  numRamdon = Math.round(Math.random() * (letras.length - 1))
  code += letras[numRamdon]
}

console.log(code)
