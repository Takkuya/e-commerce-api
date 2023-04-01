import { compare } from 'bcryptjs'
import { client } from '../../../prisma/client'
import { GenerateRefreshTokenProvider } from '../../../provider/GenerateRefreshTokenProvider'
import { GenerateTokenProvider } from '../../../provider/GenerateTokenProvider'

type IRequest = {
  email: string
  password: string
}

class AuthenticateSellerUseCase {
  async execute({ email, password }: IRequest) {
    const sellerAlreadyExists = await client.seller.findFirst({
      where: {
        email
      }
    })

    if (!sellerAlreadyExists) {
      throw new Error('Email or password incorrect')
    }

    const passwordMatch = await compare(password, sellerAlreadyExists.password)

    if (!passwordMatch) {
      throw new Error('Email or password incorrect')
    }

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(sellerAlreadyExists.id)

    await client.refreshToken.deleteMany({
      where: {
        sellerId: sellerAlreadyExists.id
      }
    })

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()
    const refreshToken = await generateRefreshTokenProvider.execute(
      sellerAlreadyExists.id
    )

    return { sellerId: sellerAlreadyExists.id, token, refreshToken }
  }
}

export { AuthenticateSellerUseCase }
