import { client } from '../../../prisma/client'

class ListProductUseCase {
  async execute(sellerId: string) {
    const products = await client.product.findMany({
      where: {
        sellerId
      }
    })

    return products
  }
}

export { ListProductUseCase }
