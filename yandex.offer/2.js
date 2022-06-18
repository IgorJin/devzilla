function createBagge (firstName, lastName) {

	const badge = {
    _firstName: firstName,
    _lastName: lastName,
    _fullName: `${firstName} ${this.lastName}`,
  	get lastName() {
    	return `${this._lastName}`
  	},
    get firstName() {
    	return `${this._firstName}`
  	},
    get fullName() {
    	return `${this._lastName} ${this._firstName}`
  	},
    set firstName(str) {
    	if (typeof str !== 'string') return false
      
      this._firstName = str
  	},
    set lastName(str) {
    	if (typeof str !== 'string') return false
      
      this._lastName = str
  	},
    set fullName(str) {
    	if (typeof str !== 'string') return false
      if (str.split(' ').length <= 1) return false
		
    	const [fn, ln] = str.split(' ')
    	this._firstName = fn
      this._lastName = ln
  	},
  }

    return badge;  
}

const bagge = createBagge('Igor', 'Zubenko')
console.log(bagge.fullName)

console.log('SET FULLNAME')
bagge.fullName = 'Egor Sub'
console.log(bagge.fullName, bagge.firstName, bagge.lastName)

console.log('SET NAME')
bagge.firstName = 'Leha'
console.log(bagge.fullName, bagge.firstName, bagge.lastName)

console.log('SET LASTNAME')
bagge.lastName = 'Govorov'
console.log(bagge.fullName, bagge.firstName, bagge.lastName)

console.log('SET INCORRECT FULLNAME')
bagge.fullName = 's'
console.log(bagge.fullName, bagge.firstName, bagge.lastName)