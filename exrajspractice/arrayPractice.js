const items = [

{
id: '1',
name: "One",

}, 

{
    id: '2',
    name: "Two",
    
    }, 




]

const results = items.flatMap((item) => {

return [
{
    id: '3',
    name: item.name,

}, 

{
id: '4', 
name: item.name,

},


]

})

console.log(items)
console.log(results)


const results = items.forEach((item) => {
    newArray.push(
    {
        id: '3', 
        name: item.name, 
    },
    {
        id: '4', 
        name: item.name,
    }
    )
})


const flatResults = items.flatMap((item) => {
return [{
id: '3', 
name: item.name, 

},
{
id: '4', 
name: item.name,
}

]

})

console.log(items)
console.log(results)
console.log(newArray)
console.log(flatResults)