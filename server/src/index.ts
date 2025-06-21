import greet from '@projektinz/shared/utils'
import dotenv from 'dotenv'
import type { Application, Request, Response } from 'express'
import express from 'express'

//For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT ?? 8000

app.get('/', (request: Request, response: Response) => {
  console.log(request.accepted, greet('Server'))
  response.send('Welcome to Express & TypeScript Server')
})

app.listen(port, () => {
  console.log(`Server is Fire at https://localhost:${port}`)
})
