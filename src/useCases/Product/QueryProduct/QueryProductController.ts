import { Request, Response } from 'express'
import { QueryProductUseCase } from './QueryProductUseCase'

class QueryProductController {
  async handle(req: Request, res: Response) {
    const { name } = req.query

    if (!name) {
      return res.status(404).json({ message: 'Product not found' })
    }

    const queryProductUseCase = new QueryProductUseCase()

    try {
      const product = await queryProductUseCase.execute(name as string)

      return res.status(200).json(product)
    } catch (err) {
      console.error(err)
      return res.status(422).json({ message: 'Error listing products' })
    }
  }
}

export { QueryProductController }
