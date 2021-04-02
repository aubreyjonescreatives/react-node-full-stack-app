import React, { useEffect, useState} from 'react'; 
import axios from "axios";



const superFunction = () => {

const [superheroData, setSuperheroData] = useState({
    superList: []
})




const superHeroes = () => {
  axios({
  method: 'GET',
  url: 'https://superhero-search.p.rapidapi.com/',
  params: {hero: 'Spiderman'},
  headers: {
    'x-rapidapi-key': process.env.SUPERHERO_API_KEY,
    'x-rapidapi-host': 'superhero-search.p.rapidapi.com'
  }
})
.then(function (response) {
    setSuperheroData({
        superList: response.data.properties
    })
});

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

}


useEffect(() => {
    superHeroes()
})


return (

<div>



{superheroData.superList.map((properties) => {

return (    
<h1>{properties.eyeColor}</h1>


)}

)}



</div>

)


}


export default superFunction; 



console.log(superFunction); 
