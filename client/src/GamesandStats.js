import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios'
import _ from 'lodash'
import {Card, IconButton, CardMedia, Typography, Container, 
    Dialog, Button, DialogTitle, DialogContent, DialogContentText, 
    DialogActions, TextField, Box} from '@material-ui/core'
//import DeleteIcon from '@material-ui/icons/Delete';
//import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/Add';
import LazyLoad from 'react-lazyload'
import './css/cardStyles.css'
import { Formik } from 'formik' 
import * as Yup from 'yup'


//const PORT = process.env.PORT || 3000



const Loading = () => (
<div>
<h4>Loading...</h4>

</div>


)



const DeckofCards = () => {

const [selectedCard, setSelectedCard] = useState( {_id: ''})
const [deckData, setDeckData] = useState([])
const [debouncedName, setDebouncedName] = useState('')
const [editOpen, setEditOpen] = useState(false)
const [deleteOpen, setDeleteOpen] = useState(false)
//const url = `https://crud-node-backend-app.herokuapp.com/card`






const fetchCards = async () => {
    try {
    const cards = await axios.get(`http://localhost:5050/`)
    setDeckData(cards.data)
    console.log(cards.data)
    } catch (err) {
        console.log(err)
    }
    }
    
    
    
    useEffect(() => {
        fetchCards()
       
    }, [])






const handleInput = (event) => {
    debounce(event.target.value)
}


    const debounce = useCallback(
        _.debounce((searchVal) => {
            setDebouncedName(searchVal)
        }, 1000), 
        [],
    )

    


    const handleSearch = () => {
        if (debouncedName) {
            setDeckData(deckData.filter(deck => deck._id.includes(debouncedName)))
        } else {
            fetchCards()
        }
    }











return (
    <div className="main-1">
     <h1>Card Sorting</h1>
     <h2>How Fast Can You Make a Full Suit?</h2>
    
    <button className="buttonHint">Show Hint</button>
  
     <div id="gameHints"></div>
     <div></div>
     <form>
         <TextField placeholder='Search' onChange={handleInput} />
         <IconButton aria-label='search' onClick={handleSearch}>
             <SearchIcon />
             </IconButton>
             <IconButton aria-label='add card'>
                <AddCircleIcon/>
             </IconButton>
     </form>




    {deckData.map((card) => {
     return (
    <Card className="card-container" key={card._id}>
    <LazyLoad placeholder={<Loading></Loading>}> 
     <CardMedia className="CardMedia"
     component="img"
     alt={'Card'}
     image={card.image}
     >
 
     </CardMedia>
     <Typography>{card.value}</Typography>
     <Typography>OF</Typography>
     <Typography>{card.suit}</Typography>
  </LazyLoad>
     </Card>
    
    )
    
     })
     }
  
 


   
   </div>

)}
  
export default DeckofCards 