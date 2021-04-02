import axios from 'axios'; 
import { Card } from '../models/card.js'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const seedMongo = async () => {
    await mongoose.connect(`${process.env.DB_CONN_STRING}`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })


    const options = {
        method: 'GET', 
        url: 'https://deckofcardsapi.com/api/deck/new/draw/?count=52', 
      //  params: {}, 
      //  headers: {'access-token': process.env.SUPERHERO_API_KEY}
    } 
    try {
        const response = await axios.request(options)
        console.log(response.data.cards[0])
      // await addCard(response.data.cards[0])
       await addCards(response.data.cards)
        await mongoose.connection.close() 
    } catch (error) {
        console.error(error)
    }

}




const addCard = async (oneCard) => {

    const cards = new Card({
        code: oneCard.code, 
        image: oneCard.image, 
        value: oneCard.value, 
        suit: oneCard.suit 
    })
   await cards.save() //save method is provided by Mongoose
   console.log('Added successfully')
    
    
    }

    const addCards = async (cardList) => {
        for (let card of cardList) {
            console.log(card)
            await addCard(card)
        }
    }

    seedMongo()
    