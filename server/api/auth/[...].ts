import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import { User, Login, Register, Jwt } from 'utils/model'

function parseJwt (token: string): Jwt {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL

async function refreshAccessToken (refreshToken: {
  accessToken: string;
  accessTokenExpires: string;
  refreshToken: string;
}) {
  try {
    console.warn('trying to post to refresh token')
    const refreshedTokens = await $fetch<Register | null>(`${BACKEND_BASE_URL}/user/token/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US',
        Authorization: `Bearer ${refreshToken.refreshToken}`
      }
    })
    if (!refreshedTokens || !refreshedTokens.data) {
      console.warn('No refreshed tokens')
      throw refreshedTokens
    }
    console.warn('Refreshed tokens successfully')
    return {
      ...refreshToken,
      accessToken: refreshedTokens.data.accessToken,
      accessTokenExpires: parseJwt(refreshedTokens.data.accessToken).exp,
      refreshToken: refreshedTokens.data.refreshToken
    }
  } catch (error) {
    console.warn('Error refreshing token', error)
    return {
      ...refreshToken,
      error: 'RefreshAccessTokenError'
    }
  }
}

export default NuxtAuthHandler({
  secret: process.env.SECRET,
  pages: {
    signIn: '/login'
  },
  providers: [
    // @ts-ignore
    CredentialsProvider.default({
      name: 'Credentials',
      async authorize (credentials: any) {
        try {
          const payload = {
            username: credentials.username,
            password: credentials.password
          }
          const userTokens = await $fetch<Login | null>(`${BACKEND_BASE_URL}/login`, {
            method: 'POST',
            body: payload,
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'en-US'
            }
          })
          const userDetails = await $fetch<User | null>(`${BACKEND_BASE_URL}/user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'en-US',
              Authorization: `Bearer ${userTokens?.data.accessToken}`
            }
          })
          if (!userTokens || !userTokens.data || !userDetails || !userDetails.user) {
            throw createError({
              statusCode: 500,
              statusMessage: 'Next auth failed'
            })
          }
          const user = {
            id: userDetails.user.id,
            username: userDetails.user.username,
            channelName: userDetails.user.channelName,
            firstName: userDetails.user.firstName,
            lastName: userDetails.user.lastName,
            email: userDetails.user.email,
            profileImage: userDetails.user.email,
            accessToken: userTokens.data.accessToken,
            accessTokenExpires: parseJwt(userTokens.data.accessToken).exp,
            refreshToken: userTokens.data.refreshToken
          }
          return user
        } catch (error) {
          console.warn('Error logging in', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt ({ token, user, account }) {
      if (account && user) {
        console.warn('JWT callback', { token, user, account })
        return {
          ...token,
          ...user
        }
      }
      // Handle token refresh before it expires
      if (token.accessTokenExpires && Date.now() > token.accessTokenExpires) {
        console.warn('Token is expired. Getting a new')
        return refreshAccessToken(token)
      }
      return token
    },
    session ({ session, token }) {
      session.user = {
        ...session.user,
        ...token
      }
      return session
    }
  }
})
