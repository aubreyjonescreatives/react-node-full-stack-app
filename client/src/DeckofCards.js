import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios'
import _ from 'lodash'
import {Card, IconButton, CardMedia, Typography, Container, 
    Dialog, Button, DialogTitle, DialogContent, DialogContentText, 
    DialogActions, TextField, Box} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/Add';
import LazyLoad from 'react-lazyload'
import './css/cardStyles.css'
import { Formik } from 'formik' 
import * as Yup from 'yup'


const PORT = process.env.PORT || 3000



const Loading = () => (
<div>
<h4>Loading...</h4>

</div>


)



const DeckofCards = () => {


const [deckData, setDeckData] = useState([])

//const [restartdeckData, restartsetDeckData] = useState([])


const [deleteOpen, setDeleteOpen] = useState(false)
const [selectedCard, setSelectedCard] = useState(null)
const [editOpen, setEditOpen] = useState(false)
const [debouncedName, setDebouncedName] = useState('')



const fetchCards = async () => {
    try {
    const cards = await axios.get(`http://localhost:${PORT}/card`)
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





    const handleClickEditOpen = (card) => {
        setSelectedCard(card.card) 
        setEditOpen(true)
    }

    const handleCloseEdit = () => {
        setEditOpen(false)
    }
    
const handleUpdate = async (values) => {
    try {
        const result = await axios.put(`http://localhost:${PORT}/card/update`, {
            data: {
                id: values._id,
                code: values.code, 
                image: values.image, 
                value: values.value, 
                suit: values.suit
            },
        })
        if (result.status === 200) {
            fetchCards()
        }
    } catch (err) {
        console.error(err)
    }
    }

    const handleAdd = async (values) => {
        try {
            const result = await axios.post(`http://localhost:${PORT}/card/add`, {
                data: {
                    id: values._id,
                    code: values.code, 
                    image: values.image, 
                    value: values.value, 
                    suit: values.suit
                },
            })
            if (result.status === 200) {
                fetchCards()
            }
        } catch (err) {
            console.error(err)
        }
        }
    



const handleClickDeleteOpen = (card) => {
    console.log('You clicked to delete')
    console.log(card.card._id)
    setSelectedCard(card.card)
    setDeleteOpen(true)
}

const handleCloseDelete = () => {
    setDeleteOpen(false)
}

const handleDelete = async () => {
    setDeleteOpen(false)
    console.log(selectedCard._id)
    try {
        await axios.delete(`http://localhost:${PORT}/card/delete`, { 
        data: {   
        cardId: selectedCard._id
        }
    })
    fetchCards()
    } catch (err) {
        console.error(err)
    }
}


function hintButton() {
    document.getElementById('gameHints').textContent = 'Hint: Add Cards or Press Restart'
    let hints = document.getElementById('gameHints') 
    if (hints.style.display === 'none') {
        hints.style.display = 'block'; 
    } else {
        hints.style.display = 'none'
    }
    
}








return (
    <div className="main-1">
     <h1>Card Sorting</h1>
     <h2>How Fast Can You Make a Full Suit?</h2>
    
    <button className="buttonHint" onClick={hintButton}>Show Hint</button>
  
     <div id="gameHints"></div>
     <div></div>
     <form>
         <TextField placeholder='Search' onChange={handleInput} />
         <IconButton aria-label='search' onClick={handleSearch}>
             <SearchIcon />
             </IconButton>
             <IconButton aria-label='add card' onClick={handleAdd}>
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
     <IconButton aria-label='edit' onClick={() => handleClickEditOpen({ card })}> <EditIcon/></IconButton>
     <IconButton aria-label='delete' onClick={() => handleClickDeleteOpen({card})}><DeleteIcon/></IconButton>
     </LazyLoad>
     </Card>
    
    )
    
     })
     }
    <div id="restartGame"></div>
     
     <Dialog 
    open={editOpen}
    onClose={handleCloseEdit}
    aria-labelledby='edit-dial'>
    <Formik
    initialValues={{
        id: selectedCard?._id, 
        code: selectedCard?.code, 
        image: selectedCard?.image, 
        value: selectedCard?.value, 
        suit: selectedCard?.suit 
    }}
    validationSchema={Yup.object().shape({
        id: Yup.string('Enter Card ID').required(
            'Card ID is required', 
        ),
        code: Yup.string('Enter card code').required(
            'Card code is required',
        ),
        image: Yup.string('Image URL'), 
        value: Yup.string('Value'), 
        suit: Yup.string('Suit'), 
    })}
    onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
        try {
            await handleUpdate(values) 
            handleCloseEdit()
        }   catch (err) {
            console.error(err)
            setStatus({ success: false })
            setErrors({ submit: err.message })
            setSubmitting(false)
        }
    }}
    >
    {({
        values, 
        errors, 
        touched, 
        handleChange, 
        handleBlur, 
        handleSubmit, 
        isSubmitting,
    }) => (
        <form 
        noValidate 
        autoComplete='off' 
        onSubmit={handleSubmit}
        >
         <DialogTitle id="edit-dial">Edit Card</DialogTitle>   
         <DialogContent>
             <DialogContentText>
                 Edit Information for this Card: 
             </DialogContentText>
             <TextField 
            autoFocus 
            id="id"
            name="id"
            label="Card ID"
            type="text"
            fullWidth
            value={values._id}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched._id && errors._id)} 
            helperText={touched._id && errors._id} 
            />
            <TextField 
            autoFocus 
            id="code"
            name="code"
            label="Card Code"
            type="text"
            fullWidth
            value={values.code}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.code && errors.code)} 
            helperText={touched.code && errors.code} 
            />
            <Box>
                <TextField 
            autoFocus 
            id="image"
            name="image"
            label="Card Image"
            type="text"
            fullWidth
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.image && errors.image)} 
            helperText={touched.image && errors.image} 
                />
            </Box>
            <Box>
                <TextField 
            autoFocus 
            id="value"
            name="value"
            label="Card Value"
            type="text"
            fullWidth
            value={values.value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.value && errors.value)} 
            helperText={touched.value && errors.value} 


                />
            </Box>


            <Box>
                <TextField 
            autoFocus 
            id="suit"
            name="suit"
            label="Card Suit"
            type="text"
            fullWidth
            value={values.suit}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.suit && errors.suit)} 
            helperText={touched.suit && errors.suit} 
                />
            </Box>
         </DialogContent>
         <DialogActions>
             <Button onClick={handleCloseEdit}>Cancel</Button>
             <Button type='submit'>Save</Button>
         </DialogActions>
       
        </form>
    )}



    </Formik>

    </Dialog>




    <form>
     <Container>
        <Dialog open={deleteOpen} onClose={handleCloseDelete}>
        <DialogTitle>Delete Card</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this card?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDelete}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
        </Dialog>
     </Container>


     </form>








   
   </div>

)}
  
export default DeckofCards 