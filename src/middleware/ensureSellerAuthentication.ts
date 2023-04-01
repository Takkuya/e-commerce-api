import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export function ensureSellerAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({ message: 'Token is missing' })
  }

  const token = authToken.split(' ')[1]
  try {
    verify(token, process.env.TOKEN_SECRET as string)

    return next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' })
  }
}
