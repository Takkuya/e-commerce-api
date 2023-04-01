export {}

type EnvString = Record<'TOKEN_SECRET', string>

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvString {}
  }
}
