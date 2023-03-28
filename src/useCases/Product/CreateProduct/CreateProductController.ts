import { Request, Response } from 'express'
import { z } from 'zod'
import { CreateProductUseCase } from './CreateProductUseCase'

class CreateProductController {
  async handle(req: Request, res: Response) {
    const sellerId = req.params.sellerId

    const createProductSchema = z.object({
      name: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters' }),
      price: z.number().min(0, { message: 'Price must be greater than 0' }),
      categories: z
        .array(z.string())
        .min(1, { message: 'Must have at least one category' })
    })

    const { name, price, categories } = createProductSchema.parse(req.body)

    const createProductUseCase = new CreateProductUseCase()

    try {
      const product = await createProductUseCase.execute({
        name,
        price,
        categories,
        sellerId
      })

      return res.status(201).json(product)
    } catch (err) {
      console.error(err)
      return res.status(422).json({ message: 'Error creating product' })
    }
  }
}

export { CreateProductController }
