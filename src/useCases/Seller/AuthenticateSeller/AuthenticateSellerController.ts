import { Request, Response } from 'express'
import { z } from 'zod'
import { AuthenticateSellerUseCase } from './AuthenticateSellerUseCase'

class AuthenticateSellerController {
  async handle(req: Request, res: Response) {
    const authenticateSellerSchema = z.object({
      email: z.string().email({ message: 'Invalid email' }),
      password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
    })

    const { email, password } = authenticateSellerSchema.parse(req.body)

    const authenticateSellerUseCase = new AuthenticateSellerUseCase()
    const token = await authenticateSellerUseCase.execute({ email, password })

    return res.json(token)
  }
}

export { AuthenticateSellerController }
