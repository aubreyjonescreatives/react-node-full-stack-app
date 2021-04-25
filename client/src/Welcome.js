import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios'
import _ from 'lodash'
import {Card, IconButton, CardMedia, Typography, Container, 
    Dialog, Button, DialogTitle, DialogContent, DialogContentText, 
    DialogActions, TextField, Box, CardContent} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/Add';
//import LazyLoad from 'react-lazyload'
import './css/cardStyles.css'
import { Formik } from 'formik' 
import * as Yup from 'yup'


//const PORT = process.env.PORT || 3000


/* 
const Loading = () => (
<div>
<h4>Loading...</h4>

</div>


)

 */

const Welcome = () => {

const [selectedCard, setSelectedCard] = useState( { name: ''})
const [deckData, setDeckData] = useState([])
const [debouncedName, setDebouncedName] = useState('')
const [editOpen, setEditOpen] = useState(false)
const [deleteOpen, setDeleteOpen] = useState(false)
//const url = `https://crud-node-backend-app.herokuapp.com/card`






const fetchCards = async () => {
    try {
    const populargames = await axios.get(`http://localhost:5050/`)
    setDeckData(populargames.data)
    console.log(populargames.data)
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
            setDeckData(deckData.filter(game => game.name.includes(debouncedName)))
        } else {
            fetchCards()
        }
    }





    const handleClickEditOpen = (game) => {
        setSelectedCard(game.game) 
        setEditOpen(true)
    }

    const handleCloseEdit = () => {
        setEditOpen(false)
    }
    
const handleUpdate = async (values) => {
    try {
        const result = await axios.put(`http://localhost:5050/update`, {
            data: {
                cardId: values._id,
                name: values.name, 
                image_url: values.image_url, 
                description: values.description, 
                price: values.price
            },
        })
        if (result.status === 200) {
            fetchCards()
        }
    } catch (err) {
        console.error(err)
    }
    }



    



const handleClickDeleteOpen = (game) => {
    console.log('You clicked to delete')
    console.log(game._id)
    setSelectedCard(game.game)
    setDeleteOpen(true)
}

const handleCloseDelete = () => {
    setDeleteOpen(false)
}

const handleDelete = async () => {
    setDeleteOpen(false)
    console.log(selectedCard._id)
    try {
        await axios.delete(`http://localhost:5050/delete`, { 
        data: {   
        cardId: selectedCard._id
        }
    })
    fetchCards()
    } catch (err) {
        console.error(err)
    }
}







return (
    <>
    <div className="main-1">
     <h1>Chaotic Neutral Games</h1>
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


</div>
  


   </>

)}
  
export default Welcome 