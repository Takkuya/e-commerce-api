import { client } from '../../../prisma/client'

class ListAllProductsUseCase {
  async execute() {
    const products = await client.product.findMany()

    if (!products) {
      throw new Error('No products found')
    }

    return products
  }
}
export { ListAllProductsUseCase }
