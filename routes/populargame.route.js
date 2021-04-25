import {Router} from 'express'

export const populargameRouter = Router()

import { postaddCard, getAllCards, getCards, getCardById, putEditCard, deleteCard } from '../controllers/populargame.controller.js'


populargameRouter.post('/populargames', postaddCard)

populargameRouter.get('/populargames', getAllCards)

populargameRouter.get('/async', getCards)

populargameRouter.get('/populargames/id', getCardById)


populargameRouter.put('/populargames/update', putEditCard)


populargameRouter.delete('/populargames/delete', deleteCard)
