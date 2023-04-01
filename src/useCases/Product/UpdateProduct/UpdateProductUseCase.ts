import { client } from '../../../prisma/client'

type IParams = {
  productId: string
}

type IProduct = IParams & {
  name: string
  price: number
  categories: string[]
}

class UpdateProductUseCase {
  async execute({ name, price, categories, productId }: IProduct) {
    const updatedProduct = await client.product.update({
      where: {
        id: productId
      },
      data: {
        name,
        price,
        categories
      }
    })

    return updatedProduct
  }
}

export { UpdateProductUseCase }
