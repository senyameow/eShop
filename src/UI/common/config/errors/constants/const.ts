import * as env from 'dotenv'

env.config()

export const ACCESS_TOKEN_LIFETIME = +(process.env.ACCESS_TOKEN_LIFETIME) || 60 * 5
export const REFRESH_TOKEN_LIFETIME = +(process.env.REFRESH_TOKEN_LIFETIME) || 60 * 60 * 24 * 30
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY 