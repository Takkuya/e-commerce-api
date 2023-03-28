import { Request, Response } from 'express'
import { z } from 'zod'
import { CreateSellerUseCase } from './CreateSellerUseCase'

class CreateSellerController {
  async handle(req: Request, res: Response) {
    const createSellerUseCase = new CreateSellerUseCase()

    const createSellerSchema = z.object({
      email: z.string().email({ message: 'Invalid email' }),
      password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' }),
      name: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters' }),
      description: z.string()
    })

    const { email, password, name, description } = createSellerSchema.parse(
      req.body
    )

    try {
      const seller = await createSellerUseCase.execute({
        email,
        password,
        name,
        description
      })

      return res.status(201).json(seller)
    } catch (err) {
      console.error(err)
      return res.status(422).json({ message: 'Error creating seller' })
    }
  }
}

export { CreateSellerController }
