import dayjs from 'dayjs'
import { client } from '../prisma/client'

class GenerateRefreshTokenProvider {
  async execute(sellerId: string) {
    const expiresIn = dayjs().add(8, 'hours').unix()

    const generateRefreshToken = await client.refreshToken.create({
      data: {
        sellerId,
        expiresIn
      }
    })

    return generateRefreshToken
  }
}

export { GenerateRefreshTokenProvider }
