import dayjs from 'dayjs'
import { client } from '../../../prisma/client'
import { GenerateRefreshTokenProvider } from '../../../provider/GenerateRefreshTokenProvider'
import { GenerateTokenProvider } from '../../../provider/GenerateTokenProvider'

class RefreshTokenSellerUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })

    if (!refreshToken) {
      throw new Error('Refresh token invalid')
    }

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(refreshToken.sellerId)

    const isRefreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    )

    if (isRefreshTokenExpired) {
      await client.refreshToken.deleteMany({
        where: {
          sellerId: refreshToken.sellerId
        }
      })

      const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()
      const newRefreshToken = await generateRefreshTokenProvider.execute(
        refreshToken.sellerId
      )

      return { token, refreshToken: newRefreshToken }
    }

    return { token }
  }
}

export { RefreshTokenSellerUseCase }
