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

const PopularGames = () => {

const [selectedGame, setSelectedGame] = useState( { name: ''})
const [gameData, setGameData] = useState([])
const [debouncedName, setDebouncedName] = useState('')
const [editOpen, setEditOpen] = useState(false)
const [deleteOpen, setDeleteOpen] = useState(false)
//const url = `https://crud-node-backend-app.herokuapp.com/card`




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
            setGameData(gameData.filter(game => game.name.includes(debouncedName)))
        } else {
            fetchGames()
        }
    }





    const handleClickEditOpen = (game) => {
        setSelectedGame(game.game) 
        setEditOpen(true)
    }

    const handleCloseEdit = () => {
        setEditOpen(false)
    }
    
const handleUpdate = async (values) => {
    try {
        const result = await axios.put(`http://localhost:5050/populargame/update`, {
            data: {
                gameId: values._id,
                name: values.name, 
                image_url: values.image_url, 
                description: values.description, 
                price: values.price
            },
        })
        if (result.status === 200) {
            fetchGames()
        }
    } catch (err) {
        console.error(err)
    }
    }



    



const handleClickDeleteOpen = (game) => {
    console.log('You clicked to delete')
    console.log(game._id)
    setSelectedGame(game.game)
    setDeleteOpen(true)
}

const handleCloseDelete = () => {
    setDeleteOpen(false)
}

const handleDelete = async () => {
    setDeleteOpen(false)
    console.log(selectedGame._id)
    try {
        await axios.delete(`http://localhost:5050/populargame/delete`, { 
        data: {   
        gameId: selectedGame._id
        }
    })
    fetchGames()
    } catch (err) {
        console.error(err)
    }
}




const fetchGames = async () => {
    try {
    const populargamesInfo = await axios.get(`http://localhost:5050/populargame`)
    setGameData(populargamesInfo.data)
    console.log(populargamesInfo.data)
    } catch (err) {
        console.log(err)
    }
    }
    
    
    useEffect(() => {
        fetchGames()
       
    }, [])


return (
    <>
    <div className="main-1">
     <h1 className="gamesHeader"> Popular Games</h1>
     <div></div>
     <form className="gamestatsSearch">
         <TextField placeholder='Search' onChange={handleInput} />
         <IconButton aria-label='search' onClick={handleSearch}>
             <SearchIcon />
             </IconButton>
             <IconButton aria-label='add card'>
                <AddCircleIcon/>
             </IconButton>
     </form>



    <Container className="popular-game-container">
    {gameData.map((game) => {
     return (
    <Card className="popular-game-card" key={game._id}>
     <CardMedia 
     className="PopularGameMedia"
     component="img"
     alt={'Board Game'}
     image={game.image_url}
     card={game.game}
     />
     <CardContent>
     <Typography>{game.description}</Typography>
     <Typography>{game.price}</Typography>
     <IconButton aria-label='edit' onClick={() => handleClickEditOpen({ game })}> <EditIcon/></IconButton>
     <IconButton aria-label='delete' onClick={() => handleClickDeleteOpen({ game })}><DeleteIcon/></IconButton>
     </CardContent>
     </Card>
    
    )
    
     })}
     </Container>

     <Dialog 
    open={editOpen}
    onClose={handleCloseEdit}
    aria-labelledby='edit-dial'
    >
    <Formik
    initialValues={{
        id: selectedGame?._id, 
        name: selectedGame?.name, 
        image_url: selectedGame?.image_url, 
        description: selectedGame?.description, 
        price: selectedGame?.price 
    }}
    validationSchema={Yup.object().shape({
        id: Yup.string('Enter Game ID').required(
            'Game ID is required', 
        ),
        name: Yup.string('Enter game name').required(
            'Game name is required',
        ),
        image_url: Yup.string('Image URL'), 
        description: Yup.string('Game Description'), 
        price: Yup.string('Game Price'), 
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
         <DialogTitle id="edit-dial">Edit Game Info</DialogTitle>   
         <DialogContent>
             <DialogContentText>
                 Edit Information for this Game: 
             </DialogContentText>
             <TextField 
            autoFocus 
            id="id"
            name="id"
            label="Game ID"
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
            id="Game Name"
            name="Game Name"
            label="Game Name"
            type="text"
            fullWidth
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.name && errors.name)} 
            helperText={touched.name && errors.name} 
            />
            <Box>
                <TextField 
            autoFocus 
            id="image_url"
            name="image_url"
            label="Image URL"
            type="text"
            fullWidth
            value={values.image_url}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.image_url && errors.image_url)} 
            helperText={touched.image_url && errors.image_url} 
                />
            </Box>
            <Box>
                <TextField 
            autoFocus 
            id="description"
            name="Description"
            label="Game Description"
            type="text"
            fullWidth
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.description && errors.description)} 
            helperText={touched.description && errors.description} 


                />
            </Box>


            <Box>
                <TextField 
            autoFocus 
            id="price"
            name="price"
            label="Game Price"
            type="text"
            fullWidth
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.price && errors.price)} 
            helperText={touched.price && errors.price} 
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
        <DialogTitle>Delete Game</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this game?
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

   </>

)}
  
export default PopularGames 