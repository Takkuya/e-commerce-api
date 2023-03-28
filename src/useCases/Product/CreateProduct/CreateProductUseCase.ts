import { client } from '../../../prisma/client'

type IProduct = {
  name: string
  price: number
  categories: string[]
  sellerId: string
}

class CreateProductUseCase {
  async execute({ name, price, categories, sellerId }: IProduct) {
    const productAlreadyExists = await client.product.findFirst({
      where: {
        name
      }
    })

    if (productAlreadyExists) {
      throw new Error('Product already exists')
    }

    const product = await client.product.create({
      data: {
        name,
        price,
        categories,
        seller: {
          connect: {
            id: sellerId
          }
        }
      }
    })

    return product
  }
}

export { CreateProductUseCase }
