import mongoose from 'mongoose'


const Schema = mongoose.Schema 


const populargameSchema = new Schema({
    name: {
        type: String, 
        required: false
    }, 
    image_url: {
        type: String, 
        required: false
    }, 
    description: {
        type: String, 
        required: false 
    }, 
    price: {
        type: String, 
        required: false 
    },
    id: {
        type: String, 
        required: false
    }
})

export const PopularGame = mongoose.model('Popular Game', populargameSchema)