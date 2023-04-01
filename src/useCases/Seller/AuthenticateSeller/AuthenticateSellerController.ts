import { Request, Response } from 'express'
import { AuthenticateSellerUseCase } from './AuthenticateSellerUseCase'

class AuthenticateSellerController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const authenticateSellerUseCase = new AuthenticateSellerUseCase()
    const token = await authenticateSellerUseCase.execute({ email, password })

    return res.json(token)
  }
}

export { AuthenticateSellerController }
