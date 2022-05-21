const birthdayBoy = 'igor sergeevich'
const congratulatorOne = 'vadiM arTemovich'
const congratulatorTwo = 'baraSh'

const formatName = (fullname) => fullname.split(' ').map(s => s.charAt(0).toUpperCase() + s.toLowerCase().slice(1) ).join(' ')

const getCongratulations = (static, ...names) => names.reduce((memo, name, index) => (memo + formatName(name) + static[index+1]), static[0])

getCongratulations`Congratulation, dear ${birthdayBoy}, from ${congratulatorOne} and ${congratulatorTwo}` //Congratulation, dear Igor Sergeevich, from Vadim Artemovich and Barash

