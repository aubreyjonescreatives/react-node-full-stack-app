import axios from 'axios'; 
import { PopularGame } from '../models/populargame.js'
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
        url: 'https://www.boardgameatlas.com/api/search?order_by=popularity&ascending=false&pretty=true&client_id=JLBr5npPhV', 
      //  params: {}, 
      //  headers: {'access-token': process.env.SUPERHERO_API_KEY}
    } 
    try {
        const response = await axios.request(options)
        console.log(response.data.games[0])
      // await addCard(response.data.cards[0])
       await addCards(response.data.games)
        await mongoose.connection.close() 
    } catch (error) {
        console.error(error)
    }

}




const addCard = async (oneCard) => {

    const cards = new PopularGame({
        name: oneCard.name, 
        image_url: oneCard.image_url, 
        description: oneCard.description, 
        price: oneCard.price
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
    