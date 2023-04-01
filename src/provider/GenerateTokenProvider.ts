import { sign } from 'jsonwebtoken'

class GenerateTokenProvider {
  async execute(sellerId: string) {
    const token = sign({}, process.env.TOKEN_SECRET as string, {
      subject: sellerId,
      expiresIn: '15s'
    })

    return token
  }
}

export { GenerateTokenProvider }
