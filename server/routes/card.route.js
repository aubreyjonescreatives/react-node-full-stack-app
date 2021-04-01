import {Router} from 'express'

export const cardRouter = Router()

import { addCard, getAllCards, getCards, getCardById, putEditCard, deleteCard } from '../controllers/card.controller.js'


cardRouter.post('/', addCard)

cardRouter.get('/', getAllCards)

cardRouter.get('/async', getCards)

cardRouter.get('/id', getCardById)


cardRouter.put('/update', putEditCard)


cardRouter.delete('/delete', deleteCard)
