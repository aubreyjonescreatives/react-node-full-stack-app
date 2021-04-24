import { PopularGame } from '../models/populargame.js'



export const postaddCard = ((req, res) => {

const cards = new PopularGame({
    name: req.body.name, 
    image_url: req.body.image_url, 
    description: req.body.description, 
    price: req.body.price 
})
console.log(cards)
cards.save() //save method is provided by Mongoose
res.json(cards)


})




export const getAllCards = ((req, res) => {
    PopularGame.find()
    .then(thecards => {
        res.json(thecards)
    })
    .catch(err => console.log(err))
})

export const getCards = async (req, res) => {
    const cards = await PopularGame.find()
    if (!cards) {
        return res.status(400).json({Message: `No games found`})
    }
    res.json(cards)
}

export const getCardById = async (req, res) => {
    const cardId = req.body._id
    console.log(cardId)
    try{
    const card = await PopularGame.findById(cardId)
    if (!card) {
        return res.status(404).json({Message: 'Game Not Found'})
    }
    res.json(card)
} catch(err) {
    res.status(400).json({Message: `Invalid ID: ${err}`})
}
}

export const putEditCard = async (req, res) => {
    const cardId = req.body.data._id
    const updatedObj = {
        name: req.body.data.name,
        image_url: req.body.data.image_url, 
        description: req.body.data.description, 
        price: req.body.data.price 
    } 
    try {
    const card = await PopularGame.findByIdAndUpdate(cardId, updatedObj, {new: true})
        res.status(200).json(card)
    } catch(err) {
        res.status(400).json({Message: `Could not update: ${err}`})
    }


}

export const deleteCard = async (req, res) => {
    const cardId = req.body.cardId
    console.log(cardId)
    try {
        const deletedCard = await PopularGame.findByIdAndRemove(cardId)
            if (!deletedCard) {
               return res.status(400).json({Message: `Card to Delete Not Found.`})
            }
            console.log(`Deleted the product ${deletedCard}`)
            res.sendStatus(200)
        } catch (err) {
            res.status(400).json({Message: `Invalid ID: ${err}`})
        }

    }
    