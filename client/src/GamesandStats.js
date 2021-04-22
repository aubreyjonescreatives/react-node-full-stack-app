import React, {useState} from 'react';
//import axios from 'axios'
import _, { debounce } from 'lodash'
import {useQuery, useMutation, gql} from '@apollo/client'
import {Card, IconButton, Typography, Container, 
    Dialog, Button, DialogTitle, DialogContent, DialogContentText, 
    DialogActions, TextField, Box} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
//import AddCircleIcon from '@material-ui/icons/Add';
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
      
    }
}
`
console.log(ALL_GAMES)

const UPDATE_GAME = gql`
mutation updateGame ($id: Int!, $title: String!, $description: String, $defaultCredits: String) {
    updateGame (id: $id, 
        data: {
            title: $title, 
            description: $description,
            defaultCredits: $defaultCredits, 
           
        }
        ) {
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



const GamesandStats = () => {

const [selectedGame, setSelectedGame] = useState( {title: ''})
//const [debouncedTitle, setDebouncedTitle] = useState('')
const [editOpen, setEditOpen] = useState(false)
const [deleteOpen, setDeleteOpen] = useState(false)


const handleInput = (event) => {
    debounce(event.target.value)
}


    const { loading, error, data} = useQuery(ALL_GAMES)
    const [updateGame] = useMutation(UPDATE_GAME)
    const [deleteGame] = useMutation(DELETE_GAME)


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
                title: values.title, 
                defaultCredits: values.defaultCredits, 
                description: values.description
            }
        })
        }
    



        const handleClickDeleteOpen = (game) => {
          setSelectedGame(game.game)
          setDeleteOpen(true)
        }
        
        const handleCloseDelete = () => {
            setDeleteOpen(false)
        }




return (
    <div className="main-1">
     <h1 className="gamesHeader">Games</h1>
     <div></div>
     <form className="gamestatsSearch">
         <TextField placeholder='Search' onChange={handleInput} />
         <IconButton aria-label='search'>
             <SearchIcon />
             </IconButton>
     </form>




    {gameList.map((game) => {
     return (
    <Card className="game-container" key={game.id}>
    <LazyLoad placeholder={<Loading></Loading>}> 
     <Typography className="gameInfoTitle">{game.title}</Typography>
     <Typography className="gameInfo">{game.description}</Typography>
     <Typography className="gameInfo">{game.defaultCredits}</Typography>
     <IconButton aria-label='edit' onClick={() => handleClickEditOpen({ game })}> <EditIcon/></IconButton>
     <IconButton aria-label='delete' onClick={() => handleClickDeleteOpen({game})}><DeleteIcon/></IconButton>
     </LazyLoad>
     </Card>
    
    )
    
     })
     }
   
     <Dialog 
    open={editOpen}
    onClose={handleCloseEdit}
    aria-labelledby='edit-dial'>
    <Formik
    initialValues={{
        title: selectedGame?.title,  
        description: selectedGame?.description, 
        defaultCredits: selectedGame?.defaultCredits,
       
    }}
    validationSchema={Yup.object().shape({
        id: Yup.string('Enter Game Title').required(
            'Game Title is required', 
        ),
        
        defaultCredits: Yup.string('Enter Game Default Credits').required(
            'Default Credits code is required',
        ),
        description: Yup.string('Description'), 
         
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
         <DialogTitle id="edit-dial">Edit Game</DialogTitle>   
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
            <TextField 
            autoFocus 
            id="defaultCredits"
            name="defaultCredits"
            label="Credits"
            type="text"
            fullWidth
            value={values.defaultCredits}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.defaultCredits && errors.defaultCredits)} 
            helperText={touched.defaultCredits && errors.defaultCredits} 
            />
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








   
   </div>

)

}


  
export default GamesandStats 