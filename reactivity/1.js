let data = { price: 5, quantity: 2 }
let target = null

// Это - тот же самый класс, который мы уже рассматривали
class Dep {
    constructor () {
        this.subscribers = []
    }
    depend () {
        if (target && !this.subscribers.includes(target)){
            this.subscribers.push(target)
        }
    }
    notify () {
        this.subscribers.forEach(sub => sub())
    }
}

// Эту процедуру мы тоже уже рассматривали, но
// здесь она дополнена новыми командами
Object.keys(data).forEach(key => {
    let internalValue = data[key]

    // С каждым свойством будет связан собственный
    // экземпляр класса Dep
    const dep = new Dep()

    Object.defineProperty(data, key, {
        get() { 
            console.log('GETTER', key, target.toString())
            dep.depend() // запоминаем выполняемую функцию target
            return internalValue
        },
        set(newVal) {
            console.log('SETTER', key, target.toString())
            internalValue = newVal
            dep.notify() // повторно выполняем сохранённые функции
        }
    })
})

// Теперь функция watcher не вызывает dep.depend(),
// так как этот вызов выполняется в геттере
function watcher(myFunc){
    console.log('watcher')
    target = myFunc
    target()
    target = null
    console.log('watcher end')
}

let total = 0

watcher(() => {
    total = data.price * data.quantity
})

console.log('total', total)