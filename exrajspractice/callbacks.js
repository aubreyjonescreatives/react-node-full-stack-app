/*A callback is a function that's accepted as an argument and executed
by another function (the higher-order function). 

There are two kinds of callback functions: synchronous and asynchronous. 

The synchronous callbacks are executed at the same time as the higher-order function that uses the
callback. Synchronous callbacks are blocking. (eg. Array methods)

Asynchronous callbacks are executed at a later time than the higher-order function. Asynchronous callbacks
are non-blocking. */


import axios from 'axios'
//import fs from 'fs'
import fs from 'fs/promises'

const greet = name => `Hello, ${name}` // This is our callback function

console.log(greet('Thor'))

const people =['Thor', 'Hulk', 'Iron Man', 'Spider Man']

/*const greetings = people.map(() => {
    return 'foo'

})*/


const greetings = people.map(greet)

console.log(greetings)

const fetchData = callback => {
    setTimeout(() => {
        callback('fetchData is Done')
    }, 2000)
}

setTimeout(() => {
console.log(`Timer is done!`)
fetchData(text => {
    console.log(text)
})
}, 1500)

console.log('Hello!') //happens before setTimeout
console.log('Hi!') //happens before setTimeout


async function getPokemonData() { //TODO Convert to Async/Await
   return axios.get('https://pokeapi.co/api/v2/pokemon/snorlax').then(
        function({data }) {
            return data
        }
    ).catch( (error) => {
        console.error(error)
    })


} 


//console.log(getPokemonData())

// TODO work with fs (file system module, writeFileSync and writeFile)
//fs promises vs callback api


async function main() {
    const snorlax = await getPokemonData()
  //  const pikachu = await getPikachuData()
    try {
   await fs.writeFile('snorlax.json', JSON.stringify(snorlax, null, 2))
        console.log('The file has been saved.')
    } catch (err) {
        console.error(`Couldn't write file`)
    }
    }


main()