import { Request, Response } from 'express'
import { ListAllProductsUseCase } from './ListAllProductsUseCase'

class ListAllProductsController {
  async handle(req: Request, res: Response) {
    const listAllProductsUseCase = new ListAllProductsUseCase()

    try {
      const products = await listAllProductsUseCase.execute()

      return res.status(200).json(products)
    } catch (err) {
      console.error(err)
      return res.status(422).json({ message: 'Error listing all products' })
    }
  }
}

export { ListAllProductsController }
