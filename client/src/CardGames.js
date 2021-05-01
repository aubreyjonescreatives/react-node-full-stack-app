import React, { useState, useCallback} from 'react';
//import axios from 'axios'
import _ from 'lodash'
import {useQuery, useMutation, gql} from '@apollo/client'
import {Card, IconButton, Typography, Container, 
    Dialog, Button, DialogTitle, DialogContent, DialogContentText, 
    DialogActions, TextField, Box, CardMedia, Link} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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




const ALL_GAMES = gql`
query {
    allGames {
        id 
        title
        description 
        image
        price
      
    }
}
`
console.log(ALL_GAMES)


const CREATE_GAME = gql `
    mutation createGame ( $title: String!, $description: String, $image: String!, $price: String!) {
        createGame (
            data: {
                title: $title, 
                description: $description
                image: $image
                price: $price
            }
        ) {
            id
        }
    }

`
console.log(CREATE_GAME)

const UPDATE_GAME = gql`
mutation updateGame ($id: Int!, $title: String!, $description: String, $image: String!, $price: String!) {
    updateGame (id: $id, 
        data: {
            title: $title, 
            description: $description
            image: $image 
            price: $price
            
        }) {
            id
           
        }
}
`

const DELETE_GAME = gql`
mutation deleteGame ($id: Int!) {
    deleteGame (id: $id) {
        id
    }
}
`



const CardGames = () => {

const [selectedGame, setSelectedGame] = useState( {title: ''})
const [debouncedTitle, setDebouncedTitle] = useState('')
const [createOpen, setCreateOpen] = useState(false)
const [editOpen, setEditOpen] = useState(false)
const [deleteOpen, setDeleteOpen] = useState(false)
const [searchFilter, setSearchFilter] = useState('')



const handleInput = (event) => {
    debounce(event.target.value)
}

const debounce = useCallback (
    _.debounce((searchVal) => {
        setDebouncedTitle(searchVal)
    }, 1000),
    []
)


    const { loading, error, data} = useQuery(ALL_GAMES)
    const [updateGame] = useMutation(UPDATE_GAME)
    const [deleteGame] = useMutation(DELETE_GAME)
    const [createGame] = useMutation(CREATE_GAME)

    if (loading) {
        return (
            <Container>
                <Typography>Loading...</Typography>
            </Container>
        )
    }
    if (error) {
        return (
            <Typography>{`${error.message}`}</Typography>
        )
    }





    const gameList = data.allGames 




    const handleDelete = async () => {
        setDeleteOpen(false)
        console.log(selectedGame.id)
        try {
            deleteGame({ variables: {id: selectedGame.id}})
            } catch (err) {
            console.error(err)
        }
    }



    const handleClickDeleteOpen = (game) => {
        setSelectedGame(game.game)
        setDeleteOpen(true)
      }
      
      const handleCloseDelete = () => {
          setDeleteOpen(false)
      }




    const handleClickEditOpen = (game) => {
        setSelectedGame(game.game) 
        setEditOpen(true)
    }


    

    const handleCloseEdit = () => {
        setEditOpen(false)
    }



  
    const handleUpdate = async (values) => {
        updateGame({
            variables: {
                id: selectedGame.id, 
                image: values.image,
                title: values.title, 
                description: values.description,
                price: values.price
            }
        })
        }
    

        
        const handleClickCreateOpen = () => {
            console.log('create game button clicked')
            setCreateOpen(true)
          }
          
          const handleCloseCreate = () => {
              setCreateOpen(false)
          }

          const handleCreate = async (values) => {
            createGame({
                variables: {
                    image: values.image,
                    title: values.title,  
                    description: values.description, 
                    price: values.price
                }
            })
            }




return (
    <div className="main-1">
     <h1 className="gamesHeader">Card Games</h1>
     <div className="actions">
     <IconButton aria-label='add' onClick={() => handleClickCreateOpen()} className="addButton">
             Create Game <AddCircleIcon />
             </IconButton>
     </div>
<div></div>

    {gameList.map((game, index) => {
     return (
    <Card className="game-container" key={game.id} index={index}>
    <LazyLoad placeholder={<Loading></Loading>}> 
    <CardMedia 
     className="CardMedia"
     component="img"
     alt={'Card Game'}
     image={`./${game.image}`}
     card={game.game}
     />
     <Typography className="gameInfoTitle">{game.title}</Typography>
     <Typography className="gameInfo">{game.description}</Typography>
     <Typography className="gameInfoJP">Current Jackpot: ${game.price}</Typography>
    <div className="iconButtons">
     <IconButton aria-label='edit' onClick={() => handleClickEditOpen({ game })}> <EditIcon/></IconButton>
     <IconButton aria-label='delete' onClick={() => handleClickDeleteOpen({game})}><DeleteIcon/></IconButton>
     </div>
     </LazyLoad>
     </Card>
    
    )
    
     })
     }
   
     <Dialog 
    open={editOpen}
    onClose={handleCloseEdit}
    aria-labelledby='edit-dialog-title'>
    <Formik
    initialValues={{
        title: selectedGame?.title,  
        description: selectedGame?.description, 
        image: selectedGame?.image,
        price: selectedGame?.price

    }}
    validationSchema={Yup.object().shape({
        title: Yup.string('Enter Game Title').required(
            'Game title is required', 
        ),
        description: Yup.string('Description').required(
            'Game description is required', 
        ), 
        image: Yup.string('Image').required(
            'Game image is required', 
        ), 
        price: Yup.string('Price').required(
            'Game jackpot is required', 
        ),
        
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
         <DialogTitle id="edit-dialog-title">Edit Game</DialogTitle>   
         <DialogContent>
             <DialogContentText>
                 Edit Information for this Game: 
             </DialogContentText>
             <TextField 
            autoFocus 
            id="title"
            name="title"
            label="Game Title"
            type="text"
            fullWidth
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.title && errors.title)} 
            helperText={touched.title && errors.title} 
            />
               <Box>
                <TextField 
            autoFocus 
            id="description"
            name="description"
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
            id="image"
            name="image"
            label="Game Image"
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
            id="price"
            name="price"
            label="Current Game Jackpot"
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
                Are you sure you want to delete this Game?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDelete}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
        </Dialog>
     </Container>


     </form>









     <Dialog 
    open={createOpen}
    onClose={handleCloseCreate}
    aria-labelledby='create-dial'>
    <Formik
    initialValues={{
        title: selectedGame?.title,  
        description: selectedGame?.description,
        image: selectedGame?.image,
        price: selectedGame?.price  
       
    }}
    validationSchema={Yup.object().shape({
        title: Yup.string('Enter Game Title').required(
            'Game title is required', 
        ),
        
        description: Yup.string('Description').required(
            'Game description is required', 
        ), 
        image: Yup.string('image').required(
            'Game image is required', 
        ),
        price: Yup.string('price').required(
            'Game jackpot is required', 
        ),
         
    })}
    onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
        try {
            await handleCreate(values) 
            handleCloseCreate()
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
         <DialogTitle id="create-dial">Create Game</DialogTitle>   
         <DialogContent>
             <DialogContentText>
                 Create Information for this Game: 
             </DialogContentText>
             <TextField 
            autoFocus 
            id="title"
            name="title"
            label="Game Title"
            type="text"
            value={values.title}
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.title && errors.title)} 
            helperText={touched.title && errors.title} 
            />
               <Box>
                <TextField 
            autoFocus 
            id="description"
            name="description"
            label="Game Description"
            value={values.description}
            type="text"
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.description && errors.description)} 
            helperText={touched.description && errors.description} 
                />
            </Box>
            <Box>
                <TextField 
            autoFocus 
            id="image"
            name="image"
            label="Game Image"
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
            id="price"
            name="price"
            label="Game Jackpot"
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
             <Button onClick={handleCloseCreate}>Cancel</Button>
             <Button type='submit'>Create Game</Button>
         </DialogActions>
       
        </form>
    )}



    </Formik>

    </Dialog>



























   
   </div>

)

}


  
export default CardGames 