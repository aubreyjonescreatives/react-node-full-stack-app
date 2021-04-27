import {Router} from 'express'

export const populargameRouter = Router()

import { postaddGame, getAllGames, getGames, getGameById, putEditGame, deleteGame } from '../controllers/populargame.controller.js'


populargameRouter.post('/', postaddGame)

populargameRouter.get('/', getAllGames)

populargameRouter.get('/async', getGames)

populargameRouter.get('/populargames/id', getGameById)


populargameRouter.put('/populargames/update', putEditGame)


populargameRouter.delete('/populargames/delete', deleteGame)
