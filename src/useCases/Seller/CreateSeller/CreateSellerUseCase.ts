import { client } from '../../../prisma/client'
import bcrypt from 'bcryptjs'

type ISeller = {
  email: string
  password: string
  name: string
  description: string
}

class CreateSellerUseCase {
  async execute({ email, password, name, description }: ISeller) {
    const sellerAlreadyExists = await client.seller.findFirst({
      where: {
        name
      }
    })

    if (sellerAlreadyExists) {
      throw new Error('Seller already exists')
    }

    const passwordHash = await bcrypt.hash(password, 8)

    const seller = await client.seller.create({
      data: {
        email,
        password: passwordHash,
        name,
        description
      }
    })

    return seller
  }
}

export { CreateSellerUseCase }
