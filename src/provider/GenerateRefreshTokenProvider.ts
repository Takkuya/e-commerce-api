import dayjs from 'dayjs'
import { client } from '../prisma/client'

class GenerateRefreshTokenProvider {
  async execute(sellerId: string) {
    const expiresIn = dayjs().add(15, 'second').unix()

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
