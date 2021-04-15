import {Router} from 'express'

export const cardRouter = Router()

import { postaddCard, getAllCards, getCards, getCardById, putEditCard, deleteCard } from '../controllers/card.controller.js'


cardRouter.post('/card', postaddCard)

cardRouter.get('/card', getAllCards)

cardRouter.get('/async', getCards)

cardRouter.get('/id', getCardById)


cardRouter.put('/update', putEditCard)


cardRouter.delete('/delete', deleteCard)
