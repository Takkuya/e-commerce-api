import { Request, Response } from 'express'
import { z } from 'zod'
import { UpdateProductUseCase } from './UpdateProductUseCase'

class UpdateProductController {
  async handle(req: Request, res: Response) {
    const productId = req.params.productId

    const updateProductSchema = z.object({
      name: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters' }),
      price: z.number().min(0, { message: 'Price must be greater than 0' }),
      categories: z
        .array(z.string())
        .min(1, { message: 'Must have at least one category' })
    })

    const { name, price, categories } = updateProductSchema.parse(req.body)

    const updateProductUseCase = new UpdateProductUseCase()

    try {
      const updatedProduct = await updateProductUseCase.execute({
        name,
        price,
        categories,
        productId
      })

      return res.status(200).json(updatedProduct)
    } catch (err) {
      console.error(err)
      return res.status(422).json({ message: 'Error updating product' })
    }
  }
}

export { UpdateProductController }
