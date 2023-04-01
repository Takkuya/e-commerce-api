import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import { router } from './routes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())
app.use(router)

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
      status: 'Error',
      message: error.message
    })
  }
)

app.listen(3000, () => console.log('Server is running on port 3000'))
