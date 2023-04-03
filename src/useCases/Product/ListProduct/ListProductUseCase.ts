import { client } from '../../../prisma/client'

class ListProductUseCase {
  async execute(sellerId: string) {
    const products = await client.product.findMany({
      where: {
        sellerId
      }
    })

    if (products.length === 0 || !products) {
      throw new Error('No products found')
    }

    return products
  }
}

export { ListProductUseCase }
