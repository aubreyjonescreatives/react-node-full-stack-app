import {Router} from 'express'

export const populargameRouter = Router()

import { postaddCard, getAllCards, getCards, getCardById, putEditCard, deleteCard } from '../controllers/populargame.controller.js'


populargameRouter.post('/populargame', postaddCard)

populargameRouter.get('/populargame', getAllCards)

populargameRouter.get('/async', getCards)

populargameRouter.get('/id', getCardById)


populargameRouter.put('/update', putEditCard)


populargameRouter.delete('/delete', deleteCard)
