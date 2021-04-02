import mongoose from 'mongoose'


const Schema = mongoose.Schema 


const cardSchema = new Schema({
    code: {
        type: String, 
        required: true
    }, 
    image: {
        type: String, 
        required: true
    }, 
    value: {
        type: String, 
        required: true 
    }, 
    suit: {
        type: String, 
        required: true 
    }
})

export const Card = mongoose.model('Card', cardSchema)