import express from 'express'
import { testRouter} from './routes/api.route.js'



const server = express()
const port = process.env.PORT || 5000 




server.use('/', testRouter)

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})