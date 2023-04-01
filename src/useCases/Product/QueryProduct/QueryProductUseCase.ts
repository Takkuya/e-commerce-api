import { client } from '../../../prisma/client'

class QueryProductUseCase {
  async execute(name: string) {
    const product = await client.product.findMany({
      where: {
        name: {
          contains: name
        }
      }
    })

    return product
  }
}

export { QueryProductUseCase }
