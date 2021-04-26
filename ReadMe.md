# Welcome to my Github Repo for a Full Stack React-Node App!

## Mongoose as your data modeling tool


## Cloud-based MongoDB as your data store

![MongoDB datastore](images/mongodbpopulargames.PNG)


## At least 3 endpoints to GET data from your server

```

populargameRouter.get('/populargames', getAllGames)

populargameRouter.get('/async', getGames)

populargameRouter.get('/populargames/id', getGameById)

```


## At least 1 endpoint allowing user to update an item via PUT or PATCH HTTP verbs

```
  
const handleUpdate = async (values) => {
    try {
        const result = await axios.put(`http://localhost:5050/populargames/update`, {
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

```


## At least 1 endpoint allowing user to create an item via POST

```

export const postaddGame = ((req, res) => {

const games = new PopularGame({
    name: req.body.name, 
    image_url: req.body.image_url, 
    description: req.body.description, 
    price: req.body.price 
})
console.log(games)
games.save() //save method is provided by Mongoose
res.json(games)


})

```


## At least 1 endpoint allowing user to delete an item via DELETE

```

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
        await axios.delete(`http://localhost:5050/populargames/delete`, { 
        data: {   
        gameId: selectedGame._id
        }
    })
    fetchGames()
    } catch (err) {
        console.error(err)
    }
}

```


## Your datastore will contain at least 25 items

![Datastore](images/mongodbpopulargames.PNG)


## Your app will be deployed to production using some service like Heroku, Digital Ocean, etc.

### Here are instructions to view this project in your local browser:

1. Download this project folder from Github. 
2. Install Docker for the graphql database. 
3. Create a MongoDB account. 
4. Create a .env file in the main project folder. 
5. Make sure your .gitignore file ignores all .env files with wild card * before and after .env
5. Add your mongodb connection string to the .env file using DB_CONN_STRING as the string variable.
6. Add PORT=5050 to your .env file as my PopularGames.js uses this
7. Run these scripts from the main package.json file in this order: 
    * npm run launch (to create docker container (ignore this step once created))
    * npm run migrate (to create graphql migration) 
    * npm run seed (to load seed into your mongoDB database)
    * npm run seed:game (to load seed into your graphql database)
    * npm run build (to create a build file for the project)
    * npm run start-dev (to see this project in the browser via localhost)


## Additional Notes: 
1. This API does not require an API Key 

