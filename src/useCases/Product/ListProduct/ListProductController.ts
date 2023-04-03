import { Request, Response } from 'express'
import { z } from 'zod'
import { ListProductUseCase } from './ListProductUseCase'

class ListProductController {
  async handle(req: Request, res: Response) {
    const sellerId = req.params.sellerId

    if (!sellerId) {
      return res.status(400).json({ message: 'Seller id is required' })
    }

    const listProductUseCase = new ListProductUseCase()

    try {
      const products = await listProductUseCase.execute(sellerId as string)

      return res.status(200).json(products)
    } catch (err) {
      console.error(err)
      return res.status(422).json({ message: 'Error listing products' })
    }
  }
}

export { ListProductController }
