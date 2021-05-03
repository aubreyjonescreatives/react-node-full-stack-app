import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios'
import _ from 'lodash'
import {Card, IconButton, CardMedia, Typography, Container, 
    Dialog, Button, DialogTitle, DialogContent, DialogContentText, 
    DialogActions, TextField, Box, CardContent, Link} from '@material-ui/core'
    import { makeStyles } from '@material-ui/core/styles';
    import Accordion from '@material-ui/core/Accordion';
    import AccordionSummary from '@material-ui/core/AccordionSummary';
    import AccordionDetails from '@material-ui/core/AccordionDetails';
    import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/Add';
//import LinkIcon from '@material-ui/icons/Link';
//import LazyLoad from 'react-lazyload'
import './css/cardStyles.css'
import { Formik } from 'formik' 
import * as Yup from 'yup'
import * as dotenv from 'dotenv'



dotenv.config()
const port = process.env.PORT || 3000


/* 
const Loading = () => (
<div>
<h4>Loading...</h4>

</div>


)

 */


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      border: 'none',
      margin: '20px',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  






const PopularGames = (props) => {
    const classes = useStyles();

const [selectedGame, setSelectedGame] = useState( { name: ''})
const [gameData, setGameData] = useState([])
const [debouncedName, setDebouncedName] = useState('')
const [createOpen, setCreateOpen] = useState(false)
const [editOpen, setEditOpen] = useState(false)
const [deleteOpen, setDeleteOpen] = useState(false)
const [createData, setCreateData] = useState({
    id: null, 
    name: '', 
    image_url: '',
    description: '', 
    price: ''

})



// Description Accordion 
















// Search Function


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

// Create Function


    
    const handleClickCreateOpen = () => {
        setCreateOpen(true)
    }

    const handleCloseCreate = () => {
        setCreateOpen(false)
        handleCreate()
        console.log('Game Added successfully to database.')
    }


const addGame = (e) => {
    setCreateData({
        ...createData,
    id: null, 
    name: '',
    image_url: '', 
    description: '', 
    price: ''
     
    })
}



    const handleCreate = async () => {
        try {
            await axios.post(`http://localhost:${port}/populargame`, {
                id: createData.id, 
                name: createData.name, 
                image_url: createData.image_url, 
                description: createData.description, 
                price: createData.price,
            })
        } catch (err) {
            console.error(err)
        }
        fetchGames()
        }





// Edit Function


    const handleClickEditOpen = (game) => {
        setSelectedGame(game.game) 
        setEditOpen(true)
    }

    const handleCloseEdit = () => {
        setEditOpen(false)
    }
    

const handleUpdate = async (values) => {
    try {
        const result = await axios.put(`http://localhost:${port}/populargame/update`, {
            data: {
                gameId: values.id, 
                name: values.name, 
                image_url: values.image_url, 
                description: values.description, 
                price: values.price,
            },
        })
        if (result.status === 200) {
            fetchGames()
        }
    } catch (err) {
        console.error(err)
    }
    }



    
// Delete Function


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
        await axios.delete(`http://localhost:${port}/populargame/delete`, { 
        data: {   
        gameId: selectedGame._id
        }
    })
    fetchGames()
    } catch (err) {
        console.error(err)
    }
}



// Fetch API 


const fetchGames = async () => {
    try {
    const populargamesInfo = await axios.get(`http://localhost:${port}/populargame`)
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
  
             <div className="actions">
             <IconButton aria-label='add' onClick={handleClickCreateOpen} className="addButton">Create Game <AddCircleIcon /></IconButton>

             <form className="gamestatsSearch">
         <TextField placeholder='Search' onChange={handleInput} />
         <IconButton aria-label='search' onClick={handleSearch}>
             <SearchIcon />
             </IconButton>
     </form>
     </div>




    <Container className="popular-game-container">
    {gameData.map((game) => {
     return (
    <Card className="popular-game-card" key={game._id}>
    <Link href={game.url} className="gameLink">
     <CardMedia 
     className="GameMedia"
     component="img"
     alt={'Board Game'}
     image={game.image_url}
     card={game.game}
     />
     <CardContent>
     <Typography className="gameName">{game.name}</Typography>
     
     <Accordion>
        <AccordionSummary className="a-border"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{game.name} Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography className="gameDescription">{game.description}</Typography>
        </AccordionDetails>
      </Accordion>
     <Typography className="gamePrice">${game.price}</Typography>
    <div className="icons">
     <IconButton className="gameIcon" aria-label='edit' onClick={() => handleClickEditOpen({ game })}> <EditIcon/></IconButton>
     <IconButton className="gameIcon" aria-label='delete' onClick={() => handleClickDeleteOpen({ game })}><DeleteIcon/></IconButton>
     </div>
     </CardContent>
     </Link>
     </Card>
    
    )
    
     })}
     </Container>
     <Dialog 
    open={editOpen}
    onClose={handleCloseEdit}
    aria-labelledby='edit-dialog-name'
    >
    <Formik
    initialValues={{ 
        id: selectedGame?._id,
        name: selectedGame?.name, 
        image_url: selectedGame?.image_url, 
        description: selectedGame?.description, 
        price: selectedGame?.price, 
       
    }}
    validationSchema={Yup.object().shape({
        id: Yup.string('Enter game ID').required(
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
         <DialogTitle id="edit-dialog-name">Edit Game Info</DialogTitle>   
         <DialogContent>
             <DialogContentText>
                 Edit Information for this Game: 
             </DialogContentText>
             <Box>
            <TextField 
            autoFocus 
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.name && errors.name)} 
            helperText={touched.name && errors.name} 
            />
            </Box>
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
            name="description"
            label="Description"
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
            label="Price"
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
             <Button type='submit' onClick={handleSubmit}>Save</Button>
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






     <Dialog open={createOpen} onClose={handleCloseCreate} aria-labelledby="create-dialog-name">
        <DialogTitle id="create-dialog-name">Create a Game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All fields are required with text to create a game and add it to the list:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="id"
            label="Game ID"
            type="text"
            fullWidth
            onChange={addGame}
           
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Game Name"
            type="text"
            fullWidth
            onChange={addGame}
          />
            <TextField
            autoFocus
            margin="dense"
            id="image_url"
            label="Game Image URL"
            type="text"
            fullWidth
            onChange={addGame}
          />
            <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Game Description"
            type="text"
            fullWidth
            onChange={addGame}
          />
            <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Game Price"
            type="text"
            fullWidth
            onChange={addGame}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreate} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseCreate} color="primary">
            Create Game
          </Button>
        </DialogActions>
      </Dialog>
  











   
   </div>

   </>

)}
  
export default PopularGames 