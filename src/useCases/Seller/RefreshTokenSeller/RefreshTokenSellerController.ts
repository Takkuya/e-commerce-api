import { Request, Response } from 'express'
import { RefreshTokenSellerUseCase } from './RefreshTokenSellerUseCase'

class RefreshTokenSellerController {
  async handle(req: Request, res: Response) {
    const { refresh_token } = req.body

    const refreshTokenSellerUseCase = new RefreshTokenSellerUseCase()
    const token = await refreshTokenSellerUseCase.execute(refresh_token)

    return res.json(token)
  }
}

export { RefreshTokenSellerController }
